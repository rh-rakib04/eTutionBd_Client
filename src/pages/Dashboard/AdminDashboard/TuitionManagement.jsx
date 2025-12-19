import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";

const TuitionManagement = () => {
  const [tuitions, setTuitions] = useState([]);
  const axiosSecure = useAxios();

  useEffect(() => {
    axiosSecure
      .get("/tuitions")
      .then((res) => setTuitions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleApprove = async (id) => {
    await axiosSecure.patch(`/tuitions/${id}`, { status: "approved" });
    setTuitions((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: "approved" } : t))
    );
  };

  const handleReject = async (id) => {
    await axiosSecure.patch(`/tuitions/${id}`, { status: "rejected" });
    setTuitions((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: "rejected" } : t))
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tuition Management</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Class</th>
            <th>Location</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tuitions.map((t) => (
            <tr key={t._id}>
              <td>{t.subject}</td>
              <td>{t.classLevel}</td>
              <td>{t.location}</td>
              <td>{t.salary}</td>
              <td>{t.status}</td>
              <td>
                {t.status === "active" && (
                  <>
                    <button
                      onClick={() => handleApprove(t._id)}
                      className="btn btn-success btn-sm mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(t._id)}
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TuitionManagement;
