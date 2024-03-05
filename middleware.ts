import { withMiddlewareAuthRequired ,getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// export default withMiddlewareAuthRequired( async function middleware (request:NextRequest) {
//   console.log("hello")
//   return NextResponse.redirect(new URL('/', request.url))
// });
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const user = await getSession(request, res);

  if(!user && !request.url.includes("/auth") ){
    return NextResponse.redirect(new URL('/auth', request.url))
  }
return res
}


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}