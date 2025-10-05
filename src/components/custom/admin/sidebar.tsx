"use client";
import {
  BoltIcon,
  BookOpenIcon,
  InboxIcon,
  Layers2Icon,
  UserCircleIcon,
  UserPlus2Icon,
  Settings,
  Inbox,
  User2,
  LucideHome,
  UserCircle,
  Receipt,
  Sheet,
  Book,
  UserPlus,
  LogIn,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/custom/logout-button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/custom/redux-hooks";
import {
  InstituteInfo,
  setInstituteInfo,
} from "@/lib/store/ReduxSlices/InstituteSlice";
import { toast } from "sonner";
import {
  setStudentInfo,
  StudentInfo,
} from "@/lib/store/ReduxSlices/StudentSlice";
import {
  setTeacherInfo,
  TeacherInfo,
} from "@/lib/store/ReduxSlices/TeacherSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    label: "User",
    navs_item: [
      {
        id: "dashboard",
        title: "Dashboard",
        url: "dashboard",
        icon: LucideHome,
      },
      { id: "profile_edit", title: "Profile", url: "profile", icon: User2 },
      {
        id: "settings",
        title: "Setting",
        url: "settings",
        icon: Settings,
      },
      {
        id: "manage_users",
        title: "Manage Users",
        url: "manage-users",
        icon: UserCircle,
      },
      {
        id: "add_user",
        title: "Add User",
        url: "add-user",
        icon: UserPlus2Icon,
      },
      {
        id: "website_setting",
        title: "Website setting",
        url: "website-setting",
        icon: Settings,
      },
      {
        id: "inbox_message",
        title: "Inbox",
        url: "inbox",
        icon: Inbox,
      },
    ],
  },
  {
    label: "Student",
    navs_item: [
      {
        id: "show_student",
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
        id: "fees_management",
        title: "Fees Management",
        url: "fees-management",
        icon: Receipt,
      },
      {
        id: "result_permession",
        title: "Results Management",
        url: "results",
        icon: Sheet,
      },
      {
        id: "attendance",
        title: "Attendance",
        url: "attendance",
        icon: Book,
      },
    ],
  },
  {
    label: "Teacher",
    navs_item: [
      {
        id: "show_teacher",
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
      {
        id: "salary_management",
        title: "Salary Management",
        url: "salary-management",
        icon: Receipt,
      },
    ],
  },
];
export default function Sidebar_() {
  const { data: session } = useSession({ required: true });
  // TODO::::
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
    rules: {
      all_permissions: undefined,
    },
    institute_short_name: "",
  });
  const instituteInfo = useAppSelector((state) => state.institute);
  const studentInfo = useAppSelector((state) => state.student);
  const teacherInfo = useAppSelector((state) => state.teacher);
  // ======================================================
  // ======================================================
  const fetchInstituteInfo = async (
    identifier: string,
    institute_id: string,
    user_type: string
  ) => {
    console.log("Checking.....", identifier);
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
      console.log("Fechgin URL = ", URL, identifier, institute_id);
      await axios
        .post(URL, {
          identifier,
          institute_id,
        })
        .then((res) => {
          console.log("Institute Info Response:", res.data);
          // Set the institute info in Redux store
          if (res.data && res.data.success && res.data.user) {
            const user = res.data.user;
            console.log("Feched User", user);
            let data;
            // Set Institute information in userInformatio Variable
            if (user.user_type === "institute") {
              data = dispatch(
                setInstituteInfo({
                  logo: user.logo || "https://github.com/shadcn.png",
                  profile_url:
                    user.profile_url || "https://github.com/shadcn.png",
                  institute_name: user.institute_name || "Institute Name",
                  institute_id: user._id,
                  username: user.username || "Username",
                  identifier: user.email || "Email",
                  users: user.users || [],
                  courses: user.courses || [],
                  rules: user.rules || "",
                  institute_short_name:
                    user.institute_short_name || "Institute Short Name",
                  user_type: user.user_type || "institute",
                })
              );
            } else if (user.user_type === "student") {
              console.log("Student user", user);
              data = dispatch(
                setStudentInfo({
                  username: user.student_name || "Username",
                  institute_id: user.institute_id || "",
                  institute_name: user.institute_name || "Institute Name",
                  profile_url:
                    user.profile_url || "https://github.com/shadcn.png",
                  rules: user.rules || "",
                  identifier: user.student_id || "Student ID",
                  user_type: user.user_type || "student",
                })
              );
            } else if (user.user_type === "teacher") {
              console.log("Teacher user", user);
              data = dispatch(
                setTeacherInfo({
                  username: user.teacher_name || "Username",
                  institute_id: user.institute_id || "",
                  institute_name: user.institute_name || "Institute Name",
                  profile_url:
                    user.profile_url || "https://github.com/shadcn.png",
                  rules: user.rules || "",
                  identifier: user.teacher_id || "Teacher ID",
                  user_type: user.user_type || "teacher",
                })
              );
            }
            if (data === undefined) {
              toast.error("Somthing wrong.....");
            }
            setUserInformation({
              ...data?.payload,
            } as InstituteInfo & StudentInfo & TeacherInfo);
          } else {
            toast.error(
              res.data?.message ||
                "Failed to load institute info. Please try again."
            );
          }

          setFetchingInfo(false);
        })
        .catch((err) => {
          console.error("Error fetching institute info:", err);
          setFetchingInfo(false);
          toast.error("Something went wrong.....");
        });
    } catch (error) {
      console.error("Error fetching institute info:", error);
    }
  };
  // ======================================================
  // ======================================================
  useEffect(() => {
    if (!session) return;
    console.log("session", session);
    if (session?.identifier === userInformation.identifier) return;
    if (!!userInformation.identifier) {
      return;
    }
    const Promis = new Promise(async (resolve) => {
      const identifier = session.identifier;
      const user_type = session.user_type;
      const intitute_id = session.institute_id || "";
      if (!identifier || !user_type || !intitute_id) {
        toast.error("Invalid session data. Please log in again.");
        return;
      }
      if (userInformation.identifier === identifier) return;
      if (
        user_type === "institute" &&
        instituteInfo.identifier === identifier
      ) {
        setUserInformation(instituteInfo);
        setFetchingInfo(false);
        return;
      } else if (
        user_type === "student" &&
        studentInfo.identifier === identifier
      ) {
        setUserInformation(studentInfo);
        setFetchingInfo(false);
        return;
      } else if (
        user_type === "teacher" &&
        teacherInfo.identifier === identifier
      ) {
        setUserInformation(teacherInfo);
        setFetchingInfo(false);
        return;
      }
      await fetchInstituteInfo(identifier, intitute_id, user_type).then(
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
  }, [session, instituteInfo, studentInfo, teacherInfo]);
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
  return (
    <Sidebar side="left" variant="floating">
      <SidebarHeader>
        {" "}
        <div className="size-full flex justify-center items-center flex-col gap-2">
          <Avatar className="size-14">
            <AvatarImage
              src={
                userInformation.user_type === "institute"
                  ? userInformation.logo
                  : userInformation.profile_url
              }
            />
            <AvatarFallback>
              <Skeleton className="size-full rounded-full" />
            </AvatarFallback>
          </Avatar>

          <h1>{userInformation.username}</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="">
        <ScrollArea className="h-full px-1 w-full rounded-md">
          {userNavigations.map((item) => {
            if (!item) return;
            const visibelNav = item.navs_item.filter(
              (navItem) =>
                userInformation.rules.all_permissions ||
                userInformation.rules[navItem.id] ||
                navItem.id === "dashboard" ||
                userInformation.user_type === "institute" ||
                userInformation.user_type === "admin" ||
                userInformation.user_type === "user"
            );
            console.log("Visible Nav", visibelNav);
            console.log("User Information", userInformation);
            return (
              visibelNav.length > 0 && (
                <SidebarGroup key={item.label}>
                  <SidebarGroupLabel className="text-sm h-6 ">
                    {item.label}
                  </SidebarGroupLabel>
                  <SidebarMenuSub>
                    {visibelNav.map((navItem) => (
                      <SidebarMenuSubItem key={navItem.title}>
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
      {/*============================== Footer===================================== */}
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem className="flex  gap-2 justify-between">
            {" "}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="size-fit relative">
                  <Avatar className="size-8">
                    <AvatarImage src={userInformation.profile_url} />
                    <AvatarFallback>
                      <Skeleton className="size-full rounded-full" />
                    </AvatarFallback>
                    {/* TODO: Skeleton for Avatar Image */}
                  </Avatar>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="max-w-64 ml-4"
                align="center"
                sideOffset={7}
              >
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                  <span className="text-foreground truncate text-sm font-medium text-center">
                    {userInformation.username}
                  </span>
                  <span className="text-muted-foreground truncate text-xs font-normal">
                    {userInformation?.identifier}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {userInformation.user_type === "institute" && (
                    <>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/account-center">
                          <BoltIcon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                          />
                          <span>Account Center</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/deleted-users">
                          <UserCircleIcon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                          />
                          <span className="text-xs">
                            Deleted Students, Teachers
                          </span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/login-activity">
                          <InboxIcon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                          />
                          <span>Login Activity</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {userInformation.user_type === "student" && (
                    <>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/account-center">
                          <BoltIcon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                          />
                          <span>Account Center</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/student-guide">
                          <BookOpenIcon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                          />
                          <span>Student Guide</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/login-activity">
                          <InboxIcon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                          />
                          <span>Login Activity</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {userInformation.user_type === "teacher" && (
                    <>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/account-center">
                          <BoltIcon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                          />
                          <span>Account Center</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/my-classes">
                          <Layers2Icon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                          />
                          <span>My Classes</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/teaching-guides">
                          <BookOpenIcon
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                          />
                          <span>Teaching Guides</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/login-activity">
                          <LogIn
                            size={16}
                            className="opacity-60"
                            aria-hidden="true"
                          />
                          <span>Login Activity</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => {}}
                >
                  {/* The actual logout button is hidden, just triggers on click */}
                  <div className="ml-auto flex justify-center items-center gap-4">
                    <span>Logout</span>
                    <LogoutButton />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
