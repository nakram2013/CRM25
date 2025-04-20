import { DataTable } from "~/components/DataTable";
import { columns } from "./components/columns";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { debounce } from "lodash-es";
import { DataTableFacetedFilter } from "~/components/data-table-faceted-filter";
import dropdowns from "~/data/app-dropdowns.json";

const UsersGrid: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [filters, setFilters] = useState<any>({
        pagination: { pageIndex: 0, pageSize: 5 },
        sortBy: "",
        isDescending: false,
    });

    const handleFilterByName = debounce((value: string) => {
        setFilters((prev : any) => ({
          ...prev,
          Name: value
        }));
      }, 500);
      const handleFilterByEmail = debounce((value: string) => {
        setFilters((prev : any) => ({
          ...prev,
          Email: value
        }));
      }, 500);

    // useEffect(() => {
    //     if(id != undefined && id != ""){
    //       setFilters((prevFilters) => ({
    //         ...prevFilters,
    //         Type: id // Set the Type property based on the URL parameter
    //       }));
    //     }else{

    //     }
    //   }, [id]);
    return (
        <React.Fragment>
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    <Input
                        placeholder="Filter Name..."
                        defaultValue={filters.Name}
                        // value={filters?.Name || ""}
                        onChange={(event) =>
                            handleFilterByName(event.target.value)
                        }
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                     <Input
                        placeholder="Filter Email..."
                        defaultValue={filters.Email}
                        // value={filters?.Name || ""}
                        onChange={(event) =>
                            handleFilterByEmail(event.target.value)
                        }
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                    <DataTableFacetedFilter title="Status" optionArray={dropdowns.userRoles} filterKey={"Role"} setFilters={setFilters}></DataTableFacetedFilter>
                    
                </div>
            </div>

            <DataTable columns={columns} url={'/Api/Profile/Grid'} filters={filters} setFilters={setFilters} name="Users" />
        </React.Fragment>
    );
};

export default UsersGrid;