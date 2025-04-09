import React, { createContext, useContext, useState, useEffect } from "react";
import { API } from "../api/API.js";
import { toast } from "react-hot-toast";
import { useProductContext } from "./productContext.jsx";

const CartContext = createContext();

// create provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const { products } = useProductContext()

  const currency = "Rs.";
  const shippingFee = 5.99;
  const taxRate = 0.07;


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
  }, [cartItems]);

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


  // CART ORDER SUMMARY
  // Helper function to find product details from the itemId
  const getProductDetails = (itemId) => {
    return products.find(product => product._id === itemId);
  };

  // Calculate order summary values
  const calculateOrderSummary = () => {
    const subtotal = cartData.reduce((total, item) => {
      if (item && item.itemId && item.quantity) {
        const product = getProductDetails(item.itemId);
        if (product && product.price) {
          return total + (product.price * item.quantity);
        }
      }
      return total;
    }, 0);
    
    const shipping = shippingFee;
    const tax = subtotal * taxRate;
    const totalCartAmount = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      totalCartAmount
    };
  };

  // The order summary values
  const orderSummary = calculateOrderSummary();

  return (
    <CartContext.Provider
      value={{
        currency,
        addToCart,
        cartCount,
        API,
        toast,
        cartData,
        orderSummary, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
