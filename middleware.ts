import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Protect all /user/** routes
  if (pathname.startsWith("/user") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //if token then disallow login and register routes
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
