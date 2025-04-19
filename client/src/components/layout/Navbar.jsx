import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiSearch, BiUser, BiMenu, BiX } from "react-icons/bi";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { useProductContext } from "../../context/productContext";
import { useCartContext } from "../../context/cartContext";
import { useAuthContext } from "../../context/authContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { showSearch, setShowSearch } = useProductContext();
  const { token, logout, user } = useAuthContext();
  const { cartCount } = useCartContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logoutUser = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="w-full py-4 px-3 md:px-32 flex items-center justify-between bg-gray-50 shadow-sm">
      {/* Logo */}
      <NavLink to="/">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">
            DOKAN<span className="text-gray-400">.</span>
          </h1>
        </div>
      </NavLink>

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
        <button
          className="p-1 hover:text-gray-500 transition-colors hover:cursor-pointer"
          onClick={() => setShowSearch(!showSearch)}
        >
          <BiSearch size={20} />
        </button>

        <NavLink to="/cart">
          <button className="p-1 hover:text-gray-500 transition-colors relative hover:cursor-pointer">
            <PiShoppingCartDuotone size={20} />
            {token && (
              <span className="absolute -top-1 -right-1 p-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </NavLink>

        <div className="relative">
          {token ? (
            <button
              className="p-1 hover:text-gray-500 transition-colors hover:cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="flex flex-col items-center">
                <BiUser size={20} />
                <p className="text-blue-400 text-sm">{user?.name}</p>
              </div>
            </button>
          ) : (
            <NavLink to="/login">
              <button
                type="submit"
                className="w-full md:w-auto md:px-12 px-2 py-2 bg-black text-white text-sm font-medium rounded-xs hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mx-auto block cursor-pointer font-mono"
              >
                logIn
              </button>
            </NavLink>
          )}

          {/* Dropdown Menu - now visible based on state, not hover */}
          {token && isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="py-1">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
                  My Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => {
                    navigate("/orders");
                    setIsDropdownOpen(false);
                  }}
                >
                  Orders
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-1 hover:text-gray-500 transition-colors cursor-pointer"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <BiX size={24} /> : <BiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-200 shadow-md py-4 px-6 z-50">
          <div className="flex flex-col space-y-4">
            <NavLink
              to="/"
              className="flex flex-col items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <p className="text-sm uppercase hover:text-gray-500 transition-colors">
                Home
              </p>
              <hr className="w-5 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink
              to="/about"
              className="flex flex-col items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <p className="text-sm uppercase hover:text-gray-500 transition-colors">
                About
              </p>
              <hr className="w-5 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink
              to="/collection"
              className="flex flex-col items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <p className="text-sm uppercase hover:text-gray-500 transition-colors">
                Collection
              </p>
              <hr className="w-5 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

            <NavLink
              to="/contact"
              className="flex flex-col items-center"
              onClick={() => setIsMenuOpen(false)}
            >
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
