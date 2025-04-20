import { apiClient } from "./apiClient";
import type { IReassignLead } from "~/types/IReassignLead";
import type { leadSchema } from "~/leads/data/schema";
import type { z } from "zod";

class LeadService {
    private auth: string | null = null;

    constructor() {
      if (typeof window !== "undefined") {
        this.auth = localStorage.getItem("authToken"); // Fix for SSR
      }
    }
    async getSingle(leadID: number): Promise<any> {
        // Proper method syntax inside a class
        return await apiClient('/api/Lead/' + leadID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            }
        });
    }
    async Register(userData: z.infer<typeof leadSchema>): Promise<any> {
        // Proper method syntax inside a class
        return await apiClient('/api/Lead/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            },
            data: userData, // The payload for the request
        });
    }
    async update(userData: z.infer<typeof leadSchema>): Promise<any> {
        // Proper method syntax inside a class
        return await apiClient('/api/Lead/UpdateLeads', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            },
            data: userData, // The payload for the request
        });
    }
    async delete(id: number): Promise<any> {
        // Proper method syntax inside a class
        return await apiClient('/api/Lead/DeleteLead/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            }
        });
    }
    async reAssign(userData: IReassignLead): Promise<any> {
        // Proper method syntax inside a class
        return await apiClient('/Api/Lead/Reassign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            },
            data: userData,
        });
    }
}

export const leadService = new LeadService();
