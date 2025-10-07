"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ variant }: { variant?: "outline" | "ghost" }) {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={variant ? variant : "outline"}
      size="icon"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className="cursor-pointer"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
