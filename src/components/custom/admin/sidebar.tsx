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
import {
  setInstituteInfo,
  InstituteInfo,
} from "@/lib/store/ReduxSlices/InstituteSlice";
import {
  setStudentInfo,
  StudentInfo,
} from "@/lib/store/ReduxSlices/StudentSlice";
import {
  setTeacherInfo,
  TeacherInfo,
} from "@/lib/store/ReduxSlices/TeacherSlice";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
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
  const [userInformation, setUserInformation] = useState<
    InstituteInfo | StudentInfo | TeacherInfo
  >({
    logo: "",
    courses: [],
    institute_id: "",
    username: "",
    identifier: "",
    profile_url: "",
    user_type: "",
    institute_name: "",
    users: [],
    rules: { all_permissions: undefined },
    institute_short_name: "",
  });

  const instituteInfo = useAppSelector((state) => state.institute);
  const studentInfo = useAppSelector((state) => state.student);
  const teacherInfo = useAppSelector((state) => state.teacher);

  // ===================== Fetch User Info =====================
  useEffect(() => {
    const fetchInfo = async (
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
            : "/api/auth/get-teacher-info";

        const { data: res } = await axios.post(URL, {
          identifier,
          institute_id,
        });

        if (res?.success && res?.user) {
          const user = res.user;
          let data;
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
          } else {
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
          setUserInformation(
            data?.payload as InstituteInfo | StudentInfo | TeacherInfo
          );
        } else toast.error(res?.message || "Failed to load user info");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong...");
      } finally {
        setFetchingInfo(false);
      }
    };

    if (!session) return;
    const { identifier, user_type, institute_id } = session;
    if (!identifier || !user_type || !institute_id) {
      toast.error("Invalid session data. Please re-login.");
      return;
    }

    // use cached redux if available
    if (
      (user_type === "institute" && instituteInfo.identifier === identifier) ||
      (user_type === "student" && studentInfo.identifier === identifier) ||
      (user_type === "teacher" && teacherInfo.identifier === identifier)
    ) {
      setUserInformation(
        user_type === "institute"
          ? instituteInfo
          : user_type === "student"
          ? studentInfo
          : teacherInfo
      );
      setFetchingInfo(false);
      return;
    }

    fetchInfo(identifier, institute_id, user_type);
  }, [session, dispatch, instituteInfo, studentInfo, teacherInfo]);

  // ===================== Loading Skeleton =====================
  if (fetchingInfo) {
    return (
      <Sidebar side="left" variant="floating">
        <SidebarHeader>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="size-14 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenuSkeleton />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t">
          <SidebarMenuItem className="flex justify-between gap-2">
            <Skeleton className="size-10 rounded-full" />
            <LogoutButton />
          </SidebarMenuItem>
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
            <AvatarImage src={userInformation.logo} />
            <AvatarFallback>
              {userInformation.username
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-sm font-medium">{userInformation.username}</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full px-1 w-full rounded-md">
          {userNavigations.map((group) => {
            const visibleNavs = group.navs_item.filter(
              (item) =>
                userInformation.rules.all_permissions ||
                userInformation.rules[item.id] ||
                item.id === "dashboard" ||
                ["institute", "admin", "user"].includes(
                  userInformation.user_type
                )
            );

            return (
              visibleNavs.length > 0 && (
                <SidebarGroup key={group.label}>
                  <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                  <SidebarMenuSub>
                    {visibleNavs.map((navItem) => (
                      <SidebarMenuSubItem key={navItem.id}>
                        <SidebarMenuButton
                          asChild
                          aria-disabled={
                            userInformation.rules.all_permissions
                              ? false
                              : userInformation.rules[navItem.id]
                              ? !userInformation.rules[navItem.id]
                              : navItem.id === "dashboard"
                              ? false
                              : true
                          }
                        >
                          <Link href={navItem.url}>
                            <navItem.icon className="size-4" />
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
            profile_url={userInformation.profile_url}
            username={userInformation.username}
            identifier={userInformation.identifier}
            user_type={userInformation.user_type}
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
        <SidebarMenuButton className="relative">
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
