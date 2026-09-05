import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle expired/invalid token
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("accessToken");
//       window.location.replace("/signin");
//     }
//     if (error.response?.status === 402) {
//       window.location.replace("/complete-profile");
//     }

//     return Promise.reject(error);
//   },
// );

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("accessToken");

      if (window.location.pathname !== "/signin") {
        window.location.replace("/signin");
      }
    }

    if (status === 402) {
      if (window.location.pathname !== "/complete-profile") {
        window.location.replace("/complete-profile");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
