"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const chartConfig = {
  Present: {
    label: "Present",
    color: "#2563eb",
  },
  Absent: {
    label: "Absent",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const getChartData = (monthlyCounts: { present: number; absent: number }[]) => [
  {
    month: "January",
    Present: monthlyCounts[0].present,
    Absent: monthlyCounts[0].absent,
  },
  {
    month: "February",
    Present: monthlyCounts[1].present,
    Absent: monthlyCounts[1].absent,
  },
  {
    month: "March",
    Present: monthlyCounts[2].present,
    Absent: monthlyCounts[2].absent,
  },
  {
    month: "April",
    Present: monthlyCounts[3].present,
    Absent: monthlyCounts[3].absent,
  },
  {
    month: "May",
    Present: monthlyCounts[4].present,
    Absent: monthlyCounts[4].absent,
  },
  {
    month: "June",
    Present: monthlyCounts[5].present,
    Absent: monthlyCounts[5].absent,
  },
  {
    month: "July",
    Present: monthlyCounts[6].present,
    Absent: monthlyCounts[6].absent,
  },
  {
    month: "August",
    Present: monthlyCounts[7].present,
    Absent: monthlyCounts[7].absent,
  },
  {
    month: "September",
    Present: monthlyCounts[8].present,
    Absent: monthlyCounts[8].absent,
  },
  {
    month: "October",
    Present: monthlyCounts[9].present,
    Absent: monthlyCounts[9].absent,
  },
  {
    month: "November",
    Present: monthlyCounts[10].present,
    Absent: monthlyCounts[10].absent,
  },
  {
    month: "December",
    Present: monthlyCounts[11].present,
    Absent: monthlyCounts[11].absent,
  },
];

const UserDashboard: React.FC<UserDashboardProps> = ({
  presentCount,
  absentCount,
  monthlyCounts,
}) => {
  const chartData = getChartData(monthlyCounts);

  // Calculate the maximum count of Present or Absent for scaling the bars
  const maxCount = Math.max(
    ...monthlyCounts.map((month) => month.present + month.absent)
  );

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-300  rounded-xl p-10">
      <h2 className="font-bold text-2xl m-2">Record of a Year</h2>

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
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="Present"
              fill="var(--color-Present)"
              radius={4}
              barSize={20} // Static value for bar width (adjust as needed)
            />
            <Bar
              dataKey="Absent"
              fill="var(--color-Absent)"
              radius={4}
              barSize={20} // Static value for bar width (adjust as needed)
            />
          </BarChart>
        </ChartContainer>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
