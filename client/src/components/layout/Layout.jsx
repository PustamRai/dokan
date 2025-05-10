import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <main
      className="min-h-screen px-3 md:px-32 bg-gray-200 max-w-[1400px] flex justify-between mx-auto"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
