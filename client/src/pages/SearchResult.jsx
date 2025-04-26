import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useProductContext } from "../context/productContext";
import ProductCard from "../components/ProductCard";
import { BiSearch } from "react-icons/bi";
import { FaArrowLeftLong } from "react-icons/fa6";

const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  // URLSearchParams = URLSearchParams to parse the query string
  // location.search = Query string parameters ("?query=chai")
  const search = queryParams.get("query") || "";

  const { products } = useProductContext();

  // console.log('query params: ', queryParams)
  // console.log('location path: ', location.pathname)
  // console.log('location search: ', location.search)
  // console.log('search: ', search)

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header with back button and search info */}
        <div className="flex flex-col space-y-4">
          <Link to="/" className="flex items-center text-blue-600 hover:underline transition-colors">
            <FaArrowLeftLong size={18} className="mr-1" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">
              Search Results
            </h1>
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <BiSearch size={16} className="text-gray-500 mr-2" />
              <span className="text-sm md:text-base">{search}</span>
            </div>
          </div>
          
          <p className="text-gray-600">
            {filteredProducts.length === 0
              ? "No products found matching your search"
              : filteredProducts.length === 1
              ? "1 product found"
              : `${filteredProducts.length} products found`}
          </p>
        </div>

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 bg-gray-50 rounded-lg">
            <div className="bg-gray-200 p-4 rounded-full">
              <BiSearch size={32} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="text-gray-600 text-center max-w-md">
              We couldn't find any products matching "{search}". 
              Try a different search term or browse our categories.
            </p>
            <Link 
              to="/" 
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;