import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const PUBLIC_PATHS = ['/sign-in', '/sign-up'];
  const isPublic = PUBLIC_PATHS.includes(pathname);

  const token = request.cookies.get("token")?.value

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  }

  return NextResponse.next({
    headers: {
      'is-public': `${isPublic}`
    }
  });
}

export const config = {
  matcher: ['/((?!_next|api|static).*)'],
};