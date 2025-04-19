"use client"

import { useEffect } from "react"

interface AdSenseInlineProps {
  slot: string
  format?: "auto" | "fluid"
  className?: string
}

export default function AdSenseInline({ slot, format = "fluid", className = "" }: AdSenseInlineProps) {
  useEffect(() => {
    try {
      const adsbygoogle = window.adsbygoogle || []
      adsbygoogle.push({})
    } catch (err) {
      console.error("AdSense error:", err)
    }
  }, [])

  return (
    <div className={`adsense-inline ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format={format}
        data-ad-client="ca-pub-1849993013741154"
        data-ad-slot={slot}
      ></ins>
    </div>
  )
}
