import React from "react";
import ProductItem from "./ProductItem";
import { useProductContext } from "../context/productContext";

function LatestCollection() {
  const { products } = useProductContext()

  const latestProducts = products.slice(0,6)
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">Latest Collection</h2>
      <p className="text-sm mb-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi aliquam
        eaque odio rem ab quas repellat voluptatum ullam sit quasi dicta dolores
        exercitationem nisi eius obcaecati, perferendis fuga neque dolorum.2
      </p>

      {/* rendering product items */}
      <ProductItem products={latestProducts} />

    </div>
  );
}

export default LatestCollection;
