import type { Metadata } from "next";
import "@/app/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
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
      <SidebarProvider className="w-full h-dvh">
        <Sidebar />
        <div className="m-0 w-full h-full relative">
          <div className="absolute top-1 left-2 z-100">
            {/* <SidebarTrigger className="sticky top-3 z-100" /> */}
          </div>{" "}
          {children}
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
