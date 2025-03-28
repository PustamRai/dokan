import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/productContext";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";

function Collection() {
  const { products, loading, search } = useProductContext();
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("relevant")
  

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)) {
      // If category exists, remove it
      console.log("remove cat: ", category)
      setCategory(prevCategory => prevCategory.filter(item => item !== e.target.value))
    } else {
      // If category does not exist, add it
      console.log("add cat: ", category)
      setCategory(prevCategory => [...prevCategory, e.target.value])
    }
  }

  // filter products based on category
  // useEffect(() => {
  //   if (category.length === 0) {
  //     setFilterProducts(products);
  //   } else {
  //     setFilterProducts(products.filter((product) => category.includes(product.category)));
  //   }
  // }, [category, products]);

  // Filter products based on category & search query**
  useEffect(() => {
    let copyProducts = products;

    // Apply category filter
    if (category.length > 0) {
      copyProducts = copyProducts.filter((product) =>
        category.includes(product.category)
    );
    console.log("filter category: ", copyProducts)
    }

    // Apply search filter
    if (search.trim() !== "") {
      copyProducts = copyProducts.filter((product) =>
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilterProducts(copyProducts);
  }, [category, search, products]);
  

  // sort filter products 
  useEffect(() => {
    let sorted = [...filterProducts]

    if (sortOption === "low-high") {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortOption === "high-low") {
      sorted.sort((a, b) => b.price - a.price)
    }

    setSortedProducts(sorted)
  }, [filterProducts, sortOption])

  return (
    <>
    <SearchBar /> 
    <div className="flex flex-col md:flex-row gap-4 pt-10 ">
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
              <input 
              type="checkbox" 
              value={"Men"} 
              className="w-3" 
              onChange={toggleCategory}
              /> Men
            </p>

            <p className="flex gap-2">
              <input 
              type="checkbox" 
              value={"Women"} 
              className="w-3" 
              onChange={toggleCategory}
              /> Women
            </p>

            <p className="flex gap-2">
              <input 
              type="checkbox" 
              value={"Kids"} 
              className="w-3" 
              onChange={toggleCategory}
              /> Kids
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <h2>ALL COLLECTIONS</h2>
          {/* product sort */}
          <select 
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border-2 border-gray-300 text-sm px-2 cursor-pointer" 
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* mapping product */}
        {loading ? <div>Loading products...</div> : ""}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
          {sortedProducts.map((product) => (
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
    </>
  );
}

export default Collection;
