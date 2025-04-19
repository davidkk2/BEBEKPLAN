"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function OptimizedImage({ src, alt, width, height, className, priority = false }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoaded(false)
    setError(false)
  }, [src])

  // Default dimensions if not provided
  const imgWidth = width || 800
  const imgHeight = height || 600

  return (
    <div className={`relative ${className || ""}`}>
      {!isLoaded && !error && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"
          style={{ width: imgWidth, height: imgHeight }}
          aria-hidden="true"
        />
      )}

      {error ? (
        <div
          className="flex items-center justify-center bg-gray-100 text-gray-500"
          style={{ width: imgWidth, height: imgHeight }}
        >
          Görsel yüklenemedi
        </div>
      ) : (
        <Image
          src={src || `/placeholder.svg?height=${imgWidth}&width=${imgHeight}`}
          alt={alt}
          width={imgWidth}
          height={imgHeight}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            console.error(`Failed to load image: ${src}`)
            setError(true)
          }}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
      )}
    </div>
  )
}
