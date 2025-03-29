import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/productContext";
import ProductItem from "./ProductItem";

function RelatedProducts({ category }) {
  const { products, loading } = useProductContext();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();

      productCopy = productCopy.filter(
        (product) => category === product.category
      );

      setRelatedProducts(productCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-12">
      <div className="text-center text-3xl  py-2">
        <h2 className="font-serif">Related Products</h2>
      </div>

      {loading ? <div className="text-center">Loading products...</div> : ""}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
        {relatedProducts.map((product) => (
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

export default RelatedProducts;
