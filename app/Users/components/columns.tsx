"use client"
import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "~/components/ui/checkbox"
import type { UserSchema } from "../data/user-schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { format } from "date-fns";
import { DataTableRowActions } from "./data-table-row-actions"
import { getUserRoleNameByID } from "~/utils/helpers"

export const columns: ColumnDef<UserSchema>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //             className="translate-y-[2px]"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //             className="translate-y-[2px]"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
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
        accessorKey: "role",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
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
                    {getUserRoleNameByID( row.getValue("role"))}
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
        accessorKey: "addedDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Added Date" />
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
                    {format(row.getValue("addedDate") + "Z", "MM/dd/yyyy hh:mm:ss aa")}
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
        cell: ({ row }) =>  <div key={row.id}>
        <DataTableRowActions row={row} />
      </div>,
    },
]
