import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
  baseURL: "https://e-tution-bd-server-chi.vercel.app",
  withCredentials: true, // if you need cookies/credentials
});

const useAxios = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user) {
          // Always fetch a fresh Firebase ID token
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // console.log(error);
        const statusCode = error?.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/auth/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosInstance;
};

export default useAxios;
