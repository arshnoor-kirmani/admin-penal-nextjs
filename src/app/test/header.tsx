import React from "react";
// shadcn-style imports (make sure you have these components available)
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="backdrop-blur-sm bg-white/60 border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a className="flex items-center gap-3" href="#">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-xl">
            IMS
          </div>
          <div>
            <div className="font-semibold text-slate-800">
              Institute Management
            </div>
            <div className="text-xs text-slate-400 -mt-0.5">
              Smart · Simple · Secure
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a className="text-slate-600 hover:text-slate-800" href="#features">
            Features
          </a>
          <a className="text-slate-600 hover:text-slate-800" href="#pricing">
            Pricing
          </a>
          <a className="text-slate-600 hover:text-slate-800" href="#docs">
            Docs
          </a>
          <Button onClick={() => (window.location.href = "#create-institute")}>
            Get Started
          </Button>
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" onClick={() => alert("Open mobile menu")}>
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  );
}
