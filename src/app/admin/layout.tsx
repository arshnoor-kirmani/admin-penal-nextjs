import type { Metadata } from "next";
import "@/app/globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Sidebar from "@/components/custom/admin/sidebar";
import SessionProvider from "@/components/custom/SessionProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Footer from "@/components/custom/admin/Footer";
import { Header } from "@/components/custom/admin/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { LoaderIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Panel | Dashboard",
  description: "Dashboard for managing institute resources",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side session check
  const session = await getServerSession(authOptions);

  if (!session) {
    // Agar user logged out hai → redirect to login
    redirect("/login");
  }

  return (
    <SessionProvider>
      <SidebarProvider>
        <Sidebar />
        <div className="relative m-0 w-full">
          <SidebarInset className="flex flex-col px-1 md:px-2">
            <Header user_type={session.user_type} />
            <main className="flex-1 overflow-y-auto">
              {!session ? (
                <div className="w-full h-90 flex justify-center items-center">
                  <LoaderIcon
                    role="status"
                    aria-label="Loading"
                    className={"size-7 animate-spin"}
                  />
                </div>
              ) : (
                children
              )}
            </main>
            <Footer company_name="Arshnoor Kirmani" />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
