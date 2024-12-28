import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TMDB_KEY;
  if (token) {
    config.headers.Accept = `application/json`;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
