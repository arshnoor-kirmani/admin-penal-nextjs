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
    {
      browser: "male",
      visitors: male_student * 300 || 86,
      fill: "var(--color-neutral-400)",
    },
    {
      browser: "female",
      visitors: total_student - male_student || 100,
      fill: "var(--color-neutral-600)",
    },
  ];
  if (male_student <= 0) {
    return (
      <Card className="flex flex-col relative">
        <CardHeader className="items-center pb-0">
          <CardTitle>Student Gender Comparison Chart</CardTitle>
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
              <Pie
                data={chartData}
                dataKey="visitors"
                label
                nameKey="browser"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="text-muted-foreground leading-none">
            Showing Gender Comparison in Total Student {total_student}
          </div>
        </CardFooter>
        <Empty className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-[1px] bg-card/75">
          <EmptyHeader>
            <EmptyMedia>
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                <User size={40} />
              </div>
            </EmptyMedia>
            <EmptyTitle>No Student Found</EmptyTitle>
            <EmptyDescription className="capitalize">
              no Male or Female student found in your institute
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
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Student Gender Comparison Chart</CardTitle>
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
