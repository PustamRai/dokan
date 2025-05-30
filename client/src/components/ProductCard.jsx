import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/productContext";

function ProductCard({ slug, name, image, description, price }) {
  const { loading, currency } = useProductContext();

  if (loading) {
    return <p>Loading products...</p>;
  }

  // if (!products || products.length === 0) {
  //   return <p>No products available.</p>;
  // }

  return (
    <div className="bg-white rounded-xs overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${slug}`}>
        <div className="overflow-hidden">
          <img
            src={image}
            alt=""
            className="w-full h-28 md:h-48 object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex flex-col space-y-0.5">
          <span className="text-black text-lg">{name}</span>
          <span className="text-gray-700 text-sm">{description}</span>
          <span className="text-gray-800">
            {currency}
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
