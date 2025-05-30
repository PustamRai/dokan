import React from "react";
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { useProductContext } from "../context/productContext";
import OrderSummary from "../components/OrderSummary";
import { useNavigate, Link } from "react-router-dom";
import { useCartContext } from "../context/cartContext";

function Cart() {
  const { currency, products, toast } = useProductContext();
  const { cartData, setCartData } = useCartContext()
  const navigate = useNavigate();

  // Helper function to find product details from the itemId
  const getProductDetails = (itemId) => {
    return products.find((product) => product._id === itemId);
  };

   // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cartData];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCartData(myCart);
      toast.success("Item removed successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen py-8 mt-[98px]">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Your Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {!cartData || cartData.length === 0 ? (
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <p className="text-gray-500">Your cart is empty</p>

                <Link
                to='/collection'
                >
                  <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer">
                    Shop Now
                  </button>
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500 bg-gray-50 p-4">
                  <div className="col-span-6">Product</div>
                  {/* <div className="col-span-2 text-center">Quantity</div> */}
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {cartData.map((item, index) => {
                  // Skip items with null values or missing itemId
                  if (!item || !item.itemId) return null;

                  // Get product details based on itemId
                  const product = getProductDetails(item.itemId);

                  // console.log('product: ', product)
                  return (
                    <div
                      key={item.itemId || index}
                      className="grid grid-cols-1 md:grid-cols-12 border-b border-gray-200 py-4 px-4 items-center"
                    >
                      {/* Product Info */}
                      <div className="col-span-1 md:col-span-6 flex items-center mb-4 md:mb-0">
                        <img
                          src={product?.image}
                          alt={product?.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-800">
                            {product?.name}
                          </h3>
                          <p className="text-gray-500 text-sm md:hidden">
                            {currency}
                            {product?.price}
                          </p>
                          {item.size && (
                            <p className="text-gray-500 text-xs">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity */}
                      {/* <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center mb-4 md:mb-0">
                        <span className="md:hidden text-gray-500">
                          Quantity:
                        </span>
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.itemId, -1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <TiMinus size={16} />
                          </button>
                          <span className="px-2 py-1">
                            {item.quantity || 0}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.itemId, 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <FaPlus size={16} />
                          </button>
                        </div>
                      </div> */}

                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center mb-4 md:mb-0">
                        <span className="md:hidden text-gray-500">Price:</span>
                        <span>
                          {currency}
                          {product?.price?.toFixed(2) || "0.00"}
                        </span>
                      </div>

                      {/* Total */}
                      <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden text-gray-500">Total:</span>
                        <div className="flex items-center">
                          <span className="font-medium">
                            {currency}
                            {(
                              (product?.price || 0) * (item.quantity || 0)
                            ).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeCartItem(item.itemId)}
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
              <Link
              to='/'
              >
                <button className="flex items-center text-blue-600 hover:underline cursor-pointer">
                  Continue Shopping
                </button>
              </Link>
              
            </div>
          </div>

          {/* Order Summary */}
          <div className=" ">
            <div className="w-full">
              <OrderSummary />
              <div className="space-y-4">
                <button
                  className="w-full bg-black text-white py-3 rounded-sm hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => navigate("/place-order")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
