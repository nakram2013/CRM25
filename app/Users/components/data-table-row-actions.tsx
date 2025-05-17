import { MoreHorizontal } from "lucide-react"
import type { Row } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import React, { useState } from "react"
import { ScrollArea } from "~/components/ui/scroll-area"
import UserForm from "./user-form"
import type { z } from "zod"
import { userSchema } from "../data/user-schema"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setOpen(true)}>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog key={row.id} open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger className="w-full text-left px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-accent focus:text-accent-foreground">
          Edit
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[600px] xl:max-w-[600px] 2xl:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>

            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] rounded-md">
            <UserForm data={userSchema.parse(row.original) as z.infer<typeof userSchema>} onClose={() => setOpen(false)} />
          </ScrollArea>
        </DialogContent>

      </Dialog>
    </React.Fragment>
  )
}
