import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getBlogPostsByTag } from "@/lib/blog-posts"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react"

export default function BlogTagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const posts = getBlogPostsByTag(tag)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Blog Ana Sayfasına Dön
            </Link>
          </Button>
        </div>

        <div className="text-center mb-12">
          <Badge className="mb-4 px-3 py-1 text-base bg-pink-500">{tag}</Badge>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">"{tag}" Etiketli Yazılar</h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl max-w-[700px] mx-auto">
            Bu etiketle ilgili tüm blog yazılarımızı keşfedin
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden h-full flex flex-col">
                <div className="relative h-40 w-full">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover w-full h-full" />
                  <Badge className="absolute top-3 right-3 bg-pink-500">{post.category}</Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-pink-500 transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center text-xs gap-4 mt-2">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(post.publishedAt), "d MMM yyyy", { locale: tr })}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readingTime} dk
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button asChild variant="ghost" size="sm" className="text-pink-500 hover:text-pink-600 ml-auto">
                    <Link href={`/blog/${post.slug}`}>Devamını Oku</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Tag className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">Bu etiketle ilgili yazı bulunamadı</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              Üzgünüz, "{tag}" etiketiyle ilgili blog yazısı bulunamadı. Lütfen başka bir etiket deneyin.
            </p>
            <Button asChild>
              <Link href="/blog">Blog Ana Sayfasına Dön</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
