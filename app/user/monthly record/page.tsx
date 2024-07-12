"use client";
import React from "react";
import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface UserDashboardProps {
  presentCount: number;
  absentCount: number;
  monthlyCounts: { present: number; absent: number }[];
}

const chartConfig: ChartConfig = {
  Present: {
    label: "Present",
    color: "#2563eb",
  },
  Absent: {
    label: "Absent",
    color: "#60a5fa",
  },
};

const MonthlyRecord: React.FC<UserDashboardProps> = ({
  presentCount,
  absentCount,
  monthlyCounts,
}) => {
  // Prepare chart data with each day of the month
  const daysInMonth = Array.from({ length: 30 }, (_, index) => ({
    day: index + 1,
    Present: monthlyCounts[index]?.present || 0,
    Absent: monthlyCounts[index]?.absent || 0,
  }));

  // Calculate the maximum count of Present or Absent for scaling the bars
  const maxCount = Math.max(
    ...daysInMonth.map((day) => day.Present + day.Absent)
  );

  return (
    <div className="flex flex-col items-center justify-center  h-full bg-slate-300 rounded-xl p-12">
      <h2 className="font-bold text-2xl m-2 mb-5">Record of a month</h2>

      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px 10px rgba(136, 165, 193, 0.5)",
        }}
        style={{
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
          transition: "box-shadow 0.1s ease",
        }}
        className="rounded-xl overflow-hidden"
      >
        <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
          <BarChart accessibilityLayer data={daysInMonth}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="Present"
              fill={chartConfig.Present.color}
              radius={4}
              barSize={30} // Static value for bar width (adjust as needed)
            />
            <Bar
              dataKey="Absent"
              fill={chartConfig.Absent.color}
              radius={4}
              barSize={30} // Static value for bar width (adjust as needed)
            />
          </BarChart>
        </ChartContainer>
      </motion.div>
    </div>
  );
};

export default MonthlyRecord;
