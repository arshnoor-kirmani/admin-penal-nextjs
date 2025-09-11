import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log("Middleware  Token", token);
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    !token &&
    (url.pathname.startsWith("/dashboard") ||
      url.pathname === "/" ||
      url.pathname.startsWith("/verify"))
  ) {
    return NextResponse.redirect(
      new URL("/auth/create-institute-account", request.url)
    );
  }

  return NextResponse.next();
}
