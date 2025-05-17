import { apiClient } from "./api-client";

class DashboardService {
    private auth: string | null = null;

    constructor() {
      if (typeof window !== "undefined") {
        this.auth = localStorage.getItem("authToken"); // Fix for SSR
      }
    }
    async leadsCounts(): Promise<any> {
        // Proper method syntax inside a class
        return await apiClient('/api/Dashboard/LeadStatusCount', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            },
        });
    }
    async inProgressLeadsCounts(): Promise<any> {
        // Proper method syntax inside a class
        return await apiClient('/api/Dashboard/GetFollowUpTypeCounts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.auth}`,
            },
        });
    }
}

export const dashboardService = new DashboardService();