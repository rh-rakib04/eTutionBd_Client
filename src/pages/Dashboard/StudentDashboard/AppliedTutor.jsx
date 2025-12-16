import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import { useParams } from "react-router";

const AppliedTutors = () => {
  const axios = useAxios();
  const { id } = useParams();

  // Fetch tutor applications for a tuition
  const {
    data: tutors = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["appliedTutors", id],
    queryFn: async () => {
      const res = await axios.get(`/applications/tuition/${id}`);
      return res.data;
    },
  });

  const handleApprove = async (applicationId) => {
    try {
      await axios.patch(`/applications/${applicationId}`, {
        status: "accepted",
      });
      Swal.fire("Success!", "Tutor approved successfully.", "success");
      refetch(); // refresh the list
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Something went wrong.",
        "error"
      );
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await axios.patch(`/applications/${applicationId}`, {
        status: "rejected",
      });
      Swal.fire("Rejected!", "Tutor rejected successfully.", "info");
      refetch(); // refresh the list
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Something went wrong.",
        "error"
      );
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading tutors.</p>;
  if (!tutors.length) return <p>No tutors have applied yet.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Applied Tutors</h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow border">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Qualifications</th>
              <th>Experience</th>
              <th>Expected Salary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor, idx) => (
              <tr key={tutor._id}>
                <td>{idx + 1}</td>
                <td>{tutor.name}</td>
                <td>{tutor.tutorEmail}</td>
                <td>{tutor.qualifications}</td>
                <td>{tutor.experience}</td>
                <td>৳{tutor.expectedSalary}</td>
                <td>
                  <span
                    className={`badge ${
                      tutor.status === "pending"
                        ? "badge-warning"
                        : tutor.status === "accepted"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {tutor.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleApprove(tutor._id)}
                    className="btn btn-xs btn-success mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(tutor._id)}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTutors;
