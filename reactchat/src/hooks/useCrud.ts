import useAxiousWithInterceptor from "../helpers/jwtinterceptor";
import { BASE_URL } from "../config";
import { useState } from "react";

// Define the IuseCrud interface for the return type of the useCrud hook
interface IuseCrud<T> {
    dataCRUD: T[];                      // Array of data items of type T
    fetchData: () =>  Promise<void>;    // Function to fetch data
    error: Error | null;                // Error state
    isLoading: boolean;                 // Loading state
}

// Define the useCrud hook with generic type T
const useCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
    const jwtAxios = useAxiousWithInterceptor();                    // Create an instance of Axios with interceptors
    const [dataCRUD, setDataCRUD] = useState<T[]>(initialData)      // State to store the fetched data
    const [error, setError] = useState<Error | null>(null)          // State to store any errors that occur
    const [isLoading, setIsLoading] = useState(false)               // State to track if data is being loaded


    // Function to fetch data from the API
    const fetchData = async () =>{
        setIsLoading(true)
        try{
             // Make a GET request to the API
            const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {})
            const data = response.data                               // Extract data from the response
            setDataCRUD(data)                                       
            setError(null)
            setIsLoading(false)
            return data;
        }catch (error: any){
            // Handle error response
            if (error.response && error.response.status === 400){
                setError(new Error("400"))
            }
            setIsLoading(false)
            throw error;
    };}

    // Return the CRUD state and fetchData function
    return {fetchData, dataCRUD, error, isLoading}
}

export default useCrud