import React from "react";
import Loading from "../components/Loading";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }
  if (role !== "admin") {
    return <div>Forbidden</div>;
  }
  return children;
};

export default AdminRoute;
