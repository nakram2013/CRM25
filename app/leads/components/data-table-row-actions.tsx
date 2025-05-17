
import { MoreHorizontal } from "lucide-react"

import { labels } from "../data/data"
import type { Row } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { leadSchema } from "../data/schema"
import { useState } from "react"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>,
  onActionClick?: (row: TData, type: string) => void;
}

export function DataTableRowActions<TData>({
  row,
  onActionClick
}: DataTableRowActionsProps<TData>) {
  const task = leadSchema.parse(row.original)
  const [open, setOpen] = useState(false);
  return (
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
        <DropdownMenuItem onClick={() => onActionClick?.(row.original, "edit")}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onActionClick?.(row.original, "followup")}>Follow up</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.firstName}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
