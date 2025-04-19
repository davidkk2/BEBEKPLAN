"use client"

import { useEffect } from "react"

export function PerformanceMetrics() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return

    // Report Web Vitals
    const reportWebVitals = async () => {
      const { onCLS, onFID, onLCP, onTTFB } = await import("web-vitals")

      const sendToAnalytics = ({ name, delta, id }: { name: string; delta: number; id: string }) => {
        // This would normally send to your analytics service
        console.log({ name, delta, id })

        // Example of sending to Google Analytics
        if (typeof window.gtag === "function") {
          window.gtag("event", name, {
            event_category: "Web Vitals",
            event_label: id,
            value: Math.round(name === "CLS" ? delta * 1000 : delta),
            non_interaction: true,
          })
        }
      }

      onCLS(sendToAnalytics)
      onFID(sendToAnalytics)
      onLCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
    }

    reportWebVitals()
  }, [])

  return null
}

// Add this to your global types file
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
