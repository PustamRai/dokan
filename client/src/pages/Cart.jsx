import React from "react";
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { useProductContext } from "../context/productContext";

function Cart() {
  const { currency, cartData, products } = useProductContext();

  // Helper function to find product details from the itemId
  const getProductDetails = (itemId) => {
    return products.find(product => product._id === itemId) 
  };



  // Calculate subtotal based on cart items and product information
  const subtotal = cartData.reduce((total, item) => {
    if (item && item.itemId && item.quantity) {
      const product = getProductDetails(item.itemId);
      return total + (product.price * item.quantity);
    }
    return total;
  }, 0);
  
  const shipping = 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {!cartData || cartData.length === 0 ? (
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <p className="text-gray-500">Your cart is empty</p>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500 bg-gray-50 p-4">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {cartData.map((item, index) => {
                  // Skip items with null values or missing itemId
                  if (!item || !item.itemId) return null;
                  
                  // Get product details based on itemId
                  const product = getProductDetails(item.itemId);
                  
                  return (
                    <div
                      key={item.itemId || index}
                      className="grid grid-cols-1 md:grid-cols-12 border-b border-gray-200 py-4 px-4 items-center"
                    >
                      {/* Product Info */}
                      <div className="col-span-1 md:col-span-6 flex items-center mb-4 md:mb-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-800">{product.name}</h3>
                          <p className="text-gray-500 text-sm md:hidden">
                            {currency}{product.price}
                          </p>
                          {item.size && (
                            <p className="text-gray-500 text-xs">Size: {item.size}</p>
                          )}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center mb-4 md:mb-0">
                        <span className="md:hidden text-gray-500">Quantity:</span>
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.itemId, -1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <TiMinus size={16} />
                          </button>
                          <span className="px-2 py-1">{item.quantity || 0}</span>
                          <button
                            onClick={() => updateQuantity(item.itemId, 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <FaPlus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center mb-4 md:mb-0">
                        <span className="md:hidden text-gray-500">Price:</span>
                        <span>{currency}{product.price?.toFixed(2) || '0.00'}</span>
                      </div>

                      {/* Total */}
                      <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden text-gray-500">Total:</span>
                        <div className="flex items-center">
                          <span className="font-medium">
                            {currency}{((product.price || 0) * (item.quantity || 0)).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem()}
                            className="ml-4 text-red-500 hover:text-red-700"
                          >
                            <FaRegTrashAlt size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Continue Shopping */}
            <div className="mt-6">
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{currency}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{currency}{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>{currency}{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{currency}{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="promo" className="text-sm font-medium text-gray-700">
                    Promo Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="promo"
                      className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter promo code"
                    />
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300">
                      Apply
                    </button>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">We Accept</h3>
              <div className="flex space-x-4">
                <div className="h-8 w-12 bg-gray-200 rounded"></div>
                <div className="h-8 w-12 bg-gray-200 rounded"></div>
                <div className="h-8 w-12 bg-gray-200 rounded"></div>
                <div className="h-8 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;