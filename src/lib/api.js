import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://d2ioy80fu31mv2.cloudfront.net/api/waitlist";

export const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const pin   = localStorage.getItem("staffPin");
  const token = localStorage.getItem("staffToken"); 
  if (pin)   config.headers["X-Staff-Pin"]   = pin;
  if (token) config.headers["X-Staff-Token"] = token;
  return config;
});
