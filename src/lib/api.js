import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://waitlist-backend.eba-amjuhux6.us-east-1.elasticbeanstalk.com/api";

export const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use((config) => {
  const pin   = localStorage.getItem("staffPin");
  const token = localStorage.getItem("staffToken"); 
  if (pin)   config.headers["X-Staff-Pin"]   = pin;
  if (token) config.headers["X-Staff-Token"] = token;
  return config;
});
