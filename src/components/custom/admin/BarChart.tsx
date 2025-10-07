"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "A horizontal bar chart";

const chartData = [
  { month: "January", students: 186 },
  { month: "February", students: 405 },
  { month: "March", students: 237 },
  { month: "April", students: 73 },
  { month: "May", students: 209 },
  { month: "June", students: 214 },
];

const chartConfig = {
  students: {
    label: "students",
    color: "var(--ring)",
  },
} satisfies ChartConfig;

export default function ChartBarHorizontal({
  isloading,
}: {
  isloading: boolean;
}) {
  if (isloading) {
    return <ChartBarHorizontalSkeloton />;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Student Enrollment</CardTitle>
        <CardDescription>
          January -{" "}
          <span className="capitalize">
            {chartData[chartData.length - 1].month}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="students" />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="students" fill="var(--color-students)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last {chartData.length} months
        </div>
      </CardFooter>
    </Card>
  );
}

export function ChartBarHorizontalSkeloton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 rounded w-3/4 mb-2" />
        <Skeleton className="h-4 rounded w-1/2" />
      </CardHeader>
      <CardContent className="flex-col gap-1 h-fit">
        <Skeleton className="h-7.5 md:h-10 rounded-md w-[50%] mb-3 mr-4" />
        <Skeleton className="h-7.5 md:h-10 rounded-md w-[75%] mb-3 mr-4" />
        <Skeleton className="h-7.5 md:h-10 rounded-md w-[70%] mb-3 mr-4" />
        <Skeleton className="h-7.5 md:h-10 rounded-md w-[85%] mb-3 mr-4" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <Skeleton className="h-4 rounded w-2/3" />
      </CardFooter>
    </Card>
  );
}
