import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/productContext";
import { useParams } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import RelatedProducts from "../components/RelatedProducts";
import DescriptionAndReview from "../DescriptionReview";

function SingleProduct() {
  const { products } = useProductContext();
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  const [selectedSize, setSelectedSize] = useState(null);

  const sizes = ["M", "L", "XL"];

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
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image - Responsive sizing */}
        <div className="w-full md:w-1/2 lg:w-1/2">
          <img
            src={productData.image}
            alt={productData.name}
            className="w-full h-[400px] md:h-[500px] object-cover rounded-sm shadow-lg"
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
                    px-4 py-2 border transition-all duration-200 cursor-pointer
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
            className="w-full bg-black text-white py-3  hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
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

      {/* Description and Review Section */}
      <DescriptionAndReview />

      {/*  Display Related Products */}
      <RelatedProducts category={productData.category} />

    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default SingleProduct;
