"use client"

import { useEffect, useState } from "react"

interface BlogContentRendererProps {
  content: string
}

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Process images for better rendering
    const processImages = () => {
      try {
        const contentDiv = document.querySelector(".blog-content")
        if (!contentDiv) return

        const images = contentDiv.querySelectorAll("img")
        images.forEach((img) => {
          if (!img || !img.parentNode) return

          // Add responsive classes
          img.classList.add("w-full", "rounded-lg", "my-4")

          // Create a wrapper for the image to maintain aspect ratio
          const wrapper = document.createElement("div")
          wrapper.classList.add("relative", "w-full", "h-auto", "min-h-[300px]", "my-6")

          // Replace the image with a Next.js Image component
          const imgSrc = img.getAttribute("src") || "/placeholder.svg"
          const imgAlt = img.getAttribute("alt") || "Blog görseli"

          // Create a placeholder until the image loads
          wrapper.innerHTML = `
            <div class="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
          `

          // Replace the original img with the wrapper
          if (img.parentNode) {
            img.parentNode.replaceChild(wrapper, img)
          }

          // Load the image with Next.js Image (client-side)
          const imgElement = new Image()
          imgElement.onload = () => {
            if (!imgElement || !wrapper) return

            wrapper.innerHTML = ""
            const aspectRatio = imgElement.height / imgElement.width
            wrapper.style.paddingBottom = `${aspectRatio * 100}%`

            const nextImage = document.createElement("img")
            nextImage.src = imgSrc
            nextImage.alt = imgAlt
            nextImage.classList.add("rounded-lg", "object-cover", "w-full", "h-full")
            wrapper.appendChild(nextImage)
          }
          imgElement.onerror = () => {
            if (!wrapper) return
            wrapper.innerHTML = `
              <div class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p class="text-gray-500 dark:text-gray-400">Görsel yüklenemedi</p>
              </div>
            `
          }
          imgElement.src = imgSrc
        })
      } catch (error) {
        console.error("Error processing images:", error)
      }
    }

    if (mounted) {
      // Delay processing to ensure content is fully rendered
      setTimeout(() => {
        processImages()
      }, 100)
    }

    return () => {
      // Cleanup if needed
    }
  }, [mounted, content])

  if (!mounted) {
    return <div className="animate-pulse bg-gray-100 dark:bg-gray-800 h-96 rounded-lg"></div>
  }

  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none blog-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
