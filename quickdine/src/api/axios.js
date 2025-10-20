import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // FastAPI backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
