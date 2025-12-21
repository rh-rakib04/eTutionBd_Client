import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import UpdateUserModal from "./UpdateUserModal";
import useAxios from "../../../hooks/useAxios";
import { useState } from "react";

const UserManagement = () => {
  const axiosSecure = useAxios();
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Change Role
  const handleRoleChange = async (id, role) => {
    await axiosSecure.patch(`/users/${id}/role`, { role });
    refetch();
    Swal.fire("Updated", "User role updated", "success");
  };

  // Block / Activate
  const handleStatusChange = async (id, status) => {
    await axiosSecure.patch(`/users/${id}/status`, { status });
    refetch();
  };

  // Delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete user?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/users/${id}`);
      refetch();
      Swal.fire("Deleted", "User removed", "success");
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold  text-primary">User Management</h2>
        <p className="text-sm ">
          Manage all registered users and their roles
        </p>
      </div>

      {/* Glassy Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg 
        bg-base-200 backdrop-blur-md border border-accent/20">
        <table className="table w-full ">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Edit</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-primary/10 transition border-b border-accent/10"
              >
                {/* User Info */}
                <td className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/40"}
                    className="w-10 h-10 rounded-full border border-accent/30 shadow"
                  />
                  <span className="font-semibold">{user.displayName || "N/A"}</span>
                </td>

                {/* Email */}
                <td className="">{user.email}</td>

                {/* Role Selector */}
                <td>
                  <select
                    className="select select-sm bg-base-100 border border-accent/30 "
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                {/* Status Badge */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === "blocked"
                        ? "bg-red-500/20 text-red-300"
                        : "bg-green-500/20 text-green-300"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                {/* Edit Button */}
                <td>
                  <button
                    className="btn btn-xs bg-indigo-600 hover:bg-indigo-700 "
                    onClick={() => setSelectedUser(user)}
                  >
                    Edit
                  </button>
                </td>

                {/* Actions */}
                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() =>
                      handleStatusChange(
                        user._id,
                        user.status === "blocked" ? "active" : "blocked"
                      )
                    }
                    className={`btn btn-xs ${
                      user.status === "blocked"
                        ? "bg-green-600 hover:bg-green-700 "
                        : "bg-yellow-500 hover:bg-yellow-600 "
                    }`}
                  >
                    {user.status === "blocked" ? "Activate" : "Block"}
                  </button>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-xs bg-red-600 hover:bg-red-700 "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          refetch={refetch}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserManagement;
