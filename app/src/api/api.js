import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api", // ✅ backend port 
  baseURL: "https://event-app-back-vnev.onrender.com/api", // ✅ backend port 
});

API.interceptors.request.use((req) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo?.token) {
    req.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return req;
});

export default API;
