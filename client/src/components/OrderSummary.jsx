import React from "react";
import { useCartContext } from "../context/cartContext";


function OrderSummary() {  
  const { orderSummary, currency } = useCartContext()

  // Use orderSummary values from context
  const { subtotal, shipping, tax, totalCartAmount } = orderSummary;

  return (
    <div>
      <div className="lg:w-96 w-full">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>
                {currency}
                {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span>
                {currency}
                {shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax</span>
              <span>
                {currency}
                {tax.toFixed(2)}
              </span>
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  {currency}
                  {totalCartAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
