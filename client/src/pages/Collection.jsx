import React, { useState } from "react";
import { useProductContext } from "../context/productContext";
import ProductItem from "../components/ProductItem";

function Collection() {
  const { products } = useProductContext();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-4 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-56">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center gap-2 cursor-pointer"
        >
          FILTERS
        </p>

        {/* category filter */}
        <div
          className={`border border-gray-300 bg-gray-100 px-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className="flex gap-2">
              <input type="checkbox" value={"Men"} className="w-3" /> Men
            </p>

            <p className="flex gap-2">
              <input type="checkbox" value={"Women"} className="w-3" /> Women
            </p>

            <p className="flex gap-2">
              <input type="checkbox" value={"Kids"} className="w-3" /> Kids
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <h2>ALL COLLECTIONS</h2>
          {/* product sort */}
          <select className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* mapping product */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
          {products.map((product) => (
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
    </div>
  );
}

export default Collection;
