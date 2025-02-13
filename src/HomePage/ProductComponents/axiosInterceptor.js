import axios from "axios";

// Create an Axios instance with the base URL for your backend
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000", 
});

// Request interceptor (no token handling now)
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add any custom request headers here if needed, but no authentication logic anymore
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (no token handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;




// import axios from "axios";



// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:8000", 
// });


// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("access_token");
//     if (!accessToken){
//       window.location.href = "/";
//     }
//     else if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("access_token"); 
//       // alert("Session has expired. Please login again")
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
