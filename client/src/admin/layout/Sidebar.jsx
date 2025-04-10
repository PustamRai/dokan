import React from "react";
import { NavLink } from "react-router-dom";
import { GoPlusCircle } from "react-icons/go";
import { CiCircleList } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";

function Sidebar() {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <NavLink
      className='cursor-pointer'
      to='/admin'
      >
        <div className="border border-b-2 p-3 flex flex-col items-center">
          <h2 className="font-bold text-2xl">Dokan.</h2>
          <p className="font-mono text-sm">Admin panel</p>
        </div>
      </NavLink>

      <div className="flex flex-col gap-4 pt-6 text-[15px]">
        <NavLink
          to="/admin/add-products"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-in ${
              isActive ? "bg-pink-100" : "hover:bg-pink-50"
            }`
          }
        >
          <GoPlusCircle className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/admin/list"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-in ${
              isActive ? "bg-pink-100" : "hover:bg-pink-50"
            }`
          }
        >
          <CiCircleList className="w-5 h-5" />
          <p className="hidden md:block">List</p>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-in ${
              isActive ? "bg-pink-100" : "hover:bg-pink-50"
            }`
          }
        >
          <FiShoppingBag className="w-5 h-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>

        <NavLink 
        className="mt-[335px] flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded-lg cursor-pointer hover:bg-pink-50"
        >
          <CiLogout className="w-5 h-5" />
          <p className="hidden md:block">Logout</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
