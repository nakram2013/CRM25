// src/api/apiClient.ts
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { BASE_URL } from './config';
import Swal from 'sweetalert2'

// Create an Axios instance with the base URL
const client = axios.create({
  baseURL: BASE_URL,
});

// Define the apiClient function to use Axios
export const apiClient = async (
  endpoint: string,
  options?: AxiosRequestConfig
): Promise<any> => {
  try {
    // Make the request using Axios and spread any options provided
    const response: AxiosResponse = await client(endpoint, { ...options });
    return response.data; // Axios responses store the data in 'data'
  } catch (error: any) {
    // Handle errors  12346578Aa@
    if (error.response) {
      // Server responded with a status other than 2xx
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text:  error.response.data.message || error.response.data ,
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      throw new Error(`Failed to fetch: ${error.response.statusText}`);
    } else if (error.request) {
      // No response received
      throw new Error(`No response received: ${error.message}`);
    } else {
      // Any other error (e.g. in setting up the request)
      throw new Error(`Request failed: ${error.message}`);
    }
  }
};
