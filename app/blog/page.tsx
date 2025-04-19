import type { Metadata } from "next"
import BlogList from "@/components/blog/blog-list"
import { getAllBlogPosts } from "@/lib/blog-posts"

export const metadata: Metadata = {
  title: "Blog | BebekPlan",
  description: "Hamilelik ve bebek gelişimi hakkında uzman yazıları, ipuçları ve bilgiler.",
}

export default function BlogPage() {
  // Server component fetches data
  const posts = getAllBlogPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog</h1>
      <BlogList posts={posts} />
    </div>
  )
}
