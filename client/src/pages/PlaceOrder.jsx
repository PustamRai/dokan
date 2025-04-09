import React, { useState } from "react";
import { FaRegCreditCard } from "react-icons/fa6";
import { IoMdCash } from "react-icons/io";
import OrderSummary from "../components/OrderSummary";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cartContext";

export default function OrderPage() {
  const { cartData, orderSummary, API, toast } = useCartContext();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  // Form input state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    // Payment details
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
      if (!token) return;

    if (!cartData || cartData.length === 0) {
      toast.error("Your cart is empty");
    }

    // Create full address string from form data
    const address = {
      fullName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipcode: formData.zipcode,
      phone: formData.phone,
      country: "Nepal",
    };

    try {
      const response = await API.post(
        "/api/order/place-order",
        {
          items: cartData,
          amount: orderSummary.totalCartAmount,
          address,
          paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Card",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("place order: ", response);
    } catch (error) {
      console.log("error in placing order: ", error);
      toast.error(error.response?.data?.message || "failed in placing order");
    }

    navigate("/orders");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8">
          Complete Your Order
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="lg:flex lg:gap-8">
            {/* Left Column - Form */}
            <div className="lg:w-2/3 mb-8 lg:mb-0">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold border-b pb-4 mb-6">
                  Delivery Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="col-span-2 md:col-span-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zipcode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Zipcode
                    </label>
                    <input
                      type="text"
                      id="zipcode"
                      value={formData.zipcode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-not-allowed"
                    placeholder="Nepal"
                    disabled
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:w-96 flex flex-col gap-6">
              <div>
                <OrderSummary />
              </div>

              {/* payment method */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold border-b pb-4 mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4 mb-6">
                  <div
                    className={`flex items-center p-4 border rounded-md cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="h-5 w-5 rounded-full border flex items-center justify-center mr-3">
                      {paymentMethod === "card" && (
                        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <FaRegCreditCard size={20} className="mr-2" />
                    <span>Credit / Debit Card</span>
                  </div>

                  <div
                    className={`flex items-center p-4 border rounded-md cursor-pointer ${
                      paymentMethod === "cod"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <div className="h-5 w-5 rounded-full border flex items-center justify-center mr-3">
                      {paymentMethod === "cod" && (
                        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <IoMdCash size={20} className="mr-2" />
                    <span>Cash on Delivery</span>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiry"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-sm hover:bg-gray-800 transition flex items-center justify-center font-medium cursor-pointer"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
