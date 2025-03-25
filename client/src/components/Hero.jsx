import React from "react";
import MonitorImg from "../assets/monitor2.jpg";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 min-h-[400px] font-serif">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-gray-800">
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold md:text-base">SHOP NOW</p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 broder border-blue-600">
        <img
          className="w-full h-full object-cover"
          src={MonitorImg}
          alt="monitor image"
        />
      </div>
    </div>
  );
};

export default Hero;
