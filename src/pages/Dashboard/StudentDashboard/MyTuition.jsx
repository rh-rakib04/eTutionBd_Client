import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Eye, Pencil, Plus, Trash2, BookOpen } from "lucide-react";
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
      const res = await axiosSecure.get(`/my-tuitions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Open modal
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
      text: "This tuition will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tuitions/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Your tuition has been removed.", "success");
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
    <div className="bg-base-100 rounded-xl shadow-lg p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">My Tuitions</h2>
        <Link to="/dashboard/post-tuition" className="btn btn-primary">
          <Plus size={18} /> Post Tuition
        </Link>
      </div>

      <div className="overflow-x-auto  h-[70vh]">
        <table className="table w-full border border-base-300 rounded-lg shadow-sm">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tuitions.map((tuition) => (
              <tr key={tuition._id} className="hover:bg-base-100 transition">
                <td className="font-semibold text-secondary">
                  {tuition.subject}
                </td>
                <td>{tuition.classLevel}</td>
                <td>{tuition.location}</td>
                <td className="text-primary font-bold">৳ {tuition.salary}</td>
                <td>
                  <span
                    className={`badge ${
                      tuition.status === "pending"
                        ? "badge-warning text-warning-content"
                        : tuition.status === "approved"
                        ? "badge-success text-success-content"
                        : tuition.status === "assigned"
                        ? "badge-info text-info-content"
                        : tuition.status === "ongoing"
                        ? "badge-primary text-primary-content"
                        : tuition.status === "completed"
                        ? "badge-neutral text-neutral-content"
                        : tuition.status === "rejected"
                        ? "badge-error text-error-content"
                        : "badge-ghost"
                    }`}
                  >
                    {tuition.status}
                  </span>
                </td>

                <td className="text-center">
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-sm btn-outline">
                      Actions
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                    >
                      <li>
                        <Link to={`/tuitions/${tuition._id}`}>
                          <Eye size={14} /> View
                        </Link>
                      </li>
                      <li>
                        {tuition.status == "pending" && (
                          <button onClick={() => handleEditModalOpen(tuition)}>
                            <Pencil size={14} /> Edit
                          </button>
                        )}
                      </li>
                      <li>
                        <button
                          onClick={() => handleDelete(tuition._id)}
                          className="text-error"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog ref={editModalRef} className="modal">
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <h3 className="font-bold text-lg">Edit Tuition</h3>
          <div className="form-control mt-4">
            <label className="label">Subject</label>
            <input {...register("subject")} className="input input-bordered" />
          </div>
          <div className="form-control mt-4">
            <label className="label">Class Level</label>
            <input
              {...register("classLevel")}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">Location</label>
            <input {...register("location")} className="input input-bordered" />
          </div>
          <div className="form-control mt-4">
            <label className="label">Salary</label>
            <input {...register("salary")} className="input input-bordered" />
          </div>
          <div className="form-control mt-4">
            <label className="label">Description</label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered"
            />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Save
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
      </dialog>
    </div>
  );
};

export default MyTuition;
