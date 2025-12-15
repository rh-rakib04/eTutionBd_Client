import { useForm } from "react-hook-form";
import { MapPin, BookOpen } from "lucide-react";

import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const PostTuition = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axios = useAxios();

  const onSubmit = async (data) => {
    const tuitionData = {
      ...data,
      status: "open",
      createdAt: new Date(),
    };

    try {
      await axios.post("/tuitions", tuitionData);
      Swal.fire("Success 🎉", "Tuition posted successfully", "success");
      reset();
    } catch (error) {
      Swal.fire("Error ❌", "Failed to post tuition", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-200 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Post a New Tuition</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Student Email */}
        <div>
          <label className="label">Student Email</label>
          <input
            {...register("studentEmail", { required: true })}
            defaultValue={user?.email}
            className="input input-bordered w-full"
            placeholder="Student Email"
          />
        </div>
        {/* Subject */}
        <div>
          <label className="label">Subject</label>
          <input
            {...register("subject", { required: true })}
            className="input input-bordered w-full"
            placeholder="Math"
          />
        </div>
        {/* Subject type Banner */}
        <div>
          <label className="label">Subject Banner</label>
          <input
            {...register("image", { required: true })}
            className="input input-bordered w-full"
            placeholder="Banner URL"
          />
        </div>

        {/* Class */}
        <div>
          <label className="label">Class Level</label>
          <select
            {...register("classLevel", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Class</option>
            <option>Class 6</option>
            <option>Class 7</option>
            <option>Class 8</option>
            <option>Class 9</option>
            <option>Class 10</option>
            <option>HSC</option>
          </select>
        </div>

        {/* Days & Salary */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Days / Week</label>
            <input
              type="number"
              {...register("daysPerWeek")}
              className="input input-bordered w-full"
              placeholder="3"
            />
          </div>

          <div>
            <label className="label">Salary (৳)</label>
            <input
              type="number"
              {...register("salary")}
              className="input input-bordered w-full"
              placeholder="4000"
            />
          </div>
          <div>
            <label className="label">Duration</label>
            <input
              type="number"
              {...register("duration")}
              className="input input-bordered w-full"
              placeholder="Hours Daily"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="label">Location</label>
          <input
            {...register("location")}
            className="input input-bordered w-full"
            placeholder="Mirpur"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full"
            placeholder="Need an experienced math tutor"
          ></textarea>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Post Tuition
        </button>
      </form>
    </div>
  );
};

export default PostTuition;
