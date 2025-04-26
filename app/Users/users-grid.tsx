import { DataTable } from "~/components/DataTable";
import { columns } from "./components/columns";
import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { debounce } from "lodash-es";
import { DataTableFacetedFilter } from "~/components/data-table-faceted-filter";
import dropdowns from "~/data/app-dropdowns.json";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "~/components/ui/scroll-area";
import UserForm from "./components/user-form";
import { userSchema } from "./data/user-schema";

const UsersGrid: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState<any>({
        pagination: { pageIndex: 0, pageSize: 5 },
        sortBy: "",
        isDescending: false,
    });

    const handleFilterByName = debounce((value: string) => {
        setFilters((prev: any) => ({
            ...prev,
            Name: value
        }));
    }, 500);
    const handleFilterByEmail = debounce((value: string) => {
        setFilters((prev: any) => ({
            ...prev,
            Email: value
        }));
    }, 500);
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
                    <DataTableFacetedFilter title="Role" optionArray={dropdowns.userRoles} filterKey={"Role"} setFilters={setFilters}></DataTableFacetedFilter>
                    <DataTableFacetedFilter title="Status" optionArray={dropdowns.userStatus} filterKey={"Status"} setFilters={setFilters}></DataTableFacetedFilter>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="ml-auto" variant={"outline"}> <PlusCircle /> Create</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[600px] xl:max-w-[600px] 2xl:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Add lead</DialogTitle>

                                <DialogDescription>
                                    Make changes to your lead here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="max-h-[70vh] rounded-md pr-2">
                                <UserForm data={userSchema.parse({})} onClose={() => setOpen(false)} />
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <DataTable columns={columns} url={'/Api/Profile/Grid'} filters={filters} setFilters={setFilters} name="Users" />
        </React.Fragment>
    );
};

export default UsersGrid;