"use client";

import { Pie, PieChart } from "recharts";

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

export const description = "A pie chart with a label";

const chartConfig = {
  male: {
    label: "Male",
    color: "var(--chart-4)",
  },
  female: {
    label: "Female",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function ChartPieLabel({
  isloading,
  male_student,
  total_student,
}: {
  isloading: boolean;
  male_student: number;
  female_student: number;
  total_student: number;
}) {
  if (isloading) {
    return <ChartPieLabelSkeloton />;
  }
  const chartData = [
    // TODO::
    { browser: "male", visitors: male_student },
    {
      browser: "female",
      visitors: total_student - male_student,
    },
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Student Gender</CardTitle>
        <CardDescription className="capitalize">
          Total Student Gender comparison
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing Gender Comparison in Total Student {total_student}
        </div>
      </CardFooter>
    </Card>
  );
}
export function ChartPieLabelSkeloton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex justify-center items-center">
        <Skeleton className="size-[250px] rounded-full" />
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <Skeleton className="h-4 w-2/3" />
      </CardFooter>
    </Card>
  );
}
