import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes and their required roles
const protectedRoutes = {
  '/dashboard': ['student', 'teacher', 'admin'],
  '/admin/dashboard': ['admin'],
  '/teacher/dashboard': ['teacher', 'admin'],
  '/student/dashboard': ['student', 'teacher', 'admin'],
  '/courses': ['student', 'teacher', 'admin'],
  '/students': ['teacher', 'admin'],
  '/assignments': ['student', 'teacher', 'admin'],
  '/analytics': ['admin'],
  '/users': ['admin'],
  '/settings': ['student', 'teacher', 'admin'],
  '/profile': ['student', 'teacher', 'admin']
}

// Define public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/', '/api/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is public
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if the route is protected
  const isProtectedRoute = Object.keys(protectedRoutes).some(route => 
    pathname.startsWith(route)
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Get auth token from cookies
  const authToken = request.cookies.get('auth-token')?.value

  // If no token, redirect to login
  if (!authToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // For demo purposes, we'll simulate role detection from token
  // In a real app, you would decode and validate the JWT token
  let userRole = 'student' // default role
  
  // Simulate role detection (in real app, decode JWT)
  if (authToken.includes('admin')) {
    userRole = 'admin'
  } else if (authToken.includes('teacher')) {
    userRole = 'teacher'
  }

  // Check if user has required role for the route
  const requiredRoles = protectedRoutes[pathname as keyof typeof protectedRoutes] || []
  
  if (requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
    // User doesn't have required role, redirect to unauthorized page with error message
    const unauthorizedUrl = new URL('/unauthorized', request.url)
    unauthorizedUrl.searchParams.set('from', pathname)
    unauthorizedUrl.searchParams.set('requiredRoles', requiredRoles.join(','))
    unauthorizedUrl.searchParams.set('userRole', userRole)
    return NextResponse.redirect(unauthorizedUrl)
  }

  // Add user role to headers for use in components
  const response = NextResponse.next()
  response.headers.set('x-user-role', userRole)
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
