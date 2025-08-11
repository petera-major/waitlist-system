import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://d2ioy80fu31mv2.cloudfront.net/api";

export const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("staffToken"); 
  if (token) config.headers["X-Staff-Token"] = token;
  return config;
});
