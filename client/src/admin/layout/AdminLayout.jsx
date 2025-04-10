import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen pt-1 md:pl-32">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-grow px-3 md:px-10 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
