import type { Metadata } from "next";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/custom/admin/sidebar";
import SessionProvider from "@/components/custom/SessionProvider";

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
    <SessionProvider>
      <SidebarProvider>
        <Sidebar />
        <div>
          <SidebarTrigger className="absolute" />
          {children}
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
