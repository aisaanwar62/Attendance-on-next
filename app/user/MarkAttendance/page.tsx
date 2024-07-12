"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isToday } from "date-fns";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
function MarkAttendance() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [userid, setUserId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!date) {
        console.error("Date is not selected.");
        return;
      }

      const { data } = await axios.post("/api/markattendance", {
        userid,
        name,
        date: date.toISOString(), // Ensure date is defined here
        status,
      });

      if (data) {
        router.refresh();

        console.log("Attendance record added successfully!");
        toast({
          title: "Attendance record added successfully!",
        });
      } else {
        console.error("Failed to add attendance record.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && isToday(selectedDate)) {
      setDate(selectedDate);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex item-center justify-center m-10">
          <motion.div
            whileHover={{
              scale: 1,
              boxShadow: "0 0 20px 10px rgba(136, 165, 200, 0.5)",
            }}
            style={{
              borderRadius: "2rem",
              overflow: "hidden",
            }}
          >
            <Button
              variant="outline"
              className="bg-lime-100 rounded-full p-10 text-lg"
            >
              Mark your today Attendance
            </Button>
          </motion.div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Mark Attendance</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userid" className="text-right">
                UserId
              </Label>
              <Input
                id="userid"
                value={userid}
                onChange={(e) => setUserId(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Input
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Mark</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default MarkAttendance;
