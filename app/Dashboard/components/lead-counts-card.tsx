import React, { useEffect, useState } from "react";
import { z } from "zod";
import { dashboardService } from "~/api/dashboardService";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const LeadStatusSchema = z.object({
    status: z.string().min(1),  // Ensuring status is a non-empty string
    count: z.number().int().nonnegative(),  // Ensuring count is a non-negative integer
});

const LeadCountsCard: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<z.infer<typeof LeadStatusSchema>[]>({} as z.infer<typeof LeadStatusSchema>[]);
    const fetchData = async () => {
        const result = await dashboardService.leadsCounts();
        if (result.length > 0) {
            setData(result);
        } else {
            console.log(result.message);
        }
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
                        <CardTitle className="pt-0 m-0">Leads Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-gray-100 p-1 mb-1 text-sm">New <Badge className="float-end">{data.find(item => item.status === "New")?.count}</Badge></div>
                        <div className="bg-gray-100 p-1 mb-1 text-sm">In Progress<Badge className="float-end">{data.find(item => item.status === "InProgress")?.count}</Badge></div>
                        <div className="bg-gray-100 p-1 mb-1 text-sm">Converted<Badge className="float-end">{data.find(item => item.status === "Converted")?.count}</Badge></div>
                        <div className="bg-gray-100 p-1 mb-1 text-sm">Lost<Badge className="float-end">{data.find(item => item.status === "Lost")?.count}</Badge></div>
                    </CardContent>
                </Card>
            )}
        </React.Fragment >
    );
}

export default LeadCountsCard;