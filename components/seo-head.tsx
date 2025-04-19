import Head from "next/head"

interface SEOHeadProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: "website" | "article"
}

export function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = "/images/og-image.png",
  ogType = "website",
}: SEOHeadProps) {
  const fullTitle = `${title} | BebekPlan`
  const fullCanonicalUrl = canonicalUrl ? `https://bebekplan.com${canonicalUrl}` : "https://bebekplan.com"
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `https://bebekplan.com${ogImage}`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />

      {/* Canonical Link */}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullOgImage} />
    </Head>
  )
}
