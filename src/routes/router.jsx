import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Tuitions from "../pages/Tuitions";
import Tutors from "../pages/Tutors";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoutes from "../routes/PrivateRoutes";
import BeATutor from "../pages/BeATutor";
import Dashboard from "../Layout/Dashboard";
import HomeDashboard from "../pages/Dashboard/HomeDashboard/HomeDashboard";
import MyTuition from "../pages/Dashboard/StudentDashboard/MyTuition";
import PostTuitions from "../pages/Dashboard/StudentDashboard/PostTuitions";
import Setting from "../pages/Dashboard/HomeDashboard/Setting";
import AppliedTutor from "../pages/Dashboard/StudentDashboard/AppliedTutor";
import Payment from "../pages/Dashboard/StudentDashboard/Payment/Payment";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import AdminRoute from "./AdminRoute";
import MyApplication from "../pages/Dashboard/TutorDashboard/MyApplication";
import PaymentSuccess from "../pages/Dashboard/StudentDashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/StudentDashboard/Payment/PaymentCancelled";
import OngoingTuition from "../pages/Dashboard/TutorDashboard/OngoingTuition";
import UserManagement from "../pages/Dashboard/AdminDashboard/UserManagement";
import TuitionManagement from "../pages/Dashboard/AdminDashboard/TuitionManagement";
import RevenueHistory from "../pages/Dashboard/TutorDashboard/RevenueHistory";
import TuitionDetails from "../components/TuitionDetails";
import ErrorPage from "../components/ErrorPage";
import ForbiddenPage from "../components/ForbiddenPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "tuitions", element: <Tuitions /> },
      {
        path: "tuitions/:id",
        element: (
          <PrivateRoutes>
            <TuitionDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "be-a-tutor",
        element: (
          <PrivateRoutes>
            <BeATutor />
          </PrivateRoutes>
        ),
      },
      { path: "tutors", element: <Tutors /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      { path: "home", element: <HomeDashboard /> },
      { path: "setting", element: <Setting /> },

      // Student routes
      {
        path: "my-tuitions",
        element: (
          <StudentRoute>
            <MyTuition />
          </StudentRoute>
        ),
      },
      {
        path: "post-tuition",
        element: (
          <StudentRoute>
            <PostTuitions />
          </StudentRoute>
        ),
      },
      {
        path: "applied-tutors",
        element: (
          <StudentRoute>
            <AppliedTutor />
          </StudentRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <StudentRoute>
            <Payment />
          </StudentRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <StudentRoute>
            <PaymentSuccess />
          </StudentRoute>
        ),
      },
      {
        path: "payment-cancelled",
        element: (
          <StudentRoute>
            <PaymentCancelled />
          </StudentRoute>
        ),
      },

      // Tutor routes
      {
        path: "my-application",
        element: (
          <TutorRoute>
            <MyApplication />
          </TutorRoute>
        ),
      },
      {
        path: "ongoing-tuition",
        element: (
          <TutorRoute>
            <OngoingTuition />
          </TutorRoute>
        ),
      },
      {
        path: "revenue-history",
        element: (
          <TutorRoute>
            <RevenueHistory />
          </TutorRoute>
        ),
      },

      // Admin routes
      {
        path: "user-management",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
      {
        path: "tuition-management",
        element: (
          <AdminRoute>
            <TuitionManagement />
          </AdminRoute>
        ),
      },
    ],
  },
  // Catch-all route for 404
  { path: "*", element: <ErrorPage /> },
  // Optional forbidden route
  { path: "forbidden", element: <ForbiddenPage /> },
]);
export default router;
