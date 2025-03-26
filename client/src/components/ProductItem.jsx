import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/productContext";

function ProductItem({ products }) {
  const { loading, currency } = useProductContext();
 
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }
  
  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <Link to={`/product/${product._id}`}>
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-28 md:h-48 object-cover"
              />
            </div>
          </Link>

          <div className="p-4">
            <div className="flex flex-col">
              <span className="text-gray-700 text-sm">
                {product.description}
              </span>
              <span className="text-gray-800">
                {currency}
                {product.price}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductItem;
