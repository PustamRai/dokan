import React, { createContext, useContext, useState, useEffect } from "react";
import { API } from "../api/API.js";
import { toast } from "react-hot-toast";

const ProductContext = createContext();

// create provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [orderData, setOrderData] = useState([])

  const currency = "Rs.";

  // fetch product
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/product/list");
        const allProducts = response?.data?.data || [];

        setProducts(allProducts);
        // toast.success(response?.data?.message);
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


    // fetch order data
    useEffect(() => {
      const fetchOrders = async () => {
        const token = localStorage.getItem('token')
        if(!token) return
        
        try {
          const response = await API.get('api/order/userorders', {
            headers: {
              Authorization: token
            }
          });
          
          const orders = response?.data?.data || [];
          setOrderData(orders)
        } catch (error) {
          console.log("error fetching orders: ", error);
          // toast.error(
          //   error.response?.data?.message || "Failed to fetch orders"
          // );
        }
      }
      fetchOrders()
    }, [])

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
        setLoading,
        currency,
        API,
        toast,
        token,
        setToken,
        orderData
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
