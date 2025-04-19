"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface AdDisplayProps {
  adSlot?: string
  adFormat?: string
  className?: string
  style?: React.CSSProperties
}

export default function AdDisplay({
  adSlot = "7340816851",
  adFormat = "auto",
  className = "",
  style = {},
}: AdDisplayProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [isAdInitialized, setIsAdInitialized] = useState(false)

  useEffect(() => {
    // Reklamı yalnızca bir kez başlat
    if (isAdInitialized) return

    try {
      // Sayfa tamamen yüklendiğinde reklamı başlat
      const pushAd = () => {
        if (adRef.current && typeof window !== "undefined" && window.adsbygoogle) {
          // Eğer bu element zaten bir reklam içeriyorsa, atla
          if (adRef.current.querySelector('ins.adsbygoogle[data-adsbygoogle-status="done"]')) {
            return
          }

          const adElement = document.createElement("ins")
          adElement.className = "adsbygoogle"
          adElement.style.display = "block"
          adElement.setAttribute("data-ad-client", "ca-pub-1849993013741154")
          adElement.setAttribute("data-ad-slot", adSlot)
          adElement.setAttribute("data-ad-format", adFormat)
          adElement.setAttribute("data-full-width-responsive", "true")

          // Mevcut içeriği temizle ve yeni reklam ekle
          if (adRef.current) {
            adRef.current.innerHTML = ""
            adRef.current.appendChild(adElement)

            try {
              ;(window.adsbygoogle = window.adsbygoogle || []).push({})
              console.log("Reklam başlatıldı:", adSlot)
              setIsAdInitialized(true)
            } catch (e) {
              console.error("Reklam başlatma hatası:", e)
            }
          }
        }
      }

      // Sayfa tamamen yüklendiğinde reklamları başlat
      if (document.readyState === "complete") {
        pushAd()
      } else {
        window.addEventListener("load", pushAd)
        return () => window.removeEventListener("load", pushAd)
      }
    } catch (e) {
      console.error("AdDisplay hatası:", e)
    }
  }, [adSlot, adFormat, isAdInitialized])

  return (
    <div className={`ad-container ${className}`} style={style}>
      <div className="text-xs text-gray-500 text-center mb-1">Reklam</div>
      <div ref={adRef} className="ad-slot"></div>
    </div>
  )
}
