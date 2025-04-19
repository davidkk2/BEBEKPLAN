// Önerilen ürünler için kategori ve ürün tipleri
export interface SuggestedProduct {
  id: string
  name: string
  description?: string
  defaultQuantity: number
}

export interface ProductCategory {
  id: string
  title: string
  products: SuggestedProduct[]
}

// Önerilen ürünler listesi
export const suggestedProducts: ProductCategory[] = [
  {
    id: "bebek-giyim",
    title: "Bebek Giyim",
    products: [
      {
        id: "body",
        name: "Body/Zıbın",
        description: "0-3 ay için 6-8 adet, 3-6 ay için 4-6 adet",
        defaultQuantity: 6,
      },
      {
        id: "tulum",
        name: "Tulum",
        description: "Mevsime uygun, 4-6 adet",
        defaultQuantity: 5,
      },
      {
        id: "pantolon",
        name: "Pantolon/Tayt",
        description: "3-4 adet",
        defaultQuantity: 4,
      },
      {
        id: "hirka",
        name: "Hırka/Sweatshirt",
        description: "2-3 adet",
        defaultQuantity: 2,
      },
      {
        id: "corap",
        name: "Çorap",
        description: "6-8 çift",
        defaultQuantity: 6,
      },
      {
        id: "sapka",
        name: "Şapka",
        description: "Mevsime uygun, 2 adet",
        defaultQuantity: 2,
      },
      {
        id: "eldiven",
        name: "Eldiven",
        description: "Tırnak çizmesini önlemek için, 2-3 çift",
        defaultQuantity: 2,
      },
    ],
  },
  {
    id: "bebek-bakim",
    title: "Bebek Bakım Ürünleri",
    products: [
      {
        id: "bez",
        name: "Bebek Bezi",
        description: "Yenidoğan beden, 1 paket (yaklaşık 30-40 adet)",
        defaultQuantity: 1,
      },
      {
        id: "islak-mendil",
        name: "Islak Mendil",
        description: "Hassas ciltler için, 2-3 paket",
        defaultQuantity: 3,
      },
      {
        id: "sampuan",
        name: "Bebek Şampuanı",
        description: "Göz yakmayan formül",
        defaultQuantity: 1,
      },
      {
        id: "pisik-kremi",
        name: "Pişik Kremi",
        description: "Koruyucu bariyer oluşturan",
        defaultQuantity: 1,
      },
      {
        id: "bebek-yagi",
        name: "Bebek Yağı",
        description: "Masaj ve nemlendirme için",
        defaultQuantity: 1,
      },
      {
        id: "pamuk",
        name: "Pamuk",
        description: "Temizlik için",
        defaultQuantity: 1,
      },
      {
        id: "kulak-cubugu",
        name: "Bebek Kulak Çubuğu",
        description: "Güvenli uçlu",
        defaultQuantity: 1,
      },
    ],
  },
  {
    id: "beslenme",
    title: "Beslenme Ürünleri",
    products: [
      {
        id: "biberon",
        name: "Biberon",
        description: "Farklı boyutlarda, 2-3 adet",
        defaultQuantity: 3,
      },
      {
        id: "emzik",
        name: "Emzik",
        description: "0-6 ay, 1-2 adet",
        defaultQuantity: 2,
      },
      {
        id: "biberon-firçasi",
        name: "Biberon Fırçası",
        description: "Temizlik için",
        defaultQuantity: 1,
      },
      {
        id: "mama-sandalyesi",
        name: "Mama Sandalyesi",
        description: "6 aydan sonra kullanım için",
        defaultQuantity: 1,
      },
      {
        id: "mama-kasigi",
        name: "Mama Kaşığı",
        description: "Yumuşak uçlu, 2-3 adet",
        defaultQuantity: 2,
      },
    ],
  },
  {
    id: "uyku",
    title: "Uyku Ürünleri",
    products: [
      {
        id: "besik",
        name: "Beşik/Karyola",
        description: "Güvenlik standartlarına uygun",
        defaultQuantity: 1,
      },
      {
        id: "yatak",
        name: "Bebek Yatağı",
        description: "Beşiğe uygun boyutta",
        defaultQuantity: 1,
      },
      {
        id: "yorgan",
        name: "Bebek Yorganı/Battaniye",
        description: "Mevsime uygun, 2 adet",
        defaultQuantity: 2,
      },
      {
        id: "carsaf",
        name: "Çarşaf Takımı",
        description: "Pamuklu, 2-3 takım",
        defaultQuantity: 2,
      },
      {
        id: "uyku-tulumu",
        name: "Uyku Tulumu",
        description: "Mevsime uygun, 1-2 adet",
        defaultQuantity: 1,
      },
    ],
  },
  {
    id: "banyo",
    title: "Banyo Ürünleri",
    products: [
      {
        id: "kuveti",
        name: "Bebek Küveti",
        description: "Kaymaz tabanlı",
        defaultQuantity: 1,
      },
      {
        id: "havlu",
        name: "Bebek Havlusu",
        description: "Kapşonlu, 2-3 adet",
        defaultQuantity: 2,
      },
      {
        id: "banyo-termometresi",
        name: "Banyo Termometresi",
        description: "Su sıcaklığını ölçmek için",
        defaultQuantity: 1,
      },
      {
        id: "banyo-sunger",
        name: "Banyo Süngeri",
        description: "Yumuşak dokulu",
        defaultQuantity: 1,
      },
    ],
  },
  {
    id: "guvenlik",
    title: "Güvenlik Ürünleri",
    products: [
      {
        id: "bebek-telsizi",
        name: "Bebek Telsizi",
        description: "Ses veya görüntülü",
        defaultQuantity: 1,
      },
      {
        id: "oda-termometresi",
        name: "Oda Termometresi",
        description: "Bebek odası için",
        defaultQuantity: 1,
      },
      {
        id: "kose-koruyucu",
        name: "Köşe Koruyucular",
        description: "Mobilya köşeleri için",
        defaultQuantity: 8,
      },
      {
        id: "priz-koruyucu",
        name: "Priz Koruyucular",
        description: "Tüm prizler için",
        defaultQuantity: 10,
      },
    ],
  },
]
