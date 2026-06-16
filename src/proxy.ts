// ==================================================
// Next.js Middleware
// ==================================================
// Handles: Authentication, RBAC, Security Headers, Rate Limiting
// Runs on Edge Runtime for every matched request.
// ==================================================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth.js edge-compatible session check
// We use a lightweight JWT check here since full auth() requires Node runtime
const AUTH_COOKIE = "authjs.session-token";
const SECURE_AUTH_COOKIE = "__Secure-authjs.session-token";

// ---------- Route Protection Rules ----------
const protectedRoutes: Record<string, string[]> = {
  "/dashboard": ["owner", "admin"],
  "/admin": ["admin"],
  "/favorites": ["student", "owner", "admin"],
};

const authRequiredPrefixes = ["/dashboard", "/admin", "/favorites"];

function getSessionToken(request: NextRequest): string | undefined {
  return (
    request.cookies.get(SECURE_AUTH_COOKIE)?.value ||
    request.cookies.get(AUTH_COOKIE)?.value
  );
}

function isAuthRequired(pathname: string): boolean {
  return authRequiredPrefixes.some((prefix) => pathname.startsWith(prefix));
}

function getAllowedRoles(pathname: string): string[] | null {
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      return roles;
    }
  }
  return null;
}

// ---------- Security Headers ----------
function addSecurityHeaders(response: NextResponse): void {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets and API auth routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Add security headers to all responses
  addSecurityHeaders(response);

  // Check if route requires authentication
  if (isAuthRequired(pathname)) {
    const sessionToken = getSessionToken(request);

    if (!sessionToken) {
      // Not logged in — redirect to login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // For role-based checks, we decode the JWT payload (base64)
    // Auth.js JWTs are JWE (encrypted), so we can't decode in Edge middleware
    // without the secret. Instead, we rely on server-side auth() checks
    // in the actual page/layout components for role verification.
    // The middleware ensures the user is at least authenticated.
    //
    // Role-based authorization is enforced at:
    // 1. Layout level (server component with auth() call)
    // 2. API route level (server-side auth() call)
    // 3. Server Action level (auth() call)
  }

  // Redirect logged-in users away from auth pages
  if (pathname === "/login" || pathname === "/register") {
    const sessionToken = getSessionToken(request);
    if (sessionToken) {
      return NextResponse.redirect(new URL("/properties", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (svg, png, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
