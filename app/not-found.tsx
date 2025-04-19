import Link from "next/link"

export const metadata = {
  title: "Sayfa Bulunamadı | BebekPlan",
  description: "Aradığınız sayfa bulunamadı. Ana sayfaya dönün veya diğer içerikleri keşfedin.",
}

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <div className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-6">404</div>
      <h1 className="text-4xl font-bold mb-4">Sayfa Bulunamadı</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönün veya diğer içerikleri keşfedin.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">
          Ana Sayfaya Dön
        </Link>
        <Link
          href="/blog"
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Blog Yazılarını Keşfet
        </Link>
      </div>
    </div>
  )
}
