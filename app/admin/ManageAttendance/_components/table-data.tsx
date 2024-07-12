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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";

// Define your Attendance type
export type Attendance = {
  id: number;
  date: Date;
  status: string | null;
  name: string;
  userid: string;
};

interface DataTableProps {
  data: Attendance[];
}

export function DataTable({ data }: DataTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecord, setEditRecord] = useState<Attendance | null>(null);
  const deleteRef = useRef("");
  const router = useRouter();
  const { toast } = useToast();

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };
  const columns: ColumnDef<Attendance>[] = [
    {
      accessorKey: "userid",
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
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "status",
      header: "Status",
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
              <DropdownMenuItem onClick={() => onEdit(record)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  deleteRef.current = record?.id.toString(); // Convert number to string explicitly
                  setIsDeleted(true);
                }}
              >
                Delete
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

  const onEdit = (record: Attendance) => {
    setEditRecord(record);
    setIsEditing(true);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editRecord) return;

    try {
      const { data } = await axios.patch(
        `/api/editattendance?id=${editRecord.id}`,
        editRecord
      );

      toast({
        title: "Attendance record updated successfully!",
      });
      console.log("Attendance record updated successfully:", data);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating attendance record:", error);
      toast({
        title: "Error updating attendance record",
        description: (error as any).message,
      });
    }
  };

  const onDelete = async () => {
    setIsSubmitting(true);
    try {
      const attendanceId = deleteRef.current;
      const { data } = await axios.delete(
        `/api/deleterecord?id=${attendanceId}`
      );

      if (data) {
        toast({
          title: "Record deleted successfully",
        });
        router.refresh();
      } else {
        console.error("Failed to delete attendance record:", data);
        toast({
          title: "Failed to delete attendance record",
        });
      }
    } catch (error) {
      console.error("Error deleting attendance record:", error);
      toast({
        title: "Error deleting attendance record",
        description: (error as any).message,
      });
    }
    setIsSubmitting(false);
    setIsDeleted(false);
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
      {isDeleted && (
        <Dialog open={isDeleted} onOpenChange={setIsDeleted}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Attendance Record</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this attendance record? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                disabled={isSubmitting}
                variant="outline"
                onClick={() => setIsDeleted(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={isSubmitting}
                variant="destructive"
                onClick={onDelete}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {isEditing && editRecord && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Attendance Record</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={editRecord.name}
                    onChange={(e) =>
                      setEditRecord({ ...editRecord, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="date" className="text-right">
                    Date
                  </label>
                  <Input
                    id="date"
                    type="date"
                    value={formatDate(editRecord.date)}
                    onChange={(e) =>
                      setEditRecord({
                        ...editRecord,
                        date: new Date(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right">
                    Status
                  </label>
                  <Input
                    id="status"
                    value={editRecord.status ?? ""}
                    onChange={(e) =>
                      setEditRecord({ ...editRecord, status: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </Fragment>
  );
}
