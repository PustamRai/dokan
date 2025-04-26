import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useProductContext } from "../context/productContext";

function LatestCollection() {
  const { products, loading } = useProductContext();
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 6));
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">Our Latest Collection</h2>
      <p className="text-xs mb-2 md:text-lg">
      Discover our newest arrivals, crafted with care and passion. From trendy styles to timeless classics, our latest collection has something for everyone.
      Shop now and stay ahead with the freshest picks of the season! 
      </p>

      {loading ? (
        <div className="text-center py-10 text-gray-500 font-semibold text-lg">
          Loading products...
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {/* rendering product items */}
          {latestProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.image}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestCollection;
