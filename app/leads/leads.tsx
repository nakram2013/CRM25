import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import LeadForm from "./components/lead-form";
import { useState } from "react";
import { leadSchema } from "./data/schema";
import { Button } from "~/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import LeadGrid from "./lead-grid";

const Leads: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <Dialog >
                <DialogTrigger asChild>
                    <Button  className="float-end cursor-pointer" variant={"outline"}> <PlusCircle className="pointer-events-none" /> Create</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1200px]">
                    <DialogHeader>
                        <DialogTitle>Add lead</DialogTitle>

                        <DialogDescription>
                            Make changes to your lead here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[70vh] rounded-md pr-2">
                        <LeadForm lead={leadSchema.parse({})} onClose={() => setOpen(false)} />
                    </ScrollArea>
                </DialogContent>
            </Dialog>
            <LeadGrid></LeadGrid>
        </React.Fragment>
    );
};

export default Leads;
