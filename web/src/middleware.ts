import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {

  const token = req.cookies.get("token"); 
  const userRoles = req.cookies.get("userRoles"); 

  if (!token || !userRoles) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const roles = JSON.parse(userRoles?.value || '[]');

  const requiredRoles = ["Admin", "Employee"];
  const hasAccess = roles.some((role: string) => requiredRoles.includes(role));

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/", req.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*", 
};
