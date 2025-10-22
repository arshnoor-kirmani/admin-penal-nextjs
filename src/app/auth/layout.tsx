import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import { LogoLink } from "@/components/custom/Header";

export const metadata: Metadata = {
  title: "Admin Panel | Dashboard",
  description: "Dashboard for managing institute resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute top-1 left-2">
        <LogoLink />
      </div>
      <div className="absolute top-1 right-1">
        <ThemeToggle variant="outline" />
      </div>
      {children}
    </>
  );
}
