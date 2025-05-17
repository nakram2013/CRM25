import type { IDataTableRequest } from "~/types/iDataTableRequest";
import { apiClient } from "./api-client";
import type { IDataTableResponse } from "~/types/iDataTableResponse";
import type { IDropdown } from "~/types/iDropdown";

class ApiService {
    private auth: string | null = null;

    constructor() {
      if (typeof window !== "undefined") {
        this.auth = localStorage.getItem("authToken"); // Fix for SSR
      }
    }
    async Request(userData: IDataTableRequest,apiUrl : string): Promise<IDataTableResponse> {
        // Proper method syntax inside a class
        return await apiClient(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            },
            data: userData, // The payload for the request
        });
    }
    async dropdownRequest(apiUrl : string): Promise<IDropdown[]> {
        // Proper method syntax inside a class
        return await apiClient(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            }
        });
    }
    async post(apiUrl : string,data : any): Promise<any> {
        // Proper method syntax inside a class
        return await apiClient(apiUrl, {
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}

export const apiService = new ApiService();
