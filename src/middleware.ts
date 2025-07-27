// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest){
//     const token = request.cookies.get("token")?.value;
//     const { pathname } = request.nextUrl;
//     if(pathname.startsWith("/administrator/home")){
//         try {
//             const ValidToken = await fetch(`https://edugrant-express-server-production.up.railway.app/administrator/adminTokenAuthentication`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Cookie: `token=${token}`
//             },
//             body: JSON.stringify({})
//             });
//             if(ValidToken.status !== 200){
//                 console.log(ValidToken)
//                 return NextResponse.redirect(new URL("/administrator", request.url))
//             }
//             else{
//                 return NextResponse.next()
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

// export const config = {
//     matcher:"/administrator/home/:path*",
// }
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    // Redirect to appropriate login page if no token
    if (pathname.startsWith("/administrator/home")) {
      return NextResponse.redirect(new URL("/administrator", request.url));
    } else if (pathname.startsWith("/user/home")) {
      return NextResponse.redirect(new URL("/user/login", request.url)); // change if different
    }
  }

  try {
    if (pathname.startsWith("/administrator/home")) {
      const adminResponse = await fetch(
        "https://edugrant-express-server-production.up.railway.app/administrator/adminTokenAuthentication",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token}`,
          },
        }
      );

      if (adminResponse.status !== 200) {
        return NextResponse.redirect(new URL("/administrator", request.url));
      }
    } else if (pathname.startsWith("/user/home")) {
      const userResponse = await fetch(
        "https://edugrant-express-server-production.up.railway.app/user/tokenValidation",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token}`,
          },
        }
      );

      if (userResponse.status !== 200) {
        return NextResponse.redirect(new URL("/login", request.url)); // change if your login path is different
      }
    }

    return NextResponse.next(); // Token is valid
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, fallback to login pages
    if (pathname.startsWith("/administrator/home")) {
      return NextResponse.redirect(new URL("/administrator", request.url));
    } else if (pathname.startsWith("/user/home")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/administrator/home/:path*", "/user/home/:path*"],
};
