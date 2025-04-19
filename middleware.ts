import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Korumalı rotalar
const protectedRoutes = ["/profil"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Korumalı bir rota ise ve auth cookie yoksa, giriş sayfasına yönlendir
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const authCookie = request.cookies.get("bebekplan_auth")

    if (!authCookie || !authCookie.value) {
      const url = new URL("/giris", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }

    try {
      // Cookie değerini parse et
      const userData = JSON.parse(authCookie.value)

      // Geçerli bir kullanıcı verisi yoksa, giriş sayfasına yönlendir
      if (!userData || !userData.id || !userData.email) {
        const url = new URL("/giris", request.url)
        url.searchParams.set("redirect", pathname)
        return NextResponse.redirect(url)
      }
    } catch (error) {
      console.error("Invalid auth cookie:", error)
      const url = new URL("/giris", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Middleware'in çalışacağı rotaları belirt
export const config = {
  matcher: ["/profil/:path*", "/alisveris-listesi/:path*", "/dogum-cantasi/:path*"],
}
