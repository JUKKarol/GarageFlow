import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {

  const token = req.cookies.get("token")?.value; 

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userRolesString = req.cookies.get("userRoles")?.value || '[]';
  
  try {
    const roles = JSON.parse(userRolesString);

    const requiredRoles = ["Admin", "Employee"];
    const hasAccess = roles.some((role: string) => requiredRoles.includes(role));

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*", 
};