import { apiClient } from "./apiClient";
import type { IReassignLead } from "~/types/IReassignLead";
import type { leadSchema } from "~/leads/data/schema";
import type { z } from "zod";
import type { userSchema } from "~/Users/data/user-schema";

class ProfileService {
    private auth: string | null = null;

    constructor() {
      if (typeof window !== "undefined") {
        this.auth = localStorage.getItem("authToken"); // Fix for SSR
      }
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
