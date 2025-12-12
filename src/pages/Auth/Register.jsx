import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { PiStudentDuotone } from "react-icons/pi";
import { TfiBook } from "react-icons/tfi";

const Register = () => {
  const { registerUser, signInGoogle, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxios();
  const auth = getAuth();

  // Handle Register
  const handelSignIn = async (data) => {
    try {
      // 1) Create user in Firebase Auth
      await registerUser(data.email, data.password);

      const profileImg = data.photo[0];

      // 2) Upload image to imgbb
      const formData = new FormData();
      formData.append("image", profileImg);

      const ImgURL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_img_api_key
      }`;

      const imgRes = await axios.post(ImgURL, formData);
      const photoURL = imgRes.data.data.url;

      // 3) Update Firebase profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });

      // 4) Get updated user from Firebase
      const user = auth.currentUser;

      // 5) Save user to MongoDB (only once!)
      const userInfo = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: data.role,
      };

      await axios.post("/students", userInfo);

      // 6) Show success alert
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: `Welcome, ${user.displayName}!`,
      }).then(() => {
        // 7) Redirect user after alert
        navigate(location?.state || "/");
      });
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  // Handle Google Sign-in
  const handelGoogleSignIn = async () => {
    try {
      const result = await signInGoogle(); // Sign in with Google
      const user = auth.currentUser;

      // Save user to MongoDB with default role 'student'
      const userInfo = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: "student", // default role
      };

      await axios.post("/students", userInfo);
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: `Welcome, ${user.displayName}!`,
      });
      navigate(location?.state || "/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Google Sign-in Failed",
        text: error.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-100 px-4">
      <div className="w-full max-w-sm">
        <p className=" text-3xl text-center">Register with eTuitionBd</p>

        {/* Form */}
        <form onSubmit={handleSubmit(handelSignIn)} >
          {/* Image Upload */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>{" "}
            <br />
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input"
            />
            {errors.photo && <p className="text-red-500">Photo is required</p>}
          </div>

          {/* Name */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>{" "}
            <br />
            <input
              type="text"
              {...register("name", { required: true, minLength: 5 })}
              className="input input-bordered"
              placeholder="Your name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
            {errors.name?.type === "minLength" && (
              <p className="text-red-500">Minimum 5 characters</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>{" "}
            <br />
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
          {/* Role */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <br />
            <select
              {...register("role", { required: true })}
              className="select select-bordered"
              defaultValue="" // To force user to pick
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="student">
                <PiStudentDuotone />
                Student
              </option>
              <option value="teacher">
                <TfiBook />
                Teacher
              </option>
            </select>
            {errors.role && <p className="text-red-500">Role is required</p>}
          </div>
          {/* Password */}
          <div className="form-control mt-3">
            <label className="label">
              <span className="label-text">Password</span>
            </label>{" "}
            <br />
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input input-bordered"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Minimum 6 characters</p>
            )}
          </div>

          <button type="submit" className="btn btn-secondary w-full mt-5">
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>

        <div className="divider">OR</div>

        {/* Google Sign-in */}
        <button onClick={handelGoogleSignIn} className="btn w-full bg-base-200">
          <FcGoogle size={22} /> Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
