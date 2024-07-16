import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
});

api.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      config.headers["Authorization"] = `jwt ${jwtToken}`;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
