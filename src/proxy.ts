import {NextRequest, NextResponse} from "next/server";
import {match} from "path-to-regexp";

const currentPathMatchesRoute = (currentPath: string, paths: string[]): boolean => {
    let result = false
    paths.forEach(path => {
        const matcherFunction = match(path);
        if (matcherFunction(currentPath) !== false) {result = true}
    })
    return result
}

export const config = {
    matcher: ['/detail/:path*', '/regions', "/", "/login"]
}

const protectedRoutes = ['/detail/:id', '/regions', "/"]
const authRoutes = [config.matcher[3]]

export function proxy(request: NextRequest) {
    const userIsAuthenticated = request.cookies.get('user_is_authenticated')
    if(currentPathMatchesRoute(request.nextUrl.pathname, protectedRoutes) && !userIsAuthenticated) {
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete('user_is_authenticated')
        return response
    }
    if(currentPathMatchesRoute(request.nextUrl.pathname, authRoutes) && userIsAuthenticated) {
        return NextResponse.redirect(new URL("/regions", request.url))
    }
}



