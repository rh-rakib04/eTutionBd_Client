import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ApplyTutorModal = ({ modalRef, tuition, axiosSecure, user }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const applicationData = {
      tuitionId: tuition._id,
      subject: tuition.subject,
      classLevel: tuition.classLevel,
      studentEmail: tuition.studentEmail,
      location: tuition.location,
      tutorEmail: user.email,
      tutorName: user.displayName,
      experience: data.experience,
      qualification: data.qualification,
      expectedSalary: data.expectedSalary,
      message: data.message,
    };

    try {
      await axiosSecure.post("/applications", applicationData);
      toast.success("Applied successfully!");
      reset();
      modalRef.current.close();
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("You already applied!");
      } else {
        toast.error("Application failed");
      }
    }
  };

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Apply as Tutor</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            type="text"
            {...register("displayName", { required: true })}
            defaultValue={user?.displayName}
            className="input input-bordered w-full"
            placeholder="Tutor Name"
          />
          <input
            type="email"
            {...register("email", { required: true })}
            defaultValue={user?.email}
            className="input input-bordered w-full"
            placeholder="Tutor Email"
          />
          <input
            value={`${tuition.subject} - ${tuition.classLevel}`}
            disabled
            className="input input-bordered w-full"
          />

          <input
            type="number"
            {...register("expectedSalary", { required: true })}
            className="input input-bordered w-full"
            placeholder="Expected Salary (৳)"
          />
          <input
            type="text"
            {...register("qualification", { required: true })}
            className="input input-bordered w-full"
            placeholder="Qualification"
          />
          <input
            type="text"
            {...register("experience", { required: true })}
            className="input input-bordered w-full"
            placeholder="Experience"
          />

          <textarea
            {...register("message")}
            className="textarea textarea-bordered w-full"
            placeholder="Why should the student choose you?"
          />

          <div className="modal-action">
            <button className="btn btn-primary">Apply</button>
            <button
              type="button"
              onClick={() => modalRef.current.close()}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ApplyTutorModal;
