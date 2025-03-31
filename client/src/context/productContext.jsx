import React, { createContext, useContext, useState, useEffect } from "react";
import { API } from "../api/API.js";
import { toast } from "react-hot-toast";

const ProductContext = createContext();

// create provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState("");

  const currency = "$";

  // fetch product
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/product/list");
        const allProducts = response?.data?.data || [];

        setProducts(allProducts);
        toast.success(response?.data?.message);
      } catch (error) {
        console.log("error fetching products: ", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // add to cart
  const addToCart = async (itemId, size) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await API.post(
        "/api/cart/add",
        { itemId, size },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      setCartItems(response?.data?.data || {});
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("error adding product to cart: ", error);
      toast.error(error.response?.data?.message || "failed to add to cart");
    }
  };
  // Debug: Log cart updates
  // useEffect(() => {
  //   console.log('updated cart items: ', cartItems)

  // }, [cartItems])

  // update cart count
  useEffect(() => {
    const getCartCount = () => {
      let totalCount = 0;
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        }
      }
      return totalCount;
    };
    setCartCount(getCartCount());
  }, [cartItems]);

  // login state after refresh
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        currency,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        cartCount,
        API,
        toast,
        token,
        setToken,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
