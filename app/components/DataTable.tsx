"use client"

import * as React from "react"
import {

    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table"

// import { DataTablePagination } from "./data-table-pagination"
// import { DataTableToolbar } from "./data-table-toolbar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useState } from "react"
import { apiService } from "~/api/ApiService"
import { useQuery } from "@tanstack/react-query"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import type { IDataTableResponse } from "~/types/IDataTableResponse"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    url: string,
    filters: any,
    name: string,
    setFilters: (filters: any) => void
}

export function DataTable<TData, TValue>({
    columns,
    url,
    filters,
    name,
    setFilters
}: DataTableProps<TData, TValue>) {
    // const [localFilters, setLocalFilters] = useState({
    //     ...filters, // merge incoming filters
    // });

    const fetchData = async (): Promise<IDataTableResponse> => {
        const result = await apiService.Request(filters, url);
        return result;
    };
    const { data: response, isLoading } = useQuery<IDataTableResponse>({
        queryKey: [name, filters], // 💡 include filters to refetch on change
        queryFn: fetchData,
        placeholderData: (prevData) => prevData,
    });

    const data = response?.data || [];

    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination: {
                pageIndex: filters.pagination.pageIndex, // 0-based index for table
                pageSize: filters.pagination.pageSize,
            },
        },
        enableRowSelection: true,
        manualPagination: true,
        pageCount: Math.max(1, Math.ceil((response?.totalRecords || 0) / (filters.pagination.pageSize || 1))),
        onPaginationChange: (updater) => {
            const newPagination =
                typeof updater === "function"
                    ? updater({
                        pageIndex: filters.pagination.pageIndex,
                        pageSize: filters.pagination.pageSize,
                    })
                    : updater;

                    setFilters((prev: any) => ({ // Specify the type of 'prev' parameter
                ...prev,
                pagination: {
                    pageIndex: newPagination.pageIndex, // 👈 convert to 1-based
                    pageSize: newPagination.pageSize,
                }
            }));
        },
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <div className="space-y-4">
            {/* <DataTableToolbar table={table} /> */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (<TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                Please wait...
                            </TableCell>
                        </TableRow>) :
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                        }

                    </TableBody>
                </Table>
            </div>
            {/* <DataTablePagination table={table} />  */}
            <div className="flex items-center justify-between px-2">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {response?.totalRecords} row(s) selected.
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                const newPageSize = Number(value);
                                // Update the pagination state correctly
                                setFilters((prev: any) => ({
                                    ...prev,
                                    pagination: {
                                        pageSize: newPageSize,
                                        pageIndex: 0, // Reset to page 1 when page size changes
                                    }
                                }));
                            }}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {(table.getState().pagination.pageIndex ?? 0) + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
