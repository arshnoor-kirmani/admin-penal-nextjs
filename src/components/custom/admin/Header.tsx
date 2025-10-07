"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
import { ProfileIcon } from "./sidebar";
import { ThemeToggle } from "../theme-toggle";
import { useAppSelector } from "@/hooks/custom/redux-hooks";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function Header({ user_type }: { user_type: string }) {
  const InstitueInfo = useAppSelector((state) => state.institute);
  const StudentInfo = useAppSelector((state) => state.student);
  const TeacherInfo = useAppSelector((state) => state.teacher);
  const navigationLinks: { href: string; label: string }[] = [];
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  pathSegments.filter((path, index) => {
    if (path === "") return false;
    navigationLinks.push({
      href: "/" + pathSegments.slice(1, index + 1).join("/"),
      label: path.charAt(0).toUpperCase() + path.slice(1),
    });
    return path !== "";
  });
  console.log(navigationLinks);
  return (
    <header className="border-b px-4 md:px-6 sticky top-2 right-0 z-10 bg-primary-foreground rounded-2xl">
      <div className="flex h-12 items-center justify-between gap-4">
        <SidebarTrigger size="icon" />
        <Separator orientation="vertical" />
        <BreadCrumb navigationLinks={navigationLinks} />
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            {/* Messages */}
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground relative size-8 rounded-full shadow-none"
              aria-label="Open notifications"
            >
              <MailIcon size={16} aria-hidden="true" />
              {InstitueInfo.recent.length > 0 && (
                <div
                  aria-hidden="true"
                  className="bg-primary absolute top-0.5 right-0.5 size-1 rounded-full"
                />
              )}
            </Button>
            {/* Notification menu */}
            <ThemeToggle variant="ghost" />
          </div>
          {/* User menu */}
          <ProfileIcon
            profile_url={
              user_type === "institute"
                ? InstitueInfo.logo
                : user_type === "student"
                ? StudentInfo.profile_url
                : TeacherInfo.profile_url
            }
            username={
              user_type === "institute"
                ? InstitueInfo.username
                : user_type === "student"
                ? StudentInfo.username
                : TeacherInfo.username
            }
            identifier={
              user_type === "institute"
                ? InstitueInfo.identifier
                : user_type === "student"
                ? StudentInfo.identifier
                : TeacherInfo.identifier
            }
            user_type={user_type}
          />
        </div>
      </div>
    </header>
  );
}

// =============================================================
export function BreadCrumb({
  navigationLinks,
}: {
  navigationLinks: { href: string; label: string }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {navigationLinks.map((link, index: number) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {link.href === navigationLinks[navigationLinks.length - 1].href ||
              link.href === "/admin" ||
              link.href === "/student" ||
              link.href === "/teacher" ? (
                <BreadcrumbPage>{link.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < navigationLinks.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
