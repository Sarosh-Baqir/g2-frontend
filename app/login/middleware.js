import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === "/login") {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Additional validation checks (like email format) can be added here
  }

  return NextResponse.next();
}

// Apply middleware only to the login route
export const config = {
  matcher: ["/login"],
};
