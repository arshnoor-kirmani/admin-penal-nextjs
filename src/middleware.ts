import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  // console.log("User Type=", token);
  if (
    !token &&
    (url.pathname.startsWith("/admin") ||
      url.pathname.startsWith("/student") ||
      url.pathname.startsWith("/teacher"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // Institute
  if (
    token?.user_type === "institute" &&
    (url.pathname.startsWith("/student") || url.pathname.startsWith("/teacher"))
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  // Student
  if (
    token?.user_type === "student" &&
    (url.pathname.startsWith("/admin") || url.pathname.startsWith("/teacher"))
  ) {
    return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }
  // Teacher
  if (
    token?.user_type === "teacher" &&
    (url.pathname.startsWith("/admin") || url.pathname.startsWith("/student"))
  ) {
    return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
  }
  return NextResponse.next();
}
