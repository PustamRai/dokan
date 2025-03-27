import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useProductContext } from "../context/productContext";

function LatestCollection() {
  const { products } = useProductContext();
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 6));
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">Latest Collection</h2>
      <p className="text-sm mb-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi aliquam
        eaque odio rem ab quas repellat voluptatum ullam sit quasi dicta dolores
        exercitationem nisi eius obcaecati, perferendis fuga neque dolorum.2
      </p>

      {/* rendering product items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            image={product.image}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
