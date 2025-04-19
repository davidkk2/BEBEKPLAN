import type { Metadata } from "next"

interface GenerateMetadataParams {
  title: string
  description: string
  keywords?: string[]
  image?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
  canonical?: string
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = "/images/og-image.png",
  type = "website",
  publishedTime,
  modifiedTime,
  authors = ["BebekPlan"],
  section,
  tags = [],
  canonical,
}: GenerateMetadataParams): Metadata {
  const baseUrl = "https://bebekplan.com"
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined

  return {
    title,
    description,
    keywords: [
      "hamilelik",
      "bebek gelişimi",
      "doğum sayacı",
      "hamilelik takibi",
      "bebek bakımı",
      "anne sağlığı",
      ...keywords,
    ],
    authors: authors.map((author) => ({ name: author })),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "tr-TR": canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "BebekPlan",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "tr_TR",
      type,
      ...(type === "article" && {
        article: {
          publishedTime,
          modifiedTime,
          authors,
          section,
          tags,
        },
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  }
}
