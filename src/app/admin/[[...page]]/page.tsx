import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import InstituteDashboard from "@/components/custom/admin/dashboard/dashboard";
import { Header } from "@/components/custom/admin/Header";
import { SidebarInset } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import React from "react";

async function page({ params }: { params: { page: string[] } }) {
  const session = await getServerSession(authOptions);
  const Params = await params;
  const currentRoute = Params.page[Params.page.length - 1];
  if (!session) {
    return <div>{currentRoute}</div>;
  }
  return (
    <SidebarInset>
      <Header user_type={session.user_type} />
      {currentRoute === "dashboard" ? (
        <InstituteDashboard session={session} />
      ) : (
        <div className="p-4">Welcome, {session.identifier}</div>
      )}
    </SidebarInset>
  );
}

export default page;
