import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

const UpdateUserModal = ({ user, refetch, onClose }) => {
  const axiosSecure = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedUser = {
      displayName: form.displayName.value,
      phone: form.phone.value,
      photoURL: form.photoURL.value,
      verified: form.verified.value === "true",
    };

    await axiosSecure.patch(`/users/${user._id}`, updatedUser);

    Swal.fire("Updated!", "User information updated successfully", "success");
    refetch();
    onClose();
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Update User Info</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="displayName"
            defaultValue={user.displayName}
            className="input input-bordered w-full"
            placeholder="Full Name"
          />

          <input
            defaultValue={user.email}
            readOnly
            className="input input-bordered w-full "
          />

          <input
            name="phone"
            defaultValue={user.phone || ""}
            className="input input-bordered w-full"
            placeholder="Phone"
          />

          <input
            name="photoURL"
            defaultValue={user.photoURL || ""}
            className="input input-bordered w-full"
            placeholder="Photo URL"
          />

          <select
            name="verified"
            defaultValue={String(user.verified)}
            className="select select-bordered w-full"
          >
            <option value="true">Verified</option>
            <option value="false">Not Verified</option>
          </select>

          <div className="modal-action">
            <button className="btn btn-primary">Save</button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateUserModal;
