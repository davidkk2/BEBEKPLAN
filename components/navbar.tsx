"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/constants"
import { Menu, X, MessageSquare, ShoppingCart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "@/components/logo"
import { useAuth } from "@/lib/context/auth-context"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  // Scroll olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm" : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Masaüstü Navigasyon */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === link.path
                    ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40"
                    : "text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                } ${link.highlight ? "relative" : ""}`}
              >
                {link.name}
                {link.highlight && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Sağ Taraf Butonlar */}
          <div className="flex items-center space-x-2">
            {/* Asistan Butonu */}
            <Button asChild variant="ghost" size="icon" className="hidden sm:flex">
              <Link href="/asistan">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Asistan</span>
              </Link>
            </Button>

            {/* Alışveriş Listesi Butonu */}
            <Button asChild variant="ghost" size="icon" className="hidden sm:flex">
              <Link href="/alisveris-listesi">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Alışveriş Listesi</span>
              </Link>
            </Button>

            {/* Tema Değiştirici */}
            <ThemeToggle />

            {/* Giriş/Profil Butonu */}
            {isAuthenticated ? (
              <Button asChild variant="default" size="sm" className="hidden md:flex">
                <Link href="/profil">Profilim</Link>
              </Button>
            ) : (
              <Button asChild variant="default" size="sm" className="hidden md:flex">
                <Link href="/giris">Giriş Yap</Link>
              </Button>
            )}

            {/* Mobil Menü Butonu */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menü</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container mx-auto px-4 pb-3">
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === link.path
                      ? "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40"
                      : "text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                  {link.highlight && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-pink-100 dark:bg-pink-900/30 px-2 py-0.5 text-xs font-medium text-pink-800 dark:text-pink-300">
                      Yeni
                    </span>
                  )}
                </Link>
              ))}

              <Link
                href="/asistan"
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                onClick={() => setIsMenuOpen(false)}
              >
                Asistan
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/profil"
                    className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profilim
                  </Link>
                  <button
                    className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 text-left"
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <Link
                  href="/giris"
                  className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-white bg-pink-500 hover:bg-pink-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
