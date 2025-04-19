import type { BlogPost } from "@/lib/blog-posts"

export function BlogPostSchema(post: BlogPost) {
  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://bebekplan.com/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "BebekPlan",
      logo: {
        "@type": "ImageObject",
        url: "https://bebekplan.com/logo.png",
      },
    },
    image: post.image,
    keywords: post.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bebekplan.com/blog/${post.slug}`,
    },
  }
}
