"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  MoreHorizontal,
  PlusIcon,
  UserCircle2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DeActiveBadge,
  ActiveBadge,
  DeactiveButton,
  CustomButton,
} from "@/components/custom/utilis";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/hooks/custom/redux-hooks";
import { Student } from "@/models/StudentsSchema";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const columns: ColumnDef<Student>[] = [
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "verify.isActive",
    header: "Student Status",
    cell: ({ row }) => {
      if (row.original.verify?.isActive) {
        return <ActiveBadge />;
      }
      return <DeActiveBadge />;
    },
  },
  {
    accessorKey: "student_id",
    header: "Student ID",
    cell: ({ row }) => <div>{row.getValue("student_id")}</div>,
  },
  {
    accessorKey: "username",
    header: "Name",
    cell: ({ row }) => <div>{row.original.student_name ?? "-"}</div>,
  },
  {
    accessorKey: "father_name",
    header: "Father's Name",
    cell: ({ row }) => <div>{row.original.fatherName ?? "-"} </div>,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <div>{row.getValue("gender") ?? "-"}</div>,
  },
  {
    accessorKey: "admission_date",
    header: "Admission Date",
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue("admission_date")).toLocaleDateString() ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "course.name",
    header: "Class",
    cell: ({ row }) => <div>{row.original.course_name ?? "-"}</div>,
  },
  {
    accessorKey: "roll_no",
    header: "Roll Number",
    cell: ({ row }) => <div>{row.getValue("roll_no") ?? "-"}</div>,
  },
  {
    accessorKey: "fees.total",
    header: () => <div className="text-right">Total Fees</div>,
    cell: ({ row }) => {
      const amount = parseFloat(String(row.original.fees?.totalFees));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return <div className="text-right font-medium">{formatted ?? "-"}</div>;
    },
  },
  {
    accessorKey: "fees.paid",
    header: () => <div className="text-right">Paid Fees</div>,
    cell: ({ row }) => {
      const amount = parseFloat(String(row.original.fees?.paidFees));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return <div className="text-right font-medium">{formatted ?? "-"}</div>;
    },
  },
  {
    accessorKey: "fees.remaining",
    header: () => <div className="text-right">Remaining Fees</div>,
    cell: ({ row }) => {
      const amount = parseFloat(String(row.original.fees?.remainingFees));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(student.student_id)}
            >
              Copy Student ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View student details</DropdownMenuItem>
            <DropdownMenuItem>View payment history</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable({ isloading }: { isloading: boolean }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  // -==================================================================-
  const instituteInfo = useAppSelector((state) => state.institute);

  const tableData = React.useMemo(
    () => instituteInfo.unpaid_student || [],
    [instituteInfo.unpaid_student]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isloading) {
    return <DataTableSkelton />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by Student ID..."
          value={
            (table.getColumn("student_id")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("student_id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    row.original.verify?.isActive ? "" : "bg-muted-100/40"
                  }
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
                  className="h-24 text-center hover:bg-transparent"
                >
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia>
                        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                          <UserCircle2Icon size={40} />
                        </div>
                      </EmptyMedia>
                      <EmptyTitle>No Student Found</EmptyTitle>
                      {/* <EmptyDescription className="capitalize">
                        no Male or Female student found in your institute
                      </EmptyDescription> */}
                    </EmptyHeader>
                    <EmptyContent>
                      <Button size="sm">
                        <PlusIcon />
                        add Student
                      </Button>
                    </EmptyContent>
                  </Empty>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {(table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")) && (
        <div className="flex gap-2 px-2 py-4 justify-center items-center">
          <CustomButton text="Paid Full Fees" />
          <DeactiveButton />
        </div>
      )}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function DataTableSkelton() {
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Skeleton className="h-10 w-60" />
        <Skeleton className="ml-auto h-10 w-32" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              {[...Array(7)].map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-6 w-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {[...Array(7)].map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-7 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
