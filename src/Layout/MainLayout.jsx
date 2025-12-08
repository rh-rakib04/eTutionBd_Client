import React, { useEffect, useState } from "react";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1.5s preloader (you can change it)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Show loader instead of website
  if (loading) return <Loading />;

  // After loading is done → show website
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
