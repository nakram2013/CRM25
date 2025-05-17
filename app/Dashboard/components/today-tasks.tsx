import React, { useState } from "react";
import { DataTable } from "~/components/datatable";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { columns } from "~/leads/components/columns";

const TodayTasks: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false   );
    const [filters, setFilters] = useState<any>({
      pagination: { pageIndex: 0, pageSize: 5 },
      sortBy: "",
      isDescending: false,
      type : ["Due","Overdue"]
    });
    return (
        <React.Fragment>
            {isLoading ? (<Skeleton className="h-50" />) : (
                <Card>
                    <CardHeader className="gap-0">
                        <CardTitle className="pt-0 m-0">Today Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns()} url={'/Api/Lead/Grid'} filters={filters} setFilters={setFilters} name="leads" />
                    </CardContent>
                </Card>
            )}
        </React.Fragment >
    );
}

export default TodayTasks;