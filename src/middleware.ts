import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const middleware = auth((req) => {
  const isAuthRoute = req.nextUrl.pathname.includes("/dashboard");

  if (isAuthRoute && !req.auth) {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  if (
    (req.nextUrl.pathname.includes("/sign-up") ||
      req.nextUrl.pathname.includes("/sign-in")) &&
    req.auth
  ) {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }

  return NextResponse.next();
});

// const intlMiddleware = createMiddleware({
//   locales,
//   defaultLocale: "ar",
//   localeDetection: false,
// });

// const authMiddleware = auth((req) => {
//   if (req.nextUrl.pathname.includes("/dashboard") && !req.auth) {
//     return NextResponse.redirect(new URL("/", req.nextUrl).toString());
//   }

//   if (
//     (req.nextUrl.pathname.includes("/sign-up") ||
//       req.nextUrl.pathname.includes("/sign-in")) &&
//     req.auth
//   ) {
//     return NextResponse.redirect(new URL("/", req.nextUrl).toString());
//   }

//   if (
//     req.nextUrl.pathname.includes("/dashboard") &&
//     req.auth?.user.role === "USER"
//   ) {
//     return NextResponse.redirect(new URL("/", req.nextUrl).toString());
//   }

//   if (!req.auth && req.nextUrl.pathname.includes("/orders")) {
//     return NextResponse.redirect(new URL("/", req.nextUrl).toString());
//   }

//   if (
//     req.auth &&
//     (req.auth.user.role === "ACCOUNTANT" || req.auth.user.role === "CHEF") &&
//     (req.nextUrl.pathname.includes("/dashboard/products") ||
//       req.nextUrl.pathname.includes(
//         "/dashboard/categories" ||
//           req.nextUrl.pathname.includes("/dashboard/users")
//       ))
//   ) {
//     return NextResponse.redirect(
//       new URL("/dashboard/orders", req.nextUrl).toString()
//     );
//   }

//   if (
//     req.auth &&
//     req.auth.user.role === "MANAGER" &&
//     req.nextUrl.pathname.includes("/dashboard/users")
//   ) {
//     return NextResponse.redirect(
//       new URL("/dashboard/products", req.nextUrl).toString()
//     );
//   }

//   return intlMiddleware(req);
// });

// export default function middleware(req: NextRequest) {
//   const publicPathnameRegex = RegExp(
//     `^(/(${locales.join("|")}))?(${publicPages
//       .flatMap((p) => (p === "/" ? ["", "/"] : p))
//       .join("|")})/?$`,
//     "i"
//   );
//   const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

//   if (isPublicPage) {
//     return intlMiddleware(req);
//   } else {
//     return authMiddleware(req, {});
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };
