import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

const BeATutor = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });
  const onSubmit = async (data) => {
    const tutorData = {
      ...data,
      role: "tutor",
    };

    try {
      await axiosInstance.post("/tutors", tutorData);
      toast.success("Tutor application submitted successfully!");
      reset();
      navigate(location?.state || "/tuitions");
    } catch (error) {
      toast.error("Failed to submit application");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* HERO */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Become a Tutor</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share your knowledge, help students succeed, and earn with flexible
          teaching opportunities.
        </p>
      </div>

      {/* BENEFITS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Benefit title="Flexible Schedule" desc="Teach at your own time." />
        <Benefit title="Verified Students" desc="Safe & trusted platform." />
        <Benefit title="Earn More" desc="Get paid for your expertise." />
      </div>

      {/* FORM */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Tutor Application Form</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input
            label="Full Name"
            register={register("displayName", { required: "Name is required" })}
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            readOnly
            register={register("email", {
              required: "Email is required",
            })}
            error={errors.email}
          />

          <Input
            label="Phone Number"
            register={register("phone", { required: "Phone is required" })}
            error={errors.phone}
          />

          <Input
            label="Location"
            register={register("location", {
              required: "Location is required",
            })}
            error={errors.location}
          />

          <Input
            label="Subject You Teach"
            register={register("subject", { required: "Subject is required" })}
            error={errors.subject}
          />

          <Input
            label="Highest Qualification"
            register={register("qualification", {
              required: "Qualification is required",
            })}
            error={errors.qualification}
          />

          {/* EXPERIENCE */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Experience</label>
            <select
              {...register("experience", {
                required: "Experience is required",
              })}
              className="w-full border rounded-lg p-2 mt-1"
            >
              <option value="">Select experience in year</option>
              <option value="0-1 year">0–1 </option>
              <option value="1-3 years">1–3 </option>
              <option value="3+ years">3+ </option>
            </select>
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            disabled={isSubmitting}
            className="md:col-span-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
          >
            {isSubmitting ? "Submitting..." : "Apply as Tutor"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* Reusable Input Component */
const Input = ({ label, register, error, type = "text" }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type={type}
      {...register}
      className="w-full border rounded-lg p-2 mt-1"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

/* Benefit Card */
const Benefit = ({ title, desc }) => (
  <div className="border rounded-xl p-5 text-center">
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

export default BeATutor;
