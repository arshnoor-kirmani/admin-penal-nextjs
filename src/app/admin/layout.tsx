import type { Metadata } from "next";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/custom/admin/sidebar";

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
    <SidebarProvider>
      <Sidebar />
      <div>
        <SidebarTrigger className="absolute" />
        {children}
      </div>
    </SidebarProvider>
  );
}
