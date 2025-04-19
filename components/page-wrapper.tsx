"use client"

import type { ReactNode } from "react"
import AdSenseAd from "./adsense-ad"

interface PageWrapperProps {
  children: ReactNode
  showAds?: boolean
}

export default function PageWrapper({ children, showAds = true }: PageWrapperProps) {
  return (
    <div className="page-wrapper">
      {showAds && (
        <div className="mb-6">
          <AdSenseAd slot="1234567890" format="auto" />
        </div>
      )}

      {children}

      {showAds && (
        <div className="mt-6">
          <AdSenseAd slot="0987654321" format="auto" />
        </div>
      )}
    </div>
  )
}
