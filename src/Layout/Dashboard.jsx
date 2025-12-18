import {
  BookOpen,
  CreditCard,
  Home,
  HomeIcon,
  LogOut,
  LucideUsers,
  Plus,
  Settings,
  User,
} from "lucide-react";
import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import ThemeToggle from "../components/ThemeToggle";

const Dashboard = () => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="py-3 navbar px-5 flex justify-between sticky top-0 z-50">
            <NavLink to="/" className="flex items-center gap-2">
              <img className="w-6 h-6" src="/logo.png" alt="" />
              <span className=" text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                eTuitionBd
              </span>
            </NavLink>
            <div className="flex gap-5 items-center">
              <ThemeToggle />
              <div>
                <div className="ml-auto flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{role}</p>
                  </div>

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
                        <Link to="/" className="btn btn-outline ">
                          <HomeIcon size={16} />
                          Home
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow mt-13">
            {/* Home*/}
            <li>
              <NavLink
                to="/dashboard/home"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <Home />
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {/* ------------>Student<--------------- */}
            {role === "student" && (
              <>
                {" "}
                {/* My tuition*/}
                <li>
                  <NavLink
                    to="/dashboard/my-tuitions"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Tuitions"
                  >
                    <BookOpen />{" "}
                    <span className="is-drawer-close:hidden">My Tuitions</span>
                  </NavLink>
                </li>
                {/* post tuition*/}
                <li>
                  <NavLink
                    to="/dashboard/post-tuition"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Post New"
                  >
                    <Plus />{" "}
                    <span className="is-drawer-close:hidden">Post New</span>
                  </NavLink>
                </li>
                {/* Applied Tutor*/}
                <li>
                  <NavLink
                    to="/dashboard/applied-tutors"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Applied Tutor"
                  >
                    <LucideUsers />
                    <span className="is-drawer-close:hidden">
                      Applied Tutor
                    </span>
                  </NavLink>
                </li>
                {/* Payment*/}
                <li>
                  <NavLink
                    to="/dashboard/payment"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payments"
                  >
                    <CreditCard />
                    <span className="is-drawer-close:hidden">Payments</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* ------------>Tutor<--------------- */}
            {role === "tutor" && (
              <>
                {/* My Application*/}
                <li>
                  <NavLink
                    to="/dashboard/my-application"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Application"
                  >
                    <BookOpen />{" "}
                    <span className="is-drawer-close:hidden">
                      My Application
                    </span>
                  </NavLink>
                </li>
                {/* Ongoing Tuition*/}
                <li>
                  <NavLink
                    to="/dashboard/ongoing-tuition"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Ongoing Tuition"
                  >
                    <LucideUsers />{" "}
                    <span className="is-drawer-close:hidden">
                      Ongoing Tuition
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Settings */}
            <li>
              <NavLink
                to="/dashboard/setting"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile Settings"
              >
                <Settings />
                <span className="is-drawer-close:hidden">Profile Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
