import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle the search action
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`); // encodeURIComponent is used to handle spaces/special characters safely.
    }
  };

  return (
    <div className="flex items-center gap-1 mx-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // update search query
        className="border border-gray-500 focus:outline-none focus:ring-1 focus:ring-black p-1 rounded-sm w-16 md:w-96"
        placeholder="Search in Dokan"
      />
      <BiSearch
        size={35}
        onClick={handleSearch} // run search on click
        className="border border-gray-500 px-2 py-2 rounded-sm cursor-pointer hover:bg-gray-200 transition-all duration-150 ease-in"
      />
    </div>
  );
}

export default SearchBar;
