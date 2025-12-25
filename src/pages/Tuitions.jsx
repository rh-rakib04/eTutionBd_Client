import React, { useState, useCallback } from "react";
import TuitionCard from "../components/TuitionCard";
import useAxiosInstance from "../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { BookOpen, Plus } from "lucide-react";
import useRole from "../hooks/useRole";
import { debounce } from "lodash";

const Tuitions = () => {
  const axios = useAxiosInstance();
  const role = useRole();

  //  Local state for search + filter
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "date",
    order: "desc",
    page: 1,
    limit: 9,
  });

  //  Debounced search handler
  const debouncedUpdate = useCallback(
    debounce((value) => {
      setFilters((prev) => ({ ...prev, search: value, page: 1 }));
    }, 500),
    []
  );

  //  Fetch with filters
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching, // 👈 subtle loading state
  } = useQuery({
    queryKey: ["tuitions", filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`/tuitions?status=approved&${params}`);
      return res.data;
    },
    keepPreviousData: true, //  keeps old data visible
  });

  const tuitions = data?.tuitions || [];
  const total = data?.total || 0;

  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-4xl mt-10 text-center md:text-5xl font-extrabold">
        Browse Tuitions
      </h1>
      <p className="text-lg mt-4 text-base-content/70 max-w-2xl text-center mx-auto mb-10">
        Find the perfect tuition for your learning needs
      </p>

      {/*  One Search Bar + One Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Search by subject, location, or class level"
          onChange={(e) => debouncedUpdate(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />

        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters({ ...filters, sortBy: e.target.value, page: 1 })
          }
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="date">Newest</option>
          <option value="budget">Budget</option>
        </select>
      </div>

      {/*  Results counter */}
      <p className="text-sm text-gray-600 text-center mb-6">
        Showing {(filters.page - 1) * filters.limit + 1}–
        {(filters.page - 1) * filters.limit + tuitions.length} of {total}{" "}
        tuitions
      </p>

      {/*  Subtle loading indicator */}
      {isFetching && (
        <p className=" text-primary-400 text-2xl text-center mb-4">
          Updating results...
        </p>
      )}

      {/*  Tuition Cards */}
      {isFetching || isLoading ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          {" "}
          <span className="loading-dots loading-xl"></span>{" "}
        </div>
      ) : tuitions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <BookOpen size={80} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Tuitions Found</h2>
          {role === "student" ? (
            <Link to="/dashboard/post-tuition" className="btn btn-primary">
              <Plus size={24} /> Post a Tuition
            </Link>
          ) : (
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>
      )}

      {/*  Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        <button
          className="btn btn-outline"
          disabled={filters.page === 1}
          onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
        >
          Prev
        </button>
        <button
          className="btn btn-outline"
          disabled={tuitions.length < filters.limit}
          onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tuitions;
