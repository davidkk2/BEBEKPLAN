import AdDisplay from "@/components/ad-display"

export const metadata = {
  title: "Doğum Çantası | BebekPlan",
  description: "Doğum için hazırlamanız gereken çanta ve içindekiler listesi.",
}

export default function DogumCantasiPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Doğum Çantası</h1>

      {/* Üst reklam */}
      <div className="mb-8">
        <AdDisplay adSlot="7340816851" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Doğum Çantanızda Neler Olmalı?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Doğum çantanızı hazırlamak, doğum sürecine hazırlanmanın önemli bir parçasıdır. İşte doğum çantanızda
          bulunması gereken temel eşyalar:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3">Anne İçin</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Kimlik, sigorta kartı ve hastane evrakları</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Gecelik veya pijama (önden açılabilir olması tercih edilir)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Terlik ve çorap</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Kişisel bakım ürünleri (diş fırçası, şampuan, sabun vb.)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Emzirme sütyeni ve göğüs pedleri</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Lohusa pedi</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Eve dönüş için rahat kıyafetler</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Bebek İçin</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Zıbın (2-3 adet)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Bebek battaniyesi</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Bebek bezi (yenidoğan bezi)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Islak mendil</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Bebek şampuanı ve sabunu</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Bebek havlusu</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Eve dönüş için mevsime uygun kıyafet</span>
              </li>
            </ul>
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
