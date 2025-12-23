import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import Swal from "sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";

const Login = () => {
  const { signIn, signInGoogle, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  // form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // form function
  const handelLogin = (data) => {
    // console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome, ${user.displayName}!`,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  const handelGoogleSignIn = () => {
    signInGoogle()
      .then(async (result) => {
        const user = result.user;

        // Normalize email before saving
        const userInfo = {
          email: user.email.toLowerCase(),
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        try {
          const res = await axios.post("/users", userInfo);

          if (res.data.insertedId) {
            // console.log("User created in database");
          }

          Swal.fire({
            icon: "success",
            title: "Signin Successful!",
            text: `Welcome, ${user.displayName}!`,
          });

          // Navigate after success
          navigate(location?.state || "/");
        } catch (err) {
          console.error("Error saving user:", err.message);
          Swal.fire({
            icon: "error",
            title: "Database Error",
            text: "Could not save user info. Please try again.",
          });
        }
      })
      .catch((error) => {
        console.error("Google Sign-in Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Signin Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-500">Login with eTuitionBd</p>

        <form onSubmit={handleSubmit(handelLogin)}>
          {/* Email */}
          <div className="form-control mt-6">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <br />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true, minLength: 5 })}
              className="input input-bordered"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email must be required</p>
            )}
          </div>

          {/* Password */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <br />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password must be required</p>
            )}
          </div>

          <Link
            to="/auth/forgotPassword"
            className="text-sm mt-1 cursor-pointer text-primary hover:underline"
          >
            Forgot Password?
          </Link>

          <button type="submit" className="btn btn-accent w-full mt-5">
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-primary cursor-pointer hover:underline"
          >
            Register
          </Link>
        </p>

        <div className="divider">Or</div>

        <button onClick={handelGoogleSignIn} className="btn w-full bg-base-200">
          <FcGoogle size={22} /> Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
