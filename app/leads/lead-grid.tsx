import { DataTable } from "~/components/DataTable";
import { columns } from "./components/columns"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
const LeadGrid: React.FC = () => {
    const { id } = useParams<{ id: string }>();
       const [filters, setFilters] = useState<any>({
        pagination: { pageIndex: 0, pageSize: 5 } ,
        sortBy: "",
        isDescending: false,
    });
    
    useEffect(() => {
        if(id != undefined && id != ""){
          setFilters((prevFilters : any) => ({
            ...prevFilters,
            Type: id // Set the Type property based on the URL parameter
          }));
        }else{
          
        }
      }, [id]);
    return ( <DataTable columns={columns} url={'/Api/Lead/Grid'} filters={filters} setFilters={setFilters} name="leads" /> );
};

export default LeadGrid;