import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import InstituteDashboard from "@/components/custom/admin/dashboard/dashboard";
import Footer from "@/components/custom/admin/Footer";
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
    <SidebarInset className="px-1 md:px-2 ">
      <Header user_type={session.user_type} />
      <main className="">
        {currentRoute === "dashboard" ? (
          <InstituteDashboard session={session} />
        ) : (
          <div className="p-4">Welcome, {session.identifier}</div>
        )}
      </main>
      <Footer company_name={"Arshnoor Kirmani"} />
    </SidebarInset>
  );
}

export default page;
