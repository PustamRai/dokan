import React, { useState } from "react";

function DescriptionAndReview() {
  const [activeTab, setActiveTab] = useState("Description");

  // Sample reviews data
  const reviews = [
    {
      name: "John D.",
      rating: 5,
      date: "2 weeks ago",
      text: "Absolutely love the fit and quality of this t-shirt. Perfectly comfortable and looks great!",
      verified: true,
    },
    {
      name: "Mike S.",
      rating: 4,
      date: "1 month ago",
      text: "Good material, fits well. Slightly higher price point but worth the quality.",
      verified: true,
    },
  ];

  return (
    <div className="mt-12 border-t border-gray-400 pt-8">
      {/* Tab Navigation */}
      <div className="flex  mb-6">
        {["Description", "Reviews (122)"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
                    px-4 py-2 border-b-2 transition-colors cursor-pointer
                    ${
                      activeTab === tab
                        ? "border-black text-black"
                        : "border-transparent text-gray-500 hover:text-black"
                    }
                  `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-2">
        {activeTab === "Description" ? (
          <div className="space-y-4 text-gray-700">
            <p>
              An e-commerce website is an online platform that facilitates the
              buying and selling of products or services over the internet. It
              serves as a virtual marketplace where businesses and individuals
              can showcase their products, interact with customers, and conduct
              transactions within their own digital environment.
            </p>
            <p>
              E-commerce typically involves detailed product descriptions along
              with detailed descriptions, images, prices, and any available
              variations (e.g., sizes, colors). Each product usually has its own
              dedicated page with rich information.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Overall Rating */}
            <div className="flex items-center space-x-4">
              <div className="text-5xl font-bold">4.5</div>
              <div>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <IoIosStar
                      key={i}
                      size={24}
                      fill={i < 4 ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  ))}
                </div>
                <p className="text-gray-600">Based on 122 Reviews</p>
              </div>
            </div>

            {/* Individual Reviews */}
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{review.name}</span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <div className="flex text-yellow-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <IoIosStar
                      key={i}
                      size={16}
                      fill={i < review.rating ? "currentColor" : "none"}
                      stroke="currentColor"
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DescriptionAndReview;
