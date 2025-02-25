import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE === "developement" ? "http://localhost:5001/api":"https://chat-application-full-stack-backend.vercel.app/api",
    withCredentials:true,
});
