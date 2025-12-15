import React from "react";
import { NavLink, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      {/* LEFT: Logo */}
      <div className="flex justify-center py-5 space-x-3 shrink-0">
        <NavLink to="/" className="flex items-center space-x-3">
          <img className="w-6 h-6" src="/logo.png" alt="" />
          <span className="text-xl lg:text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            eTuitionBd
          </span>
        </NavLink>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
