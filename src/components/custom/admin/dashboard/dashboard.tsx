"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/hooks/custom/redux-hooks";
import { InstituteInfo } from "@/lib/store/ReduxSlices/InstituteSlice";
import {
  LibraryBigIcon,
  UsersIcon,
  UsersRoundIcon,
  Wallet2,
} from "lucide-react";
import { Session } from "next-auth";
import React from "react";
import CountUp from "react-countup";
import ChartBarHorizontal, { ChartBarHorizontalSkeloton } from "../BarChart";
import ChartPieLabel, { ChartPieLabelSkeloton } from "../CircelChart";
import { DataTable } from "../DataTabel";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
export default function Dashboard({ session }: { session: Session }) {
  const instituteInfo = useAppSelector(
    (state) => state.institute
  ) as InstituteInfo;
  if (!session && !instituteInfo) {
    return <div>Loading...</div>;
  }
  return (
    // <main className="min-h-screen ">

    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards
            isloading={instituteInfo.identifier ? false : true}
            // isloading={true}
            total_student={instituteInfo?.total_student}
            total_courses={instituteInfo?.total_courses}
            total_teacher={instituteInfo?.total_teacher}
            total_unpaid={instituteInfo?.total_unpaid}
          />
          <div className="px-4 lg:px-6">
            {" "}
            <Card className="bg-transparent border-0 grid garid-cols-1 grid-rows-1 md:grid-cols-2 gap-4 py-4 md:gap-6 md:py-6">
              <ChartBarHorizontal
                isloading={instituteInfo.identifier ? false : true}
              />

              <ChartPieLabel
                isloading={instituteInfo.identifier ? false : true}
              />
            </Card>
          </div>
          <div className="px-4 lg:px-6">
            <DataTable isloading={instituteInfo.identifier ? false : true} />
          </div>
          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
    // </main>
    // <div className="bg-red-500 w-full">
    //   Dashboard - {instituteInfo?.institute_name}
    // </div>
  );
}

// ============================== Section Card Component Start===============================
function SectionCards({
  isloading,
  total_student,
  total_teacher,
  total_courses,
  total_unpaid,
}: {
  isloading: boolean;
  total_student: number;
  total_teacher: number;
  total_courses: number;
  total_unpaid: number;
}) {
  if (isloading) {
    return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Skeleton className="h-48 rounded-xl">
          <Skeleton className="h-8 rounded-xl" />
        </Skeleton>
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-center text-md">
            Total Student
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center gap-1">
          <UsersRoundIcon className="inline mr-2" size={30} />
          <span className="text-4xl font-semibold tabular-nums">
            <CountUp
              start={0}
              end={total_student}
              duration={2}
              separator=""
              // decimals={4}
              decimal=","
              // prefix="EUR "x
              // suffix=" left"
            />
          </span>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm ">
          <div className="text-muted-foreground text-center size-full">
            In Institute and Universty course
          </div>
        </CardFooter>
      </Card>{" "}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-center text-md">
            Total Teacher
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center gap-1">
          <UsersIcon className="inline mr-2" size={30} />
          <span className="text-4xl font-semibold tabular-nums">
            <CountUp
              start={0}
              end={total_teacher}
              duration={2}
              separator=""
              // decimals={4}
              decimal=","
              // prefix="EUR "x
              // suffix=" left"
            />
          </span>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm ">
          <div className="text-muted-foreground text-center size-full capitalize">
            For institute and university courses.
          </div>
        </CardFooter>
      </Card>{" "}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-center text-md">
            Total Courses
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center gap-1">
          <LibraryBigIcon className="inline mr-2" size={30} />
          <span className="text-4xl font-semibold tabular-nums">
            <CountUp
              start={0}
              end={total_courses}
              duration={2.75}
              separator=""
              // decimals={4}
              decimal=","
              // prefix="EUR "x
              // suffix=" left"
            />
          </span>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm ">
          <div className="text-muted-foreground text-center size-full capitalize">
            In your Institution.
          </div>
        </CardFooter>
      </Card>{" "}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-center text-md">
            Total Unpaid Fees
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center gap-1">
          <Wallet2 className="inline mr-2" size={30} />
          <span className="text-4xl font-semibold tabular-nums">
            <CountUp
              start={0}
              end={total_unpaid}
              duration={2.75}
              separator=""
              // decimals={4}
              decimal=","
              prefix="₹"
              // suffix=" left"
            />
          </span>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1.5 text-sm ">
          <div className="text-muted-foreground text-center size-full">
            Institute and Universty Student
          </div>
        </CardFooter>
      </Card>{" "}
    </div>
  );
}
// ===========================Seaction Card Component End==================================
