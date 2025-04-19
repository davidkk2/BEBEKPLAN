"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Sayfa değiştiğinde sayfanın en üstüne scroll yap
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
