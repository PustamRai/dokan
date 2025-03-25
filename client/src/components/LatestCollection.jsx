import React from "react";
import { Link } from "react-router-dom"
import { useProductContext } from "../context/productContext";


function LatestCollection() {
  const { products, loading, currency } = useProductContext();

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">Latest Collection</h2>
      <p className="text-sm mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi aliquam eaque odio rem ab quas repellat voluptatum ullam sit quasi dicta dolores exercitationem nisi eius obcaecati, perferendis fuga neque dolorum.2</p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Link 
            to={`/product/${product._id}`}
            >
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
                  {currency}{product.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
