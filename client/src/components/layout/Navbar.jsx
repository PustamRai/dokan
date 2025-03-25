import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiSearch, BiUser, BiShoppingBag, BiMenu, BiX } from "react-icons/bi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full py-4 px-3 md:px-32 flex items-center justify-between bg-gray-50 shadow-sm">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold">
          DOKAN<span className="text-gray-400">.</span>
        </h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <NavLink to="/" className="flex flex-col items-center">
          <p className="text-sm uppercase hover:text-gray-500 transition-colors">
            Home
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center">
          <p className="text-sm uppercase hover:text-gray-500 transition-colors">
            About
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center">
          <p className="text-sm uppercase hover:text-gray-500 transition-colors">
            Collection
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center">
          <p className="text-sm uppercase hover:text-gray-500 transition-colors">
            Contact
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-1 hover:text-gray-500 transition-colors hover:cursor-pointer">
          <BiSearch size={20} />
        </button>

        <button className="p-1 hover:text-gray-500 transition-colors relative hover:cursor-pointer">
          <BiShoppingBag size={20} />
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* <button className="p-1 hover:text-gray-500 transition-colors hover:cursor-pointer">
          <BiUser size={20} />
        </button> */}

        <div className="relative group/dropdown">
          <button className="p-1 hover:text-gray-500 transition-colors hover:cursor-pointer">
            <BiUser size={20} />
          </button>

          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50opacity-0 invisible group-hover/dropdown:visible group-hover/dropdown:opacity-100 hover:visible hover:opacity-100 transition-all duration-300 ease-in-out">
            <div className="py-1">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
                My Profile 
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
                Orders
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-1 hover:text-gray-500 transition-colors"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <BiX size={24} /> : <BiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-200 shadow-md py-4 px-6 z-50">
          <div className="flex flex-col space-y-4">
            <NavLink to="/" className="flex flex-col items-center">
              <p className="text-sm uppercase hover:text-gray-500 transition-colors">
                Home
              </p>
              <hr className="w-5 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink to="/about" className="flex flex-col items-center">
              <p className="text-sm uppercase hover:text-gray-500 transition-colors">
                About
              </p>
              <hr className="w-5 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink to="/collection" className="flex flex-col items-center">
              <p className="text-sm uppercase hover:text-gray-500 transition-colors">
                Collection
              </p>
              <hr className="w-5 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink to="/contact" className="flex flex-col items-center">
              <p className="text-sm uppercase hover:text-gray-500 transition-colors">
                Contact
              </p>
              <hr className="w-5 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
