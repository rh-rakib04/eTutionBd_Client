import React, { use } from "react";
import { Link, NavLink } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully!"))
      .catch((err) => toast.error(err.message));
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/tuitions">Tuitions</NavLink>
      </li>
      <li>
        <NavLink to="/tutors">Tutors</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar px-4 max-w-7xl mx-auto  ">
        {" "}
        {/* LEFT: LOGO (Mobile + Desktop) */}
        <div className="navbar-start">
          <NavLink to="/" className="flex items-center gap-2">
            <img className="w-6 h-6" src="/logo.png" alt="" />
            <span className=" text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              eTuitionBd
            </span>
          </NavLink>
        </div>
        {/* CENTER: NAV (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        {/* RIGHT: MENU BUTTON (Mobile) + THEME TOGGLE*/}
        <div className="navbar-end flex items-center gap-2">
          {/* MOBILE NAV MENU */}
          <div className="dropdown dropdown-left lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 shadow-lg rounded-box mt-3 w-60 p-2"
            >
              {navItems}

              <div className="border-t my-2"></div>

              {/* THEME TOGGLE inside menu */}
              <ThemeToggle />

              <div className="border-t my-2"></div>

              {/* AUTH - MOBILE */}
              {user ? (
                <>
                  <li>
                    <NavLink to="/dashboard/home">Dashboard</NavLink>
                  </li>
                  <li>
                    <button className="text-red-500" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/auth/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/auth/register">Register</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* THEME TOGGLE (Always visible) */}
          <div className="hidden sm:block lg:hidden">
            <ThemeToggle />
          </div>

          {/* DESKTOP AUTH */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <>
                <NavLink
                  className="btn btn-sm bg-linear-to-r from-indigo-500 to-purple-600 text-white"
                  to="/dashboard/home"
                >
                  Dashboard
                </NavLink>

                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-circle avatar">
                    <img
                      className="rounded-full"
                      src={user?.photoURL || "https://i.pravatar.cc/40"}
                      alt="user"
                    />
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box w-44 shadow mt-3"
                  >
                    <li>
                      <Link to="/dashboard/setting">
                        <User size={16} /> Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="btn btn-outline btn-sm text-red-500 border-red-300"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <NavLink className="btn btn-outline btn-sm" to="/auth/login">
                  Login
                </NavLink>
                <NavLink
                  className="btn btn-sm bg-linear-to-r from-indigo-500 to-purple-600 text-white"
                  to="/auth/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
