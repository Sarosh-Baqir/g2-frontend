import { NextResponse } from "next/server";
// middleware runs when request is sent to server but before reaching api or route handler and check if email and password or empty or not
export function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log(pathname);

  if (pathname === "/signup") {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "something went wrong" },
        { status: 400 }
      );
    }
    // Additional validation checks (like email format) can be added here
  }

  return NextResponse.next();
}

// Apply middleware only to the login route
export const config = {
  matcher: ["/signup"],
};
