import React from "react";
import { useProductContext } from "../context/productContext";

function Orders() {
  const { products, orderData, currency } = useProductContext();

  const getProductDetails = (itemId) => {
    return products.find((product) => product._id === itemId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h1 className="text-xl text-center font-medium border-b pb-2 mb-6">
        MY ORDERS
      </h1>

      <div className="space-y-4">
        {orderData.map((order) => {
          // console.log('inner order: ', order);
          
          return (
            <>
              {order.items.map((item) => {
                const product = getProductDetails(item.itemId);
                // console.log('product: ', product);
                
                if (!product) return null; // Skip rendering if product not found
                
                return (
                  <div
                    key={item.itemId}
                    className="border rounded-lg p-4 shadow-sm bg-white"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-medium text-sm sm:text-base">
                          {order.name}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 mt-1 text-sm">
                          <p className="font-medium">
                            price: {currency}
                            {product.price.toFixed(2)}
                          </p>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-gray-600">Size: {item.size}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Date: {order.updatedAt}</p>

                        {/* Status and Track Order */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-xs text-green-600">
                              {order.status}
                            </span>
                          </div>
                          <button className="text-xs font-medium bg-gray-300 p-2 rounded-sm text-black hover:text-gray-900 mt-2 sm:mt-0 cursor-pointer">
                            Track Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;