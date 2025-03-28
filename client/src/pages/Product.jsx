import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/productContext";
import { useParams } from "react-router-dom";
import { IoIosStar } from "react-icons/io";

function Product() {
  const { products } = useProductContext();
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");

  const sizes = ["M", "L", "XL"];

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

  useEffect(() => {
    const fetchProductData = () => {
      products.map((product) => {
        if (product._id === productId) {
          setProductData(product);
          console.log("prod data: ", product);
          return null;
        }
      });
    };

    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="text-center py-10 text-gray-500">Loading product...</div>
    );
  }

  return productData ? (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Product Image - Responsive sizing */}
        <div className="w-full md:w-1/2 lg:w-1/2">
          <img
            src={productData.image}
            alt={productData.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details - Responsive layout */}
        <div className="w-full md:w-1/2 lg:w-1/2 space-y-4">
          {/* Product Title and Rating */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {productData.name}
            </h1>
            <div className="flex items-center mt-2">
              {/* Star Rating */}
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <IoIosStar key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="ml-2 text-gray-600">(122)</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-gray-900">
            ${productData.price}
          </div>

          {/* Product Description */}
          <p className="text-gray-600">{productData.description}</p>

          {/* Size Selection */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Select Size
            </label>
            <div className="flex space-x-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
                    px-4 py-2 border rounded-md transition-all duration-200
                    ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-300"
            disabled={!selectedSize}
          >
            {selectedSize ? "Add to Cart" : "Select a Size"}
          </button>

          {/* Product Guarantees */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>✓ 100% Original product</p>
            <p>✓ Cash on delivery available</p>
            <p>✓ Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews Section */}
      <div className="mt-12 border-t border-gray-400 pt-8">
        {/* Tab Navigation */}
        <div className="flex  mb-6">
          {["Description", "Reviews (122)"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-2 border-b-2 transition-colors
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
                can showcase their products, interact with customers, and
                conduct transactions within their own digital environment.
              </p>
              <p>
                E-commerce typically involves detailed product descriptions
                along with detailed descriptions, images, prices, and any
                available variations (e.g., sizes, colors). Each product usually
                has its own dedicated page with rich information.
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
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
