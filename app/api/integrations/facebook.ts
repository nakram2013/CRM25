import type { userSchema } from "~/users/data/user-schema";
import type { z } from "zod";
import { apiClient } from "../api-client";

class FacebookService {
    private auth: string | null = null;

    constructor() {
      if (typeof window !== "undefined") {
        this.auth = localStorage.getItem("authToken"); // Fix for SSR
      }
    }
    async Profile(token : string): Promise<any> {
        // Proper method syntax inside a class
        return await apiClient('/api/Integration/FBProfile/' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            },
        });
    } 
}

export const facebookService = new FacebookService();
