import axios, { AxiosHeaders } from "axios";


const api = axios.create({
  baseURL: "https://localhost:5017/api",
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    if (!config.headers){
        config.headers = new AxiosHeaders();
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
