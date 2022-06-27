import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET }) //Exists with login
  const { pathname, origin } = req.nextUrl

  if (pathname.includes('/api/auth') || token) {
    //Allow if next-auth session || token exists
    return NextResponse.next()
  }

  if (!token && pathname !== '/login') {
    //Redirect if no token
    return NextResponse.redirect(`${origin}/login`)
  }
}
