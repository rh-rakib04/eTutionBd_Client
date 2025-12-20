import { useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const ReviewForm = ({ tutorId, onReviewAdded }) => {
  const axiosSecure = useAxios();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      tutorId,
      name: user.displayName || user.email,
      rating,
      comment,
    };

    await axiosSecure.post("/reviews", review);
    setRating(0);
    setComment("");
    onReviewAdded();
    Swal.fire({
      title: "Review Submitted!",
      text: "Thank you for your feedback 🚀",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-base-content p-4 rounded-xl shadow mt-6"
    >
      <h3 className="text-lg text-accent font-semibold mb-2">Leave a Review</h3>

      {/* Rating */}
      <div className="flex gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your feedback..."
        className="textarea textarea-bordered w-full mb-3"
      />

      <button type="submit" className="btn btn-primary w-full">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
