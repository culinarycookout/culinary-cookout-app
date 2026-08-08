import { NextResponse } from 'next/server';

// This middleware runs specifically on the trubble folder
export function middleware(request) {
  const url = request.nextUrl.clone();
  
  // Check if the user is trying to access the trubble area
  if (url.pathname.startsWith('/trubble')) {
    // Allow access to login and signup pages even if not logged in
    if (url.pathname === '/trubble/login' || url.pathname === '/trubble/signup') {
      return NextResponse.next();
    }

    // Check for the authentication cookie or token (Standard Next.js session logic placeholder)
    // Since we are using Supabase in the Client, we rely on the client check, 
    // but we set a server-side readable cookie here.
    const sessionCookie = request.cookies.get('sb-<YOUR-PROJECT-ID>-auth-token'); 
    
    // NOTE: Since you are using a custom client-side login with localStorage primarily,
    // we can't easily check localStorage in a server-side route.js file.
    // Instead, we will rely on the CLIENT-SIDE RouteGuard we will build shortly.
    // BUT, we use this middleware to ensure the user hits the server first.
    
    // For NOW, we pass everything through to the client, 
    // because the client side check is our main security wall.
    // If you want to hard block the route from the server before it loads:
    // We return NextResponse.next() to allow the page to load. The client-side guard will do the heavy lifting.
  }

  return NextResponse.next();
}

// Limit the middleware to only run on the trubble routes
export const config = {
  matcher: ['/trubble/:path*'],
};