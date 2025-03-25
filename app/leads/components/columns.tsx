"use client"
import type { ColumnDef } from "@tanstack/react-table"
import { labels, priorities, statuses } from "../data/data"
import { type Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Checkbox } from "~/components/ui/checkbox"
import { Badge } from "~/components/ui/badge"

export const columns: ColumnDef<Task>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "firstName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.original.firstName + " " + row.original.lastName}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
            // const label = labels.find((label) => label.value === row.original.firstName)

            return (
                <div className="flex space-x-2">
                    {row.getValue("email")}
                    {/* {label && <Badge variant="outline">{label.label}</Badge>}
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("title")}
                    </span> */}
                </div>
            )
        },
    },
    {
        accessorKey: "city",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="City" />
        ),
        cell: ({ row }) => {
            // const status = statuses.find(
            //     (status) => status.value === row.getValue("status")
            // )

            // if (!status) {
            //     return null
            // }

            return (
                <div className="flex w-[100px] items-center">
                    {row.getValue("city")}
                    {/* {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span> */}
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "contactNo",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Contact No" />
        ),
        cell: ({ row }) => {
            // const priority = priorities.find(
            //     (priority) => priority.value === row.getValue("priority")
            // )

            // if (!priority) {
            //     return null
            // }

            return (
                <div className="flex items-center">
                    {row.getValue("contactNo")}
                    {/* {priority.icon && (
                        <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{priority.label}</span> */}
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]
