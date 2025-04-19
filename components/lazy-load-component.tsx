"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface LazyLoadComponentProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
}

export function LazyLoadComponent({ children, threshold = 0.1, rootMargin = "200px 0px" }: LazyLoadComponentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(ref)

    return () => {
      if (ref) observer.unobserve(ref)
    }
  }, [ref, threshold, rootMargin])

  return (
    <div ref={setRef} className="min-h-[20px]">
      {isVisible ? children : null}
    </div>
  )
}
