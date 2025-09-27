"use client";
import {
  BoltIcon,
  Book,
  BookOpenIcon,
  Inbox,
  Layers2Icon,
  LogOut,
  LucideHome,
  Receipt,
  Settings,
  Sheet,
  User2,
  UserCircle,
  UserPlus,
  UserPlus2Icon,
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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import LogoutButton from "@/components/custom/logout-button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/custom/redux-hooks";
import { setInstituteInfo } from "@/lib/store/ReduxSlices/InstituteSlice";
import { toast } from "sonner";
const userNavigations: {
  label: string;
  navs_item: { id: string; title: string; url: string; icon: any }[];
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
export default function sidebar() {
  const { data: session, status } = useSession({ required: true });

  const instituteInfo = useAppSelector((state) => state.institute);
  const dispatch = useAppDispatch();
  // console.log("useAppSelector", instituteInfo);
  // const [instituteInfo, setInstituteInfo] = useState<{
  //   institute_name: string;
  //   logo: string;
  //   institute_id: string;
  //   username: string;
  //   email: string;
  //   users: any[];
  //   courses: any[];
  //   rules: { [key: string]: boolean };
  //   institute_short_name: string;
  // }>({
  //   logo: "",
  //   institute_id: "",
  //   username: "",
  //   email: "",
  //   institute_name: "",
  //   users: [],
  //   courses: [],
  //   rules: {},
  //   institute_short_name: "",
  // });
  const [fetchingInfo, setFetchingInfo] = useState(true);
  // ======================================================
  // ======================================================
  const fetchInstituteInfo = async () => {
    setFetchingInfo(true);
    try {
      await axios
        .post("/api/auth/get-institute-info", {
          identifier: session?.user?.email,
        })
        .then((res) => {
          console.log("Institute Info Response:", res.data);
          // Set the institute info in Redux store
          dispatch(
            setInstituteInfo({
              logo: res.data.user.logo || "https://github.com/shadcn.png",
              institute_name: res.data.user.institute_name,
              institute_id: res.data.user._id,
              username: res.data.user.username,
              email: res.data.user.email,
              users: res.data.user.users,
              courses: res.data.user.courses,
              rules: res.data.user.rules,
              institute_short_name: res.data.user.institute_short_name,
            })
          );

          setFetchingInfo(false);
        });
    } catch (error) {
      console.error("Error fetching institute info:", error);
    }
  };
  // ======================================================
  // ======================================================
  useEffect(() => {
    if (!session) return;
    console.log(
      session.user?.email,
      session.user?.email === instituteInfo.email,
      instituteInfo.email
    );
    if (session.user?.email === instituteInfo.email) return;
    if (!!instituteInfo.email) {
      return;
    }
    const Promis = new Promise(async (resolve) => {
      await fetchInstituteInfo().then((result) => {
        resolve(result);
      });
    });
    toast.promise(Promis, {
      loading: "Loading institute info...",
      success: "Institute info loaded",
      error: "Error loading institute info",
    });
  }, [session]);
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

              <Button
                variant="destructive"
                className="my-auto gap-2 justify-evenly flex items-center"
              >
                Logout
                <LogOut />
              </Button>
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
            <AvatarImage src={instituteInfo.logo} />
            <AvatarFallback>
              <Skeleton className="size-full rounded-full" />
            </AvatarFallback>
          </Avatar>

          <h1>{instituteInfo.username}</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="">
        <ScrollArea className="h-full px-1 w-full rounded-md">
          {userNavigations.map((item) => (
            <SidebarGroup key={item.label}>
              <SidebarGroupLabel className="text-sm h-6 ">
                {item.label}
              </SidebarGroupLabel>
              <SidebarMenuSub>
                {item.navs_item.map((navItem) => (
                  <SidebarMenuSubItem key={navItem.title}>
                    <SidebarMenuButton
                      asChild
                      aria-disabled={
                        instituteInfo.rules.all_permissions
                          ? false
                          : instituteInfo.rules[navItem.id]
                          ? false
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
          ))}
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
                    <AvatarImage src={instituteInfo.logo} />
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
                    {instituteInfo.username}
                  </span>
                  <span className="text-muted-foreground truncate text-xs font-normal">
                    {instituteInfo.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BoltIcon
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    <span>Option 1</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Layers2Icon
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />

                    <span>Option 2</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BookOpenIcon
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    <span>Option 3</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogoutButton />
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
/**setFetchingInfo(true);
    const fetchInstituteInfo = async () => {
      try {
        const response = await axios
          .post("/api/auth/get-institute-info", {
            identifier: session?.user?.email,
          })
          .then((res) => {
            console.log("Institute Info Response:", res.data);
            if (res.data.success) {
              // setInstituteInfo({
              //   institute_name: res.data.user.institute_name,
              //   logo: res.data.user.logo,
              //   institute_id: res.data.user._id,
              //   username: res.data.user.username,
              //   email: res.data.user.email,
              //   users: res.data.user.users,
              //   courses: res.data.user.courses,
              //   rules: res.data.user.rules,
              //   institute_short_name: res.data.user.institute_short_name,
              // });
              dispatch(
                setInstituteInfo({
                  institute_name: res.data.user.institute_name,
                  logo: res.data.user.logo,
                  institute_id: res.data.user._id,
                  username: res.data.user.username,
                  email: res.data.user.email,
                  users: res.data.user.users,
                  courses: res.data.user.courses,
                  rules: res.data.user.rules,
                  institute_short_name: res.data.user.institute_short_name,
                })
              );
              setFetchingInfo(false);
            }
          });
      } catch (error) {
        console.error("Error fetching institute info:", error);
      }
    };
    if (!session) {
      // fetchInstituteInfo();
    } else {
      toast.info("Loading Session........");
    }**/
