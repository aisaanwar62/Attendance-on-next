"use client";
import { useToast } from "@/components/ui/use-toast";

import { Fragment, useRef, useState } from "react";
import { Loader2, MoreHorizontal } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

// Define your Attendance type
export type LeaveRequest = {
  id: number;
  From: Date;
  To: Date;
  status: string | null;
  name: string;
  userId: string;
  Reason: String;
};

interface DataTableProps {
  data: LeaveRequest[];
}

export function DataTable({ data }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecord, setEditRecord] = useState<LeaveRequest | null>(null);
  const deleteRef = useRef("");
  const router = useRouter();
  const { toast } = useToast();

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };
  const columns: ColumnDef<LeaveRequest>[] = [
    {
      accessorKey: "userId",
      header: "User ID",
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const record = row.original;
        return (
          <div className="text-left font-medium capitalize">
            {row.getValue("name")}
          </div>
        );
      },
    },
    {
      accessorKey: "From",
      header: "From",
    },
    {
      accessorKey: "status",
      header: "status",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const record = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => updateStatus(record.id, "accepted")}
              >
                Accept
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => updateStatus(record.id, "rejected")}
              >
                Reject
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  });

  const updateStatus = async (id: number, status: string) => {
    setIsSubmitting(true);
    try {
      console.log("🚀 ~ Edit ~ values:", id, status);

      const { data } = await axios.patch(`/api/updateleavestatus`, {
        id,
        status,
      });

      if (data) {
        toast({
          title: `Leave request ${status} successfully`,
        });
        router.refresh();
      } else {
        toast({
          title: `Failed to update leave request status`,
          description: data.error,
        });
      }
    } catch (error) {
      console.error(`Error updating leave request status:`, error);
      toast({
        title: `Error updating leave request status`,
        description: (error as any).message,
      });
    }
    setIsSubmitting(false);
  };
  return (
    <Fragment>
      {data?.length > 0 && (
        <div className="flex items-center space-x-4 mb-4">
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filter by date..."
            value={(table.getColumn("date")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("date")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
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
      )}
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
        <Table>
          <TableHeader className="border">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="border">
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
          <TableBody className="border">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center border"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </Fragment>
  );
}
