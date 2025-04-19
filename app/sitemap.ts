import type { MetadataRoute } from "next"
import { getAllBlogPosts } from "@/lib/blog-posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bebekplan.com"
  const blogPosts = getAllBlogPosts()

  // Ana sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gelisim-takibi`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dogum-sayaci`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/beslenme`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/asistan`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/profil`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ] as MetadataRoute.Sitemap

  // Blog yazıları - Geçersiz tarih değerlerini ele alalım
  const blogSitemap = blogPosts.map((post) => {
    // Geçerli bir tarih oluşturmak için try-catch bloğu kullanıyoruz
    let lastModified: Date
    try {
      lastModified = new Date(post.publishedAt)
      // Geçerli bir tarih olup olmadığını kontrol edelim
      if (isNaN(lastModified.getTime())) {
        // Geçersiz tarih, şu anki tarihi kullan
        lastModified = new Date()
      }
    } catch (error) {
      // Hata durumunda şu anki tarihi kullan
      lastModified = new Date()
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: post.featured ? 0.8 : 0.6,
    }
  }) as MetadataRoute.Sitemap

  return [...staticPages, ...blogSitemap]
}
