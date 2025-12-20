import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";
import ForbiddenPage from "../components/ForbiddenPage";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }
  if (role !== "student") {
    return <ForbiddenPage />;
  }
  return children;
};

export default StudentRoute;
