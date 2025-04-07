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
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [token, setToken] = useState("");

  const currency = "Rs.";

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

  console.log("cart items: ", cartItems);

  // cart data fetch
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await API.get("/api/cart/get", {
          headers: { 
            Authorization: token 
          },
        });

        const data = response?.data?.data || [];
        setCartData(data)
      } catch (error) {
        console.log("error in fetching cart data: ", error);
        toast.error(
          error.response?.data?.message || "failed to fetch cart data"
        );
      }
    };

    fetchCart();
  }, []);

  // add to cart
  const addToCart = async (itemId, size) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await API.post(
        "/api/cart/add",
        { itemId, size },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = response?.data?.data || [];
      setCartItems(data);
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


  // get cart count
  useEffect(() => {
    const getCartCount = () => {
      let totalCount = 0;

      // Iterate over the cartItems array and sum up the quantities
      cartData.forEach((item) => {
        if (item.quantity > 0) {
          totalCount += item.quantity;
        }
      });

      return totalCount;
    };

    setCartCount(getCartCount());
  }, [cartData]);

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
        cartData
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
