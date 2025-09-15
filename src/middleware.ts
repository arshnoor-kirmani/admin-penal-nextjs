import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log("Middleware  Token", token);
  const url = request.nextUrl;
  if (token && url.pathname.startsWith("/"))
    return NextResponse.redirect(new URL("/dashboard", request.url));
  if (
    !token &&
    (url.pathname.startsWith("/dashboard") || url.pathname === "/")
  ) {
    return NextResponse.redirect(
      new URL("/auth/institute-account-login", request.url)
    );
  }

  return NextResponse.next();
}
