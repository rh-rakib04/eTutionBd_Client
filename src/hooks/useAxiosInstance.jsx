import axios from "axios";
import React from "react";

const axiosOne = axios.create({
  baseURL: "https://e-tution-bd-server-chi.vercel.app",
});

const axiosInstance = () => {
  return axiosOne;
};

export default axiosInstance;
