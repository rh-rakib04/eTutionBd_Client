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
import TuitionDetails from "../components/Home/TuitionDetails";
import BeATutor from "../pages/BeATutor";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/tuitions",
        Component: Tuitions,
      },
      {
        path: "/tuitions/:id",
        element: (
          <PrivateRoutes>
            <TuitionDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/be-a-tutor",
        element: (
          <PrivateRoutes>
            <BeATutor />
          </PrivateRoutes>
        ),
      },
      {
        path: "/tutors",
        Component: Tutors,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
]);
export default router;
