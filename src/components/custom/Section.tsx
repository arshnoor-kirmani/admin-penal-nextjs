import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  CircleUserRound,
  ShieldCheck,
  SquareUser,
  University,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Section() {
  return (
    <section className="m-3 items-start">
      <Card className=" ">
        <div className="grid grid-cols-1 lg:grid-cols-[75%_20%] gap-3 md:gap-5">
          <CardHeader>
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tigh">
                Institute management — powerful, simple, secure
              </h1>
              <p className="mt-4 text-muted-foreground max-w-2xl">
                Setup your institute in minutes. Role-based access for admins,
                teachers, students and parents — attendance, assignments, fees
                and reports in one place.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 w-full md:w-100">
                <Link href="/auth/create-institute-account">
                  <Button
                    size="lg"
                    className="shadow-md cursor-pointer w-full"
                    variant="default"
                  >
                    Create Institute Account
                  </Button>
                </Link>
                <Link href="/auth/institute-login">
                  <Button
                    size="lg"
                    className="shadow-md cursor-pointer w-full"
                    variant="secondary"
                  >
                    Institute Login
                  </Button>
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldCheck className="text-chart-2" />
                  <div>
                    <div className="font-semibold text-primary">
                      Secure by design
                    </div>
                    <div className="text-xs">Encryption & 2FA</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <UserCheck className="text-chart-1 " />
                  <div>
                    <div className="font-semibold text-primary">
                      Role-based access
                    </div>
                    <div className="text-xs">
                      Admin / Teacher / Student / Parent
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <UserPlus className="text-chart-4" />
                  <div>
                    <div className="font-semibold text-primary">
                      Fast onboarding
                    </div>
                    <div className="text-xs">Wizard for classes & users</div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <Card className="mx-3 md:mx-0 rounded-2xl h-fit overflow-hidden border bg-gradient-to-br  p-4 shadow-lg">
            <div className="text-xs ">Quick start</div>
            <ol className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="min-w-[36px] h-9 rounded-md bg-chart-1 text-white flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <div className="font-medium ">Create institute</div>
                  <div className="text-xs text-muted-foreground">
                    Add institute details & logo
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="min-w-[36px] h-9 rounded-md bg-chart-2 text-white flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <div className="font-medium ">Add admins & teachers</div>
                  <div className="text-xs text-muted-foreground">
                    Invite staff via email
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="min-w-[36px] h-9 rounded-md bg-chart-5 text-white flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <div className="font-medium ">Import students</div>
                  <div className="text-xs text-muted-foreground">
                    CSV or manual
                  </div>
                </div>
              </li>
            </ol>

            <div className="mt-4">
              <Link href="/auth/create-institute-account">
                <Button className="w-full">Start Setup</Button>
              </Link>
            </div>
          </Card>
        </div>
        <CardContent>
          {" "}
          <div
            id="features"
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 "
          >
            <Card className="p-4 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
              <div className="font-semibold">Attendance</div>
              <div className="text-sm text-muted-foreground ">
                Quick marking, auto reports and exports.
              </div>
            </Card>{" "}
            <Card className="p-4 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
              <div className="font-semibold">Assignments</div>
              <div className="text-sm text-muted-foreground ">
                Upload, grade and share feedback.
              </div>
            </Card>
            <Card className="p-4 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
              <div className="font-semibold">Fees & Reporting</div>
              <div className="text-sm text-muted-foreground ">
                Invoices, receipts and financial reports.
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
      <Card className="my-3 p-4 border shadow-lg">
        <div className="text-lg font-semibold mb-2 grid grid-cols-1 md:grid-cols-4 gap-2">
          <RoleCard
            icon={<University />}
            title="Institute Login"
            desc="Full access to all features and settings."
            color="bg-chart-1"
            href="/auth/institute-login"
          />
          <RoleCard
            icon={<SquareUser />}
            title="Teacher Login"
            desc="Manage classes, assignments, and student progress."
            color="bg-chart-2"
            href="/auth/teacher-login"
          />
          <RoleCard
            icon={<CircleUserRound />}
            title="Student Login"
            desc="Access assignments, submit work, and track progress."
            color="bg-chart-4"
            href="/auth/student-login"
          />

          <RoleCard
            icon={<Users />}
            title="Guest Login"
            desc="Limited access to view content."
            color="bg-chart-5"
            href="#"
          />
        </div>
      </Card>
    </section>
  );
}

export function RoleCard({
  title,
  desc,
  icon,
  color = "bg-sky-600",
  href,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color?: string;
  href?: string;
}) {
  return (
    <Card className="rounded-2xl border backdrop-blur-sm p-4 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-lg flex items-center justify-center text-white ${color} shadow-md`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-medium ">{title}</div>
          <div className="text-sm ">{desc}</div>
        </div>
      </div>
      <div className="mt-4">
        <Link href={href || "#"}>
          <Button variant="secondary" className="w-full justify-center">
            Login
          </Button>
        </Link>
      </div>
    </Card>
  );
}
