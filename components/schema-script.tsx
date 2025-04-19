"use client"

import Script from "next/script"

interface SchemaScriptProps {
  data: Record<string, any>
}

export default function SchemaScript({ data }: SchemaScriptProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  )
}
