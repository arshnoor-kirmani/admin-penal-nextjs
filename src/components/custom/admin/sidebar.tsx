"use client";

import {
  LucideHome,
  User2,
  UserCircle,
  UserPlus2Icon,
  UserPlus,
  Receipt,
  Sheet,
  Book,
  BookOpen,
  Settings,
  Monitor,
  Inbox,
  BoltIcon,
  UserCircleIcon,
  Layers2Icon,
  InboxIcon,
  LogOutIcon,
  User,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/hooks/custom/redux-hooks";
import { setInstituteInfo } from "@/lib/store/ReduxSlices/InstituteSlice";
import { setStudentInfo } from "@/lib/store/ReduxSlices/StudentSlice";
import { setTeacherInfo } from "@/lib/store/ReduxSlices/TeacherSlice";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import LogoutButton from "@/components/custom/logout-button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ===================== Navigation =====================

const userNavigations: {
  label: string;
  navs_item: {
    id: string;
    title: string;
    url: string;
    icon: React.ElementType;
  }[];
}[] = [
  {
    label: "Dashboard",
    navs_item: [
      {
        id: "dashboard",
        title: "Overview",
        url: "dashboard",
        icon: LucideHome,
      },
      {
        id: "inbox_show",
        title: "Inbox / Messages",
        url: "inbox",
        icon: Inbox,
      },
      {
        id: "profile_show",
        title: "My Profile",
        url: "profile",
        icon: User2,
      },
    ],
  },
  {
    label: "User Management",
    navs_item: [
      {
        id: "users_show",
        title: "All Users",
        url: "manage-users",
        icon: UserCircle,
      },
      {
        id: "add_user",
        title: "Add User",
        url: "add-user",
        icon: UserPlus2Icon,
      },
    ],
  },
  {
    label: "Student Management",
    navs_item: [
      {
        id: "students_show",
        title: "Student List",
        url: "students",
        icon: User2,
      },
      {
        id: "add_student",
        title: "Add Student",
        url: "new-student",
        icon: UserPlus2Icon,
      },
      {
        id: "attendance_show",
        title: "Attendance",
        url: "attendance",
        icon: Book,
      },
      {
        id: "result_show",
        title: "Results",
        url: "results",
        icon: Sheet,
      },
    ],
  },
  {
    label: "Teacher Management",
    navs_item: [
      {
        id: "teacher_show",
        title: "Teacher List",
        url: "teachers",
        icon: UserCircle,
      },
      {
        id: "add_teacher",
        title: "Add Teacher",
        url: "new-teacher",
        icon: UserPlus,
      },
    ],
  },
  {
    label: "Academics",
    navs_item: [
      {
        id: "courses_show",
        title: "Courses",
        url: "courses",
        icon: BookOpen,
      },
    ],
  },
  {
    label: "Finance",
    navs_item: [
      {
        id: "fees_management",
        title: "Fees Management",
        url: "fees-management",
        icon: Receipt,
      },
      {
        id: "salary_management",
        title: "Salary Management",
        url: "salary-management",
        icon: Receipt,
      },
    ],
  },
  {
    label: "Settings",
    navs_item: [
      {
        id: "account_setting",
        title: "Institute Account Settings",
        url: "settings",
        icon: Settings,
      },
      {
        id: "website_setting",
        title: "Website Settings",
        url: "website-settings",
        icon: Monitor,
      },
    ],
  },
];

// ===================== Main Sidebar =====================
export default function Sidebar_() {
  const { data: session } = useSession({ required: true });
  const dispatch = useAppDispatch();

  const [fetchingInfo, setFetchingInfo] = useState(true);
  const [user_type, setUserType] = useState("");
  const instituteInfo = useAppSelector((state) => state.institute);
  const studentInfo = useAppSelector((state) => state.student);
  const teacherInfo = useAppSelector((state) => state.teacher);
  // ===================== Fetch User Info =====================
  useEffect(() => {
    const fetchInstituteInfo = async (
      identifier: string,
      institute_id: string,
      user_type: string
    ) => {
      setFetchingInfo(true);
      try {
        const URL =
          user_type === "institute"
            ? "/api/auth/get-institute-info"
            : user_type === "student"
            ? "/api/auth/get-student-info"
            : user_type === "teacher"
            ? "/api/auth/get-teacher-info"
            : "";
        await axios
          .post(URL, {
            identifier,
            institute_id,
          })
          .then((res) => {
            // Set the institute info in Redux store
            if (res.data && res.data.success && res.data.user) {
              const user = res.data.user;
              let data;
              // Set Institute information in userInformatio Variable
              if (user.user_type === "institute") {
                data = dispatch(
                  setInstituteInfo({
                    institute_id: user._id,
                    identifier: user.email || "Email",
                    ...user,
                  })
                );
              } else if (user.user_type === "student") {
                data = dispatch(
                  setStudentInfo({
                    username: user.student_name || "Username",
                    profile_url:
                      user.profile_url || "https://github.com/shadcn.png",
                    identifier: user.student_id || "Student ID",
                    ...user,
                  })
                );
              } else if (user.user_type === "teacher") {
                data = dispatch(
                  setTeacherInfo({
                    username: user.teacher_name || "Username",
                    profile_url:
                      user.profile_url || "https://github.com/shadcn.png",
                    identifier: user.teacher_id || "Teacher ID",
                    ...user,
                  })
                );
              }
              if (data === undefined) {
                toast.error("Somthing wrong.....");
              }
            }
          })
          .catch((err) => {
            console.error("Error fetching institute info:", err);
            toast.error("Something went wrong.....");
          })
          .finally(() => {
            setFetchingInfo(false);
          });
      } catch (error) {
        console.error("Error fetching institute info:", error);
      }
    };
    if (!session) return;
    if (
      session?.identifier === instituteInfo.identifier ||
      session?.identifier === studentInfo.identifier ||
      session?.identifier === teacherInfo.identifier
    )
      return;
    if (
      !!(
        instituteInfo.identifier ||
        studentInfo.identifier ||
        teacherInfo.identifier
      )
    ) {
      return;
    }
    const Promis = new Promise(async (resolve) => {
      const { identifier, user_type, institute_id } = session;
      setUserType(user_type);
      if (!identifier || !user_type || !institute_id) {
        toast.error("Invalid session data. Please log in again.");
        return;
      }
      await fetchInstituteInfo(identifier, institute_id, user_type).then(
        (result) => {
          resolve(result);
        },
        (error) => {
          console.error("Error in fetchInstituteInfo:", error);
          toast.error("Failed to fetch institute info.");
          resolve(null);
        }
      );
    });
    toast.promise(Promis, {
      loading: "Loading institute info...",
      success: "Institute info loaded",
      error: "Error loading institute info",
    });
  }, [
    session,
    instituteInfo,
    studentInfo,
    teacherInfo,
    instituteInfo.identifier,
    studentInfo.identifier,
    teacherInfo.identifier,
    dispatch,
  ]);
  // ===================== Loading Skeleton =====================
  if (fetchingInfo) {
    return (
      <Sidebar side="left" variant="floating" id="sidebar-skeleton">
        <SidebarHeader className="">
          <div className="size-full flex justify-center items-center flex-col gap-2">
            <Skeleton className="size-14 rounded-full" />

            <Skeleton className="h-6 w-32" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          {" "}
          <SidebarGroup>
            <SidebarMenuSkeleton />
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSkeleton showIcon />
                <SidebarMenuSkeleton showIcon />
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarMenuSkeleton />
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSkeleton showIcon />
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarMenuSkeleton />
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSkeleton showIcon />
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t">
          <SidebarMenu>
            <SidebarMenuItem className="flex  gap-2 justify-between">
              <Skeleton className="size-10 rounded-full" />
              <LogoutButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    );
  }

  // ===================== Render Sidebar =====================
  return (
    <Sidebar side="left" variant="floating">
      <SidebarHeader>
        <div className="flex flex-col items-center gap-2">
          <Avatar className="size-14">
            <AvatarImage
              src={
                user_type === "institute"
                  ? instituteInfo.information.logo
                  : user_type === "student"
                  ? studentInfo.information.profile_url
                  : teacherInfo.information.profile_url
              }
            />
            <AvatarFallback>
              {(user_type === "institute"
                ? instituteInfo.information.institute_name
                : user_type === "student"
                ? studentInfo.username
                : teacherInfo.username
              )
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-sm font-medium">
            {user_type === "institute"
              ? instituteInfo.information.institute_name
              : user_type === "student"
              ? studentInfo.username
              : teacherInfo.username}
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full px-1 w-full rounded-md">
          {userNavigations.map((group) => {
            const visibleNavs = group.navs_item.filter(
              (item) =>
                (user_type === "institute"
                  ? instituteInfo.rules.all_permissions
                  : user_type === "student"
                  ? studentInfo.rules.all_permissions
                  : teacherInfo.rules.all_permissions) ||
                (user_type === "institute"
                  ? instituteInfo.rules[
                      item.id as keyof typeof instituteInfo.rules
                    ]
                  : user_type === "student"
                  ? studentInfo.rules[item.id as keyof typeof studentInfo.rules]
                  : teacherInfo.rules[
                      item.id as keyof typeof teacherInfo.rules
                    ]) ||
                item.id === "dashboard" ||
                ["institute", "admin", "user"].includes(user_type)
            );

            return (
              visibleNavs.length > 0 && (
                <SidebarGroup key={group.label} className="mr-5">
                  <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                  <SidebarMenuSub className="mr-5">
                    {visibleNavs.map((navItem) => (
                      <SidebarMenuSubItem key={navItem.id} className="mr-5">
                        <SidebarMenuButton
                          className="mr-5"
                          asChild
                          aria-disabled={
                            (user_type === "institute"
                              ? instituteInfo
                              : user_type === "student"
                              ? studentInfo
                              : teacherInfo
                            ).rules.all_permissions
                              ? false
                              : (
                                  user_type === "institute"
                                    ? instituteInfo.rules[
                                        navItem.id as keyof typeof instituteInfo.rules
                                      ]
                                    : user_type === "student"
                                    ? studentInfo.rules[
                                        navItem.id as keyof typeof studentInfo.rules
                                      ]
                                    : teacherInfo.rules[
                                        navItem.id as keyof typeof teacherInfo.rules
                                      ]
                                )
                              ? !(user_type === "institute"
                                  ? instituteInfo.rules[
                                      navItem.id as keyof typeof instituteInfo.rules
                                    ]
                                  : user_type === "student"
                                  ? studentInfo.rules[
                                      navItem.id as keyof typeof studentInfo.rules
                                    ]
                                  : teacherInfo.rules[
                                      navItem.id as keyof typeof teacherInfo.rules
                                    ])
                              : navItem.id === "dashboard"
                              ? false
                              : true
                          }
                        >
                          <Link href={navItem.url}>
                            <navItem.icon />
                            <span>{navItem.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarGroup>
              )
            );
          })}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenuItem className="flex justify-between items-center gap-2">
          <ProfileIcon
            profile_url={
              (user_type === "institute"
                ? instituteInfo
                : user_type === "student"
                ? studentInfo
                : teacherInfo
              )?.information?.profile_url
            }
            username={
              (user_type === "institute"
                ? instituteInfo
                : user_type === "student"
                ? studentInfo
                : teacherInfo
              )?.username
            }
            identifier={
              (user_type === "institute"
                ? instituteInfo
                : user_type === "student"
                ? studentInfo
                : teacherInfo
              )?.identifier
            }
            user_type={
              (user_type === "institute"
                ? instituteInfo
                : user_type === "student"
                ? studentInfo
                : teacherInfo
              )?.user_type
            }
          />
          <LogoutButton />
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}

// ===================== Profile Icon Dropdown =====================
export function ProfileIcon({
  profile_url,
  username,
  identifier,
  user_type,
}: {
  profile_url: string;
  username: string;
  identifier: string;
  user_type: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="relative size-fit">
          <Avatar className="size-8">
            <AvatarImage src={profile_url} />
            <AvatarFallback>
              {profile_url ? (
                <Skeleton className="size-full rounded-full" />
              ) : (
                <User size={15} />
              )}
            </AvatarFallback>
          </Avatar>
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64 ml-4" align="center">
        <DropdownMenuLabel className="flex flex-col items-center">
          <span className="truncate text-sm font-medium">{username}</span>
          <span className="text-muted-foreground truncate text-xs">
            {identifier}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account-center">
              <BoltIcon size={16} className="opacity-60" />
              <span>Account Center</span>
            </Link>
          </DropdownMenuItem>

          {user_type === "institute" && (
            <DropdownMenuItem asChild>
              <Link href="/deleted-users">
                <UserCircleIcon size={16} className="opacity-60" />
                <span>Deleted Users</span>
              </Link>
            </DropdownMenuItem>
          )}

          {user_type === "teacher" && (
            <DropdownMenuItem asChild>
              <Link href="/my-classes">
                <Layers2Icon size={16} className="opacity-60" />
                <span>My Classes</span>
              </Link>
            </DropdownMenuItem>
          )}

          {user_type !== "admin" && (
            <DropdownMenuItem asChild>
              <Link href="/login-activity">
                <InboxIcon size={16} className="opacity-60" />
                <span>Login Activity</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <div className="flex justify-center items-center">
          <LogoutButton variant="ghost">
            <div className="flex items-center gap-2">
              <span>Logout</span>
              <LogOutIcon />
            </div>
          </LogoutButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
