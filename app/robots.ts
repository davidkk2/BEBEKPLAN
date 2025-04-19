import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/blog/",
          "/dogum-sayaci/",
          "/beslenme/",
          "/gelisim-takibi/",
          "/alisveris-listesi/",
          "/profil/",
          "/asistan/",
        ],
        disallow: ["/api/", "/admin/", "/private/", "/draft/", "/cache/", "/temp/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
    ],
    sitemap: "https://bebekplan.com/sitemap.xml",
  }
}
