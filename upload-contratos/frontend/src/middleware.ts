import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isPrivateRoute =
    request.nextUrl.pathname.startsWith("/contracts") ||
    request.nextUrl.pathname.startsWith("/upload");

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/contracts/:path*", "/upload/:path*"],
};
