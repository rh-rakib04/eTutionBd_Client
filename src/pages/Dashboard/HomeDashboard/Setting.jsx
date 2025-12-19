import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";
import toast from "react-hot-toast";

const Setting = () => {
  const { user, setUser } = useAuth(); // assume your auth hook provides a setter
  const axiosSecure = useAxios();

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      displayName: user?.displayName,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      bio: user?.bio,
      photoURL: user?.photoURL,
    },
  });

  // Watch form fields to dynamically update avatar
  const photoURL = watch("photoURL");

  // Reset form whenever `user` updates
  useEffect(() => {
    reset({
      displayName: user?.displayName,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      bio: user?.bio,
      photoURL: user?.photoURL,
    });
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      // 1️⃣ Update MongoDB
      await axiosSecure.patch(`/users/${user.email}`, data);

      // 2️⃣ Update Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });

      // 3️⃣ Update user in context (so UI updates immediately)
      setUser({
        ...user,
        ...data,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-200  rounded-xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

      {/* Avatar */}
      <div className="flex items-center gap-5 mb-6">
        <img
          src={photoURL || "https://i.pravatar.cc/100"}
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <p className="font-medium">Profile Picture</p>
          <p className="text-sm ">JPG, PNG or GIF. Max 10MB</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label>Photo Url</label>
        <input
          {...register("photoURL")}
          className="input input-bordered w-full"
          placeholder="Photo URL"
        />
        <label>Name</label>
        <input
          {...register("displayName")}
          className="input input-bordered w-full"
          placeholder="Full Name"
        />
        <label>Email</label>
        <input
          {...register("email")}
          disabled
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <label>Phone Number</label>
        <input
          {...register("phone")}
          className="input input-bordered w-full"
          placeholder="Phone"
        />
        <label>Address</label>
        <input
          {...register("address")}
          className="input input-bordered w-full"
          placeholder="Location"
        />
        <label>Bio</label>
        <textarea
          {...register("bio")}
          className="textarea textarea-bordered w-full"
          placeholder="Bio"
        />

        <div className="flex gap-4">
          <button className="btn btn-primary">Save Changes</button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => reset()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
