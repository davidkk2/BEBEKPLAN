import AdDisplay from "@/components/ad-display"

export const metadata = {
  title: "Alışveriş Listesi | BebekPlan",
  description: "Bebeğiniz için ihtiyaç duyacağınız tüm ürünlerin listesi ve öneriler.",
}

export default function AlisverisListesiPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Alışveriş Listesi</h1>

      {/* Üst reklam */}
      <div className="mb-8">
        <AdDisplay adSlot="7340816851" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Bebek Odası</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Bebeğinizin odası için gerekli tüm mobilya ve aksesuarlar.
            </p>
            <a href="/alisveris-listesi/bebek-odasi" className="text-pink-500 hover:text-pink-600 text-sm font-medium">
              Listeyi Görüntüle →
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Bebek Kıyafetleri</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Yeni doğan bebeğiniz için ihtiyaç duyacağınız kıyafetler.
            </p>
            <a
              href="/alisveris-listesi/bebek-kiyafetleri"
              className="text-pink-500 hover:text-pink-600 text-sm font-medium"
            >
              Listeyi Görüntüle →
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Bebek Bakım Ürünleri</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Bebeğinizin bakımı için gerekli tüm ürünler.
            </p>
            <a
              href="/alisveris-listesi/bebek-bakim-urunleri"
              className="text-pink-500 hover:text-pink-600 text-sm font-medium"
            >
              Listeyi Görüntüle →
            </a>
          </div>
        </div>
      </div>

      {/* Alt reklam */}
      <div className="mt-8">
        <AdDisplay adSlot="7340816851" />
      </div>
    </div>
  )
}
