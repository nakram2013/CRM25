import { DataTable } from "~/components/DataTable";
import { columns } from "./components/columns"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import dropdowns from "~/data/app-dropdowns.json";
import { DataTableFacetedFilter } from "~/components/data-table-faceted-filter";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import LeadForm from "./components/lead-form";
import { leadSchema } from "./data/schema";
import type { z } from "zod";
import FollowUpForm from "./components/followup-form";

const LeadGrid: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<z.infer<typeof leadSchema>>(leadSchema.parse({}));
  const [open, setOpen] = useState(false);
  const [openF, setOpenF] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [filters, setFilters] = useState<any>({
    pagination: { pageIndex: 0, pageSize: 5 },
    sortBy: "",
    isDescending: false,
  });

  useEffect(() => {
    if (id != undefined && id != "") {
      setFilters((prevFilters: any) => ({
        ...prevFilters,
        Type: id // Set the Type property based on the URL parameter
      }));
    } else {

    }
  }, [id]);


  const handleActionClick = (row: any, type: string) => {
    if (type === "edit" || type === "new") {
      setSelectedRow(row);
      setOpen(true);
    } else if (type === "followup") {
      setSelectedRow(row);
      setOpenF(true);
    }

  }
  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {/* <Input
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
          /> */}
          <DataTableFacetedFilter title="Status" optionArray={dropdowns.leadStatus} filterKey={"Type"} setFilters={setFilters} />
          <Button className="ml-auto" onClick={() => handleActionClick(leadSchema.parse({}), "new")} variant={"outline"}> <PlusCircle className="pointer-events-none" /> Create</Button>
        </div>
      </div>
      <DataTable columns={columns(handleActionClick)} url={'/Api/Lead/Grid'} filters={filters} setFilters={setFilters} name="leads" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1200px]">
          <DialogHeader>
            <DialogTitle>{selectedRow.leadId > 0 ? ("Edit Lead") : ("Create Lead")}</DialogTitle>

            <DialogDescription>
              Make changes to your lead here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] rounded-md pr-3">
            <LeadForm lead={selectedRow} onClose={() => setOpen(false)} />
          </ScrollArea>
        </DialogContent>

      </Dialog>
      <Dialog open={openF} onOpenChange={setOpenF}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[60px] xl:max-w-[600px] 2xl:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Follow Up</DialogTitle>
            <DialogDescription>
              Make changes to your lead here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] rounded-md pr-3">
            <FollowUpForm leadID={selectedRow.leadId} onClose={() => setOpenF(false)} />
          </ScrollArea>
        </DialogContent>

      </Dialog>
    </React.Fragment>

  );
};

export default LeadGrid;