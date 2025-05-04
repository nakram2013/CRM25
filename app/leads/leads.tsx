import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import LeadForm from "./components/lead-form";
import { useState } from "react";
import React from "react";
import LeadGrid from "./lead-grid";

const Leads: React.FC = () => {
    return (
        <React.Fragment>
            <LeadGrid></LeadGrid>
        </React.Fragment>
    );
};

export default Leads;
