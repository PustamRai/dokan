import React from "react";
import { useProductContext } from "../context/productContext";
import { BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useProductContext();
  

  return showSearch ? (
    <div className="flex items-center justify-center space-x-2 py-3 ">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 pr-10 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
        />
        <BiSearch
          className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400"
          size={18}
        />
      </div>

      <div
        onClick={() => setShowSearch(false)}
        className="text-gray-500 hover:text-gray-700 cursor-pointer "
      >
        <RxCross2 size={24} />
      </div>
    </div>
  ) : null
}

export default SearchBar;
