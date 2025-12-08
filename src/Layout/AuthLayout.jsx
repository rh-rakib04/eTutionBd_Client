import React from "react";
import { NavLink, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      {/* LEFT: Logo */}
      <div className="flex justify-center py-5 space-x-3 flex-shrink-0">
        <NavLink to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">eT</span>
          </div>
          <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            eTuitionBd
          </span>
        </NavLink>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
