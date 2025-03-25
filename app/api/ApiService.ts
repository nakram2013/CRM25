import type { IDataTableRequest } from "~/types/IDataTableRequest";
import { apiClient } from "./apiClient";
import type { IDataTableResponse } from "~/types/IDataTableResponse";
import type { IDropdown } from "~/types/IDropdown";

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
}

export const apiService = new ApiService();
