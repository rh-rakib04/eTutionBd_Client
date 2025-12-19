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

  // 🗑 Delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete user?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/users/${id}`);
      refetch();
      Swal.fire("Deleted", "User removed", "success");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/40"}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{user.displayName || "N/A"}</span>
                </td>

                <td>{user.email}</td>

                <td>
                  <select
                    className="select select-bordered select-sm"
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td>
                  <span
                    className={`badge ${
                      user.status === "blocked"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => setSelectedUser(user)}
                  >
                    Edit
                  </button>
                </td>

                <td className="flex gap-2">
                  <button
                    onClick={() =>
                      handleStatusChange(
                        user._id,
                        user.status === "blocked" ? "active" : "blocked"
                      )
                    }
                    className="btn btn-xs btn-warning"
                  >
                    {user.status === "blocked" ? "Activate" : "Block"}
                  </button>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  MODAL  */}
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
