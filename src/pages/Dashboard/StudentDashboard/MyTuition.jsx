import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { BookOpen, Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyTuition = () => {
  const editModalRef = useRef();
  const [selectedTuition, setSelectedTuition] = useState(null);

  const { register, handleSubmit, reset } = useForm();
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();

  const { data: tuitions = [], refetch } = useQuery({
    queryKey: ["myTuition", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  //Open modal
  const handleEditModalOpen = (tuition) => {
    setSelectedTuition(tuition);
    reset({
      subject: tuition.subject,
      classLevel: tuition.classLevel,
      location: tuition.location,
      salary: tuition.salary,
      description: tuition.description,
    });
    editModalRef.current.showModal();
  };

  // Form submit
  const handleUpdate = async (data) => {
    try {
      const res = await axiosSecure.patch(
        `/tuitions/${selectedTuition._id}`,
        data
      );

      if (res.data.modifiedCount > 0) {
        refetch();
        editModalRef.current.close();
        toast.success("Tuition updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  // Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tuitions/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Tuition has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (loading) return <Loading />;

  // Empty state
  if (tuitions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <BookOpen size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Tuitions Posted Yet</h2>
        <p className="text-gray-500 mb-4">
          You haven’t posted any tuition requests.
        </p>
        <Link to="/dashboard/post-tuition" className="btn btn-primary">
          <Plus size={18} /> Post a Tuition
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Tuitions</h2>

      <div className="space-y-4">
        {tuitions.map((tuition) => (
          <div
            key={tuition._id}
            className="bg-base-100 border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {tuition.subject} - Class {tuition.classLevel}
                </h3>
                <p className="text-sm text-gray-500">
                  • {tuition.location} • TK {tuition.salary}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  tuition.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {tuition.status}
              </span>
            </div>

            <div className="flex gap-3 mt-4">
              <Link
                to={`/tuitions/${tuition._id}`}
                className="btn btn-sm btn-outline"
              >
                <Eye size={16} /> View
              </Link>

              <button
                onClick={() => handleEditModalOpen(tuition)}
                className="btn btn-sm btn-outline"
              >
                <Pencil size={16} /> Edit
              </button>

              <button
                onClick={() => handleDelete(tuition._id)}
                className="btn btn-sm btn-outline text-error border-error"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Edit Modal */}
      <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Tuition</h3>

          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-3">
            <input
              {...register("subject", { required: true })}
              className="input input-bordered w-full"
              placeholder="Subject"
            />

            <input
              {...register("classLevel", { required: true })}
              className="input input-bordered w-full"
              placeholder="Class"
            />

            <input
              {...register("location", { required: true })}
              className="input input-bordered w-full"
              placeholder="Location"
            />

            <input
              type="number"
              {...register("salary", { required: true })}
              className="input input-bordered w-full"
              placeholder="Salary"
            />

            <textarea
              {...register("description")}
              className="textarea textarea-bordered w-full"
              placeholder="Description"
            ></textarea>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => editModalRef.current.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyTuition;
