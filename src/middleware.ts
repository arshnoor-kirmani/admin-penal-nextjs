import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (
    !token &&
    (url.pathname.startsWith("/admin") || url.pathname === "/student")
  ) {
    return NextResponse.redirect(new URL("/auth/institute-login", request.url));
  }

  return NextResponse.next();
}
