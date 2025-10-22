import React from "react";
// These are shadcn-style UI components — ensure you have them in src/components/ui
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RoleCard from "./RoleCard";
import { UserCheck, User, UserPlus, Users, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8">
        <Card className="p-8 lg:p-12 bg-gradient-to-br from-white/60 to-slate-50/60 backdrop-blur-sm border border-slate-100 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
                Institute management — powerful, simple, secure
              </h1>
              <p className="mt-4 text-slate-600 max-w-2xl">
                Setup your institute in minutes. Role-based access for admins,
                teachers, students and parents — attendance, assignments, fees
                and reports in one place.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="shadow-md"
                  onClick={() => (location.href = "#create-institute")}
                >
                  Create Institute Account
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => (location.href = "#institute-login")}
                >
                  Institute Login
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <ShieldCheck className="text-sky-500" />
                  <div>
                    <div className="font-semibold text-slate-700">
                      Secure by design
                    </div>
                    <div className="text-xs">Encryption & 2FA</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <UserCheck className="text-emerald-500" />
                  <div>
                    <div className="font-semibold text-slate-700">
                      Role-based access
                    </div>
                    <div className="text-xs">
                      Admin / Teacher / Student / Parent
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <UserPlus className="text-orange-400" />
                  <div>
                    <div className="font-semibold text-slate-700">
                      Fast onboarding
                    </div>
                    <div className="text-xs">Wizard for classes & users</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-72">
              <div className="rounded-2xl overflow-hidden border bg-gradient-to-br from-white to-slate-50 p-4 shadow-lg">
                <div className="text-xs text-slate-500">Quick start</div>
                <ol className="mt-3 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="min-w-[36px] h-9 rounded-md bg-indigo-600 text-white flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <div className="font-medium text-slate-700">
                        Create institute
                      </div>
                      <div className="text-xs text-slate-500">
                        Add institute details & logo
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="min-w-[36px] h-9 rounded-md bg-emerald-500 text-white flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <div className="font-medium text-slate-700">
                        Add admins & teachers
                      </div>
                      <div className="text-xs text-slate-500">
                        Invite staff via email
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="min-w-[36px] h-9 rounded-md bg-orange-400 text-white flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div>
                      <div className="font-medium text-slate-700">
                        Import students
                      </div>
                      <div className="text-xs text-slate-500">
                        CSV or manual
                      </div>
                    </div>
                  </li>
                </ol>

                <div className="mt-4">
                  <Button
                    className="w-full"
                    onClick={() => (location.href = "#create-institute")}
                  >
                    Start Setup
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <aside className="lg:col-span-4">
        <div className="sticky top-24 space-y-4">
          <RoleCard
            title="Institute Login"
            desc="Admin / Superuser access"
            icon={<Users />}
            color="bg-gradient-to-br from-indigo-600 to-sky-500"
            href="#institute-login"
          />
          <RoleCard
            title="Teacher Login"
            desc="Class, attendance & assignments"
            icon={<User />}
            color="bg-gradient-to-br from-emerald-500 to-teal-400"
            href="#teacher-login"
          />
          <RoleCard
            title="Student Login"
            desc="Homework, grades & schedule"
            icon={<UserPlus />}
            color="bg-gradient-to-br from-orange-400 to-rose-300"
            href="#student-login"
          />
          <RoleCard
            title="User Login"
            desc="Parents / Staff / Guests"
            icon={<UserCheck />}
            color="bg-gradient-to-br from-slate-500 to-slate-400"
            href="#user-login"
          />
        </div>
      </aside>
    </section>
  );
}
