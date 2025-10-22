import React from "react";
import { Button } from "@/components/ui/button";

export default function RoleCard({
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
    <div className="rounded-2xl border bg-white/70 backdrop-blur-sm p-4 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-lg flex items-center justify-center text-white ${color} shadow-md`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-medium text-slate-800">{title}</div>
          <div className="text-sm text-slate-500 mt-1">{desc}</div>
        </div>
      </div>
      <div className="mt-4">
        <Button
          variant="ghost"
          className="w-full justify-center"
          onClick={() => (location.href = href || "#")}
        >
          Open
        </Button>
      </div>
    </div>
  );
}
