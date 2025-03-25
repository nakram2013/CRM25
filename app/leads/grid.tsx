import { DataTable } from "~/components/DataTable";
import { columns } from "./components/columns"
import { useState } from "react";
import type { IDataTableRequest } from "~/types/IDataTableRequest";
const grid: React.FC = () => {
       const [filters, setFilters] = useState<IDataTableRequest>({
        pagination: { pageIndex: 0, pageSize: 10 } ,
        sortBy: "",
        isDescending: false,
        Type: "" // Add the missing Type property
    });
    return ( <DataTable columns={columns} url={'/Api/Lead/Grid'} filters={filters} /> );
};

export default grid;