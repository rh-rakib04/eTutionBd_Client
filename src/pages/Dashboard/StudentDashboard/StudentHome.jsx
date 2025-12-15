import React from "react";

const StudentHome = () => {
  return (
    <div>
      {" "}
      {/* -------- Page Content -------- */}
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold">Student Dashboard</h2>
          <p className="text-gray-500">
            Manage your tuitions, tutors, and payments
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-blue-100">
            <p className="text-sm text-blue-700">Active Tuitions</p>
            <h3 className="text-2xl font-bold">2</h3>
          </div>
          <div className="p-5 rounded-xl bg-green-100">
            <p className="text-sm text-green-700">Applied Tutors</p>
            <h3 className="text-2xl font-bold">2</h3>
          </div>
          <div className="p-5 rounded-xl bg-purple-100">
            <p className="text-sm text-purple-700">Total Spent</p>
            <h3 className="text-2xl font-bold">8300 TK</h3>
          </div>
          <div className="p-5 rounded-xl bg-orange-100">
            <p className="text-sm text-orange-700">Active Tutors</p>
            <h3 className="text-2xl font-bold">1</h3>
          </div>
        </div>

        {/* My Tuitions */}
        <div className="bg-base-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">My Tuitions</h3>

          {/* Tuition Card */}
          <div className="bg-base-100 rounded-lg p-4 mb-4 border">
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold">Mathematics - Class 10</h4>
                <p className="text-sm text-gray-500">
                  Class 10 · Dhaka · TK 2000–3000
                </p>
                <p className="text-sm mt-1">12 tutor(s) applied</p>
              </div>
              <span className="badge badge-success">Active</span>
            </div>

            <div className="flex gap-2 mt-3">
              <button className="btn btn-outline btn-sm">View</button>
              <button className="btn btn-outline btn-sm">Edit</button>
              <button className="btn btn-outline btn-sm btn-error">
                Delete
              </button>
            </div>
          </div>

          {/* Tuition Card */}
          <div className="bg-base-100 rounded-lg p-4 border">
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold">English - Class 9</h4>
                <p className="text-sm text-gray-500">
                  Class 9 · Dhaka · TK 1500–2500
                </p>
                <p className="text-sm mt-1">8 tutor(s) applied</p>
              </div>
              <span className="badge">Closed</span>
            </div>

            <div className="flex gap-2 mt-3">
              <button className="btn btn-outline btn-sm">View</button>
              <button className="btn btn-outline btn-sm">Edit</button>
              <button className="btn btn-outline btn-sm btn-error">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
