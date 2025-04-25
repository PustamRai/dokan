import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <main
      className="min-h-screen px-3 md:px-32 bg-gray-200"
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
