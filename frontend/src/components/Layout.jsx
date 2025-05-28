import React from "react";
import Header from "./Header";  // Header
import Nav from "./Nav";        // Navigation
import { Outlet } from "react-router-dom"; // Routes

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pl-[240px]">  {/* Wrapper */}
      <Header />  {/* Header */}
      <Nav />     {/* Nav */}
      <main className="p-4">  {/* Content */}
        <Outlet />  {/* Nested */}
      </main>
    </div>
  );
};

export default Layout;
