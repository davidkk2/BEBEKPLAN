"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AdSenseAdProps {
  slot: string
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal"
  style?: React.CSSProperties
  responsive?: boolean
  className?: string
}

export default function AdSenseAd({
  slot,
  format = "auto",
  style = {},
  responsive = true,
  className = "",
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const adsbygoogle = window.adsbygoogle || []
      adsbygoogle.push({})
    } catch (err) {
      console.error("AdSense error:", err)
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          overflow: "hidden",
          ...style,
        }}
        data-ad-client="ca-pub-1849993013741154"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      ></ins>
    </div>
  )
}
