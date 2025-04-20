import React, { useState } from "react";
import UsersGrid from "./users-grid";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { userSchema } from "./data/user-schema";
import UserForm from "./components/user-form";
import { PlusCircle } from "lucide-react";

const Users: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Button className="float-end" variant={"outline"}> <PlusCircle /> Create</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1200px]">
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
            <UsersGrid></UsersGrid>
        </React.Fragment>
    );
};

export default Users;
