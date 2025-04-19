"use client"

import type { BlogPost } from "@/lib/blog-posts"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Icons } from "@/components/ui-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import BlogContentRenderer from "./blog-content-renderer"

const { Calendar, Check, Share } = Icons

interface BlogPostViewProps {
  post: BlogPost
}

export default function BlogPostView({ post }: BlogPostViewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !post) {
    return <div className="container mx-auto px-4 py-8 max-w-4xl">Yükleniyor...</div>
  }

  // Safely access author properties
  const authorName = post.author?.name || "Anonim"
  const authorTitle = post.author?.title || ""
  const authorAvatar = post.author?.avatar || ""
  const authorInitial = authorName ? authorName.charAt(0) : "A"

  // Safely format date
  const formattedDate = post.publishedAt ? formatDate(post.publishedAt) : ""

  // Safely access reading time
  const readingTime =
    typeof post.readingTime === "number"
      ? post.readingTime
      : typeof post.readingTime === "string"
        ? Number.parseInt(post.readingTime, 10)
        : 5

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 mb-6"
      >
        <span className="mr-2">←</span>
        Tüm Yazılar
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              {authorAvatar ? (
                <Image
                  src={authorAvatar || "/placeholder.svg"}
                  alt={authorName}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <span className="text-lg font-bold">{authorInitial}</span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{authorName}</p>
              {authorTitle && <p className="text-xs text-gray-500 dark:text-gray-400">{authorTitle}</p>}
            </div>
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            {Calendar ? <Calendar className="mr-1 h-4 w-4" /> : <span className="mr-1">📅</span>}
            {formattedDate}
          </div>

          <Separator orientation="vertical" className="h-6" />

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-1">⏱️</span>
            {readingTime} dk okuma
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags &&
            post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/etiket/${tag}`}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors"
              >
                #{tag}
              </Link>
            ))}
        </div>
      </header>

      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.image || `/placeholder.svg?height=800&width=1200`}
          alt={post.imageAlt || post.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=800&width=1200"
          }}
        />
      </div>

      {post.content ? <BlogContentRenderer content={post.content} /> : <p>İçerik bulunamadı.</p>}

      {post.didYouKnow && post.didYouKnow.length > 0 && (
        <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center text-blue-700 dark:text-blue-300">
              <span className="mr-2">💡</span>
              Biliyor muydunuz?
            </h3>
            <ul className="space-y-2">
              {post.didYouKnow.map((fact, index) => (
                <li key={index} className="flex items-start">
                  {Check ? (
                    <Check className="mr-2 h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <span className="mr-2 text-green-500">✓</span>
                  )}
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {post.factOrMyth && post.factOrMyth.length > 0 && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Doğru mu, Yanlış mı?</h3>
            <div className="space-y-4">
              {post.factOrMyth.map((item, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                  <p className="font-medium mb-2">{item.statement}</p>
                  <div
                    className={`flex items-center ${item.isTrue ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"} mb-2`}
                  >
                    <span className="mr-2">{item.isTrue ? "✓" : "✗"}</span>
                    <span className="font-medium">{item.isTrue ? "Doğru" : "Yanlış"}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.explanation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-bold mb-1">Bu yazıyı beğendiniz mi?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Arkadaşlarınızla paylaşın</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <span className="mr-2">📱</span>
            Paylaş
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <span className="mr-2">🐦</span>
            Tweet
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <span className="mr-2">🔗</span>
            Kopyala
          </Button>
        </div>
      </div>
    </article>
  )
}
