import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest){
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;
    if(pathname.startsWith("/administrator/home")){
        try {
            const ValidToken = await fetch(`https://edugrant-express-server-production.up.railway.app/administrator/adminTokenAuthentication`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `token=${token}`, // Forward user's cookies
            },
            body: JSON.stringify({})
            });
            if(ValidToken.status !== 200){
                console.log(ValidToken)
                return NextResponse.redirect(new URL("/administrator", request.url))
            }
            else{
                return NextResponse.next()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const config = {
    matcher:"/administrator/home/:path*",
}