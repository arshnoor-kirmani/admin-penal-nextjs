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
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PlusIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const description = "A horizontal bar chart";

const chartConfig = {
  students: {
    label: "students",
    color: "var(--color-neutral-400)",
  },
} satisfies ChartConfig;

export default function ChartBarHorizontal({
  isloading,
  data,
}: {
  data: { month: string; students: number }[];
  isloading: boolean;
}) {
  console.log("data", data);
  const chartData =
    data.length > 0
      ? data
      : [
          { month: "January", students: 186 },
          { month: "February", students: 405 },
          { month: "March", students: 237 },
          { month: "April", students: 73 },
          { month: "May", students: 209 },
          { month: "June", students: 214 },
        ];
  if (isloading) {
    return <ChartBarHorizontalSkeloton />;
  }
  if (!data || data.length === 0) {
    return (
      <Card className="relative">
        <CardHeader>
          <CardTitle>Monthly Student Enrollment Chart</CardTitle>
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
        <Empty className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-[1px] bg-popover/70">
          <EmptyHeader>
            <EmptyMedia>
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                <User size={40} />
              </div>
            </EmptyMedia>
            <EmptyTitle>Data Not Found</EmptyTitle>
            <EmptyDescription className="capitalize">
              Student Enrollment Recode not Found
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">
              <PlusIcon />
              add Student
            </Button>
          </EmptyContent>
        </Empty>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Student Enrollment Chart</CardTitle>
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
