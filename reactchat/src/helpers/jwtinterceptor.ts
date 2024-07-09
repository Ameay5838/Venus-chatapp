import axios, {AxiosInstance} from "axios";

import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

// Define the API_BASE_URL constant
const API_BASE_URL = BASE_URL

// Function to create an Axios instance with interceptors
const useAxiousWithInterceptor = (): AxiosInstance => {
    // Create an instance of Axios with the base URL
    const jwtAxios = axios.create({ baseURL:API_BASE_URL})
    // Get the navigate function from useNavigate hook
    const navigate = useNavigate()

     // Add a response interceptor to handle errors
    jwtAxios.interceptors.response.use(
        (response) => {
            return response;    // Return the response if no error
        },
    async (error) => {
        const originRequest = error.config;     // Get the original request
        // If error status is 403 (Forbidden), navigate to the root
        if (error.response?.status === 403) {
            const goRoot = () => navigate("/")
            goRoot();
        }
    }
    )
    return jwtAxios; // Return the Axios instance
}

export default useAxiousWithInterceptor