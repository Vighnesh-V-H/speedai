import { NextResponse, type NextRequest } from "next/server";
import {
  authRoutes,
  publicRoutes,
  privateRoutes,
  DEFAULT_AUTH_REDIRECT,
  SIGN_IN_ROUTE,
} from "@/lib/routes";

const SESSION_COOKIE_NAME = "session_token";

const matchesRoute = (pathname: string, routes: string[]): boolean => {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
};

const hasActiveSession = (request: NextRequest): boolean => {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  return Boolean(sessionCookie && sessionCookie.trim().length > 0);
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isAuthRoute = matchesRoute(pathname, authRoutes);
  const isPublicRoute = matchesRoute(pathname, publicRoutes);
  const isPrivateRoute = matchesRoute(pathname, privateRoutes);
  const requiresAuth = isPrivateRoute || (!isPublicRoute && !isAuthRoute);

  const shouldValidateAuth = isAuthRoute || requiresAuth;
  const isLoggedIn = shouldValidateAuth ? hasActiveSession(request) : false;

  if (isAuthRoute && isLoggedIn) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = DEFAULT_AUTH_REDIRECT;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  if (requiresAuth && !isLoggedIn) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = SIGN_IN_ROUTE;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/(.*)"],
};
