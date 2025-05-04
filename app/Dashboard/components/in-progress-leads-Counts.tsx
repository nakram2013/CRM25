import React, { useEffect, useState } from "react";
import { dashboardService } from "~/api/dashboardService";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
interface LeadData {
    Overdue: number;
    Due: number;
    Upcoming: number;
    // Add other fields if needed
}
const InProgressLeadsCounts: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<LeadData>();
    const fetchData = async () => {
        const result = await dashboardService.inProgressLeadsCounts();
        setData(result);
        return result;
    };
    useEffect(() => {
        const fetchDataAsync = async () => {
            setIsLoading(true);
            await fetchData();
            setIsLoading(false);
        };

        fetchDataAsync();
    }, []);
    return (
        <React.Fragment>
            {isLoading ? (<Skeleton className="h-50" />) : (
                <Card>
                    <CardHeader className="gap-0">
                        <CardTitle className="pt-0 m-0">In Progress Leads Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-gray-100 p-1 mb-1 text-sm">Due <Badge className="float-end">{data?.Due}</Badge></div>
                        <div className="bg-gray-100 p-1 mb-1 text-sm">Overdue <Badge className="float-end">{data?.Overdue}</Badge></div>
                        <div className="bg-gray-100 p-1 mb-1 text-sm">Upcoming <Badge className="float-end">{data?.Upcoming}</Badge></div>
                    </CardContent>
                </Card>
            )}
        </React.Fragment >
    );
}

export default InProgressLeadsCounts;