import React from "react";
import Loading from "../components/Loading";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import ForbiddenPage from "../components/ForbiddenPage";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }
  if (role !== "admin") {
    return <ForbiddenPage />;
  }
  return children;
};

export default AdminRoute;
