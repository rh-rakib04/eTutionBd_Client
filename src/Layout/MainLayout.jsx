import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // configurable preloader
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="grow min-h-[80vh]">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
