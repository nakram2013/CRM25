import type { userSchema } from "~/users/data/user-schema";
import { apiClient } from "./api-client";
import type { z } from "zod";

class ProfileService {
    private auth: string | null = null;

    constructor() {
      if (typeof window !== "undefined") {
        this.auth = localStorage.getItem("authToken"); // Fix for SSR
      }
    }
    async Profile(): Promise<z.infer<typeof userSchema>> {
        // Proper method syntax inside a class
        return await apiClient('/api/Profile/GetUserProfile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            },
        });
    } 
    async Register(userData: z.infer<typeof userSchema>): Promise<any> {
        // Proper method syntax inside a class
        return await apiClient('/api/Profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            },
            data: userData, // The payload for the request
        });
    }
    async update(userData: z.infer<typeof userSchema>): Promise<any> {
        // Proper method syntax inside a class
        return await apiClient('/api/Profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            },
            data: userData, // The payload for the request
        });
    }
}

export const profileService = new ProfileService();
