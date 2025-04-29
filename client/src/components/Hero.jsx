import React from "react";
import { Link } from "react-router-dom";
import PushImg from "../assets/push.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import MetaData from "./metadata/MetaData";

export default function Hero() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="bg-gray-100 overflow-hidden">
      <MetaData
        title="Dokan - Best Online Store"
        description="Shop the latest fashion, electronics, and accessories online at Dokan. Best deals and fast delivery!"
        keywords="dokan, online shopping, fashion, electronics"
        image="http://localhost:5173/dokan_icon.png"
      />

      {/* Main hero container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[600px]">
          {/* Left content area */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-center p-6 md:p-12 lg:pl-16 order-2 lg:order-1 border-2 border-gray-400">
            <div className="max-w-lg">
              <span className="inline-block px-4 py-1 mb-6 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold tracking-wide">
                {monthNames[new Date().getMonth()]} Collection{" "}
                {new Date().getFullYear()}
              </span>

              <h1 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
                Elevate your <span className="font-bold">everyday</span> style
              </h1>

              <p className="mt-6 text-gray-600">
                Discover our thoughtfully curated collection of essentials
                designed for modern living.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Link to="/collection">
                  <button className="rounded-full px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-700 transition-all duration-150 ease-in cursor-pointer">
                    Explore Now
                  </button>
                </Link>

                <Link
                  to="/collection"
                  className="inline-flex items-center text-gray-900 font-medium hover:underline transition-colors"
                >
                  View Collections
                  <IoIosArrowRoundForward size={20} />
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <SiTicktick className="text-green-400" />
                  Free Shipping
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Right image area with geometric shapes */}
          <div className="col-span-1 lg:col-span-7 relative order-1 lg:order-2">
            {/* Main product image */}
            <div className="h-full w-full relative z-10">
              <img
                src={PushImg}
                alt="Featured product"
                className="w-full h-[300px] lg:h-[600px] object-cover"
              />

              {/* Product quick info */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-medium">The Essential Collection</h3>
                  <p className="text-sm text-gray-600">Starting at $49</p>
                </div>
                <span className="px-3 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                  New
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
