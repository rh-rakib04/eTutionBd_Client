import React from "react";
import AdminHome from "../AdminDashboard/AdminHome";
import TutorHome from "../TutorDashboard/TutorHome";
import StudentHome from "../StudentDashboard/StudentHome";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading";

const HomeDashboard = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return <AdminHome />;
  } else if (role === "tutor") {
    return <TutorHome />;
  } else if(role ==='student'){
    return <StudentHome />;
  }
};
export default HomeDashboard;
