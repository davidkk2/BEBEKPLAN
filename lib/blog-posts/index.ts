import { blogPost1 } from "./hamilelikte-beslenme-rehberi"
import { blogPost2 } from "./bebek-uyku-duzenini-saglamanin-yollari"
import { blogPost3 } from "./dogum-sonrasi-depresyon"
import { blogPost4 } from "./emzirme-teknikleri"
import { blogPost5 } from "./bebeklerde-asi-takvimi"
import { blogPost6 } from "./hamilelikte-egzersiz"
import { blogPost7 } from "./dr-harvey-karp-bebek-sakinlestirme"

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar?: string
    title?: string
  }
  publishedAt: string
  readingTime: number
  category: string
  tags: string[]
  image: string
  imageAlt?: string
  featured?: boolean
  didYouKnow?: string[]
  factOrMyth?: Array<{
    statement: string
    isTrue: boolean
    explanation: string
  }>
  quiz?: {
    title: string
    questions: Array<{
      id: string
      question: string
      options: string[]
      correctAnswer: number
      explanation: string
    }>
  }
}

// getImageUrl fonksiyonunu daha güvenli hale getirelim
export function getImageUrl(path: string): string {
  // path null veya undefined ise placeholder döndür
  if (!path) {
    return "/placeholder.svg?height=400&width=600"
  }

  // Eğer path zaten http veya https ile başlıyorsa, doğrudan döndür
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  // Eğer path placeholder.svg ile başlıyorsa, doğrudan döndür
  if (path.startsWith("/placeholder.svg")) {
    return path
  }

  // Aksi takdirde, public klasöründen yolu düzelt
  return `/images/${path.split("/").pop()}`
}

// Yazar bilgisini standartlaştıran yardımcı fonksiyon
function standardizeAuthor(author: any): { name: string; avatar?: string; title?: string } {
  if (!author) {
    return { name: "Anonim" }
  }

  if (typeof author === "string") {
    return {
      name: author,
    }
  }

  return {
    name: author.name || "Anonim",
    avatar: author.avatar || undefined,
    title: author.title || undefined,
  }
}

// Blog yazılarını standartlaştıran fonksiyon
function standardizeBlogPost(post: any): BlogPost {
  if (!post) {
    console.error("Null or undefined blog post encountered")
    return {
      id: `post-${Math.random().toString(36).substr(2, 9)}`,
      slug: "error-post",
      title: "Hata Oluştu",
      excerpt: "Bu içerik yüklenirken bir hata oluştu.",
      content: "<p>İçerik yüklenirken bir hata oluştu.</p>",
      author: { name: "Sistem" },
      publishedAt: new Date().toISOString(),
      readingTime: 1,
      category: "Genel",
      tags: [],
      image: "/placeholder.svg?height=400&width=600",
    }
  }

  // Convert readingTime to a number if it's a string
  let readingTime = post.readingTime
  if (typeof readingTime === "string") {
    // Extract the number from strings like "10 dakika"
    const match = readingTime.match(/(\d+)/)
    readingTime = match ? Number.parseInt(match[1], 10) : 5
  }

  // Ensure publishedAt is a valid date string
  let publishedAt = post.publishedAt || post.date
  if (!publishedAt) {
    publishedAt = new Date().toISOString()
  } else if (!(publishedAt instanceof Date) && typeof publishedAt === "string" && !publishedAt.includes("T")) {
    // Convert YYYY-MM-DD to YYYY-MM-DDT00:00:00Z
    publishedAt = new Date(publishedAt).toISOString()
  }

  return {
    id: post.id || `post-${Math.random().toString(36).substr(2, 9)}`,
    slug: post.slug || "",
    title: post.title || "Başlıksız Yazı",
    excerpt: post.excerpt || "",
    content: post.content || "",
    author: standardizeAuthor(post.author),
    publishedAt: publishedAt,
    readingTime: readingTime || 5,
    category: post.category || "Genel",
    tags: Array.isArray(post.tags) ? post.tags : [],
    image: getImageUrl(post.image),
    imageAlt: post.imageAlt,
    featured: post.featured || false,
    didYouKnow: Array.isArray(post.didYouKnow) ? post.didYouKnow : undefined,
    factOrMyth: Array.isArray(post.factOrMyth) ? post.factOrMyth : undefined,
    quiz: post.quiz || undefined,
  }
}

// blogPosts dizisini oluştururken her bir post için standartlaştırma yapalım
export const blogPosts: BlogPost[] = [
  standardizeBlogPost(blogPost1),
  standardizeBlogPost(blogPost2),
  standardizeBlogPost(blogPost3),
  standardizeBlogPost(blogPost4),
  standardizeBlogPost(blogPost5),
  standardizeBlogPost(blogPost6),
  standardizeBlogPost(blogPost7),
].filter(Boolean) // Remove any null/undefined posts

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag))
}

export function getAllPosts(): BlogPost[] {
  return blogPosts
}
