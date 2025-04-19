"use client"

import { useState } from "react"
import { useAppContext } from "@/lib/context/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  CheckCircle2,
  Info,
  Lightbulb,
  ListChecks,
  ShoppingBag,
  Star,
  Bookmark,
  AlertTriangle,
  BedDouble,
  Palette,
  Baby,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Olmazsa olmaz ürünler
const essentialItems = [
  {
    id: "crib",
    name: "Bebek Beşiği/Karyola",
    description: "Bebeğinizin güvenle uyuyabileceği, standartlara uygun bir beşik",
    importance: "high",
    category: "furniture",
    tips: "Ayarlanabilir yükseklikte ve ileride çocuk yatağına dönüştürülebilen modeller daha uzun süre kullanılabilir.",
  },
  {
    id: "mattress",
    name: "Bebek Yatağı",
    description: "Beşiğe uygun, sert ve hava geçiren özellikte yatak",
    importance: "high",
    category: "furniture",
    tips: "Çok yumuşak yataklar ani bebek ölümü sendromu riskini artırabilir. Orta sertlikte ve hava geçiren bir yatak tercih edin.",
  },
  {
    id: "bedding",
    name: "Yatak Takımı",
    description: "Çarşaf, alez ve uyku tulumu",
    importance: "high",
    category: "textiles",
    tips: "En az 2-3 takım bulundurun. Pamuklu kumaşlar tercih edin.",
  },
  {
    id: "changing_table",
    name: "Alt Değiştirme Ünitesi",
    description: "Bebeğinizin bezini değiştirmek için güvenli ve pratik bir alan",
    importance: "medium",
    category: "furniture",
    tips: "Şifonyer üzerine monte edilebilen modeller yer tasarrufu sağlar.",
  },
  {
    id: "dresser",
    name: "Şifoniyer/Dolap",
    description: "Bebek kıyafetleri ve diğer eşyaları için depolama alanı",
    importance: "medium",
    category: "furniture",
    tips: "Çekmeceli modeller düzenli bir depolama sağlar.",
  },
  {
    id: "nursing_chair",
    name: "Emzirme Koltuğu",
    description: "Bebeğinizi beslerken rahat edebileceğiniz bir koltuk",
    importance: "medium",
    category: "furniture",
    tips: "Kol dayama yerleri olan ve sırt desteği sağlayan modeller tercih edin.",
  },
  {
    id: "storage",
    name: "Depolama Çözümleri",
    description: "Oyuncaklar, kitaplar ve diğer eşyalar için saklama alanları",
    importance: "medium",
    category: "furniture",
    tips: "Sepetler, kutular ve raflar pratik çözümler sunar.",
  },
  {
    id: "lighting",
    name: "Aydınlatma",
    description: "Ana ışık, gece lambası ve okuma lambası",
    importance: "medium",
    category: "lighting",
    tips: "Kısılabilir ışıklar gece besleme ve bez değiştirme için idealdir.",
  },
  {
    id: "curtains",
    name: "Perdeler",
    description: "Tercihen karartma özellikli perdeler",
    importance: "medium",
    category: "textiles",
    tips: "Karartma perdeleri bebeğinizin gündüz uykularında odayı karanlık tutmaya yardımcı olur.",
  },
  {
    id: "rug",
    name: "Halı",
    description: "Yumuşak, anti-alerjik ve yıkanabilir halı",
    importance: "low",
    category: "textiles",
    tips: "Kolay temizlenebilen, alerjik olmayan malzemeden yapılmış halılar tercih edin.",
  },
  {
    id: "monitor",
    name: "Bebek Monitörü",
    description: "Bebeğinizi uzaktan izlemenizi sağlayan cihaz",
    importance: "medium",
    category: "electronics",
    tips: "Ses ve görüntü özellikli modeller daha fazla güvenlik sağlar.",
  },
  {
    id: "mobile",
    name: "Dönence",
    description: "Beşik üzerine asılan, hareketli ve müzikli oyuncak",
    importance: "low",
    category: "accessories",
    tips: "Kontrast renkli ve müzikli modeller bebeğinizin görsel ve işitsel gelişimini destekler.",
  },
  {
    id: "hamper",
    name: "Kirli Sepeti",
    description: "Bebek kıyafetleri için ayrı bir çamaşır sepeti",
    importance: "low",
    category: "accessories",
    tips: "Kapaklı modeller kokuları içeride tutar.",
  },
  {
    id: "bookshelf",
    name: "Kitaplık",
    description: "Bebek kitapları için raf veya kitaplık",
    importance: "low",
    category: "furniture",
    tips: "Kitap kapaklarını gösteren raflar bebeğinizin kitaplara ilgi duymasını sağlar.",
  },
  {
    id: "wall_decor",
    name: "Duvar Dekorasyonu",
    description: "Çıkartmalar, tablolar veya duvar kağıdı",
    importance: "low",
    category: "decor",
    tips: "Kontrast renkli, geometrik desenli dekorasyonlar yenidoğanların görsel gelişimini destekler.",
  },
]

// İlginç bilgiler
const interestingFacts = [
  {
    id: "fact1",
    title: "Renk Algısı",
    content:
      "Yenidoğan bebekler ilk başta sadece siyah, beyaz ve gri tonlarını ayırt edebilirler. Renkli görme yeteneği 3-4 aylık olduklarında gelişmeye başlar.",
  },
  {
    id: "fact2",
    title: "Uyku Düzeni",
    content:
      "Yenidoğan bir bebek günde ortalama 16-17 saat uyur. Bu nedenle bebek odası, kaliteli uyku için ideal bir ortam olmalıdır.",
  },
  {
    id: "fact3",
    title: "Sıcaklık Kontrolü",
    content:
      "Bebek odası için ideal sıcaklık 18-22°C arasındadır. Bebekler vücut ısılarını yetişkinler kadar iyi düzenleyemezler.",
  },
  {
    id: "fact4",
    title: "Güvenlik İstatistikleri",
    content:
      "Amerikan Pediatri Akademisi'ne göre, beşikte sadece sert bir yatak ve uyku tulumu bulunmalı, battaniye, yastık veya oyuncak olmamalıdır.",
  },
  {
    id: "fact5",
    title: "Gürültü Seviyesi",
    content:
      "Bebek odasında ideal gürültü seviyesi 50 desibelin altında olmalıdır. Beyaz gürültü makineleri, dış sesleri maskeleyerek bebeğin daha rahat uyumasına yardımcı olabilir.",
  },
  {
    id: "fact6",
    title: "Montessori Yaklaşımı",
    content:
      "Montessori felsefesine göre bebek odası, bebeğin bağımsız keşif yapabileceği şekilde düzenlenmelidir. Yer yatağı, alçak raflar ve aynalar bu yaklaşımın temel unsurlarıdır.",
  },
]

// Bebek odası hazırlama önerileri
const roomPreparationTips = [
  {
    id: "tip1",
    title: "Güvenlik Öncelikli",
    content:
      "Tüm mobilyaları duvara sabitleyin, prizlere koruyucu takın ve kabloları gizleyin. Bebeğiniz büyüdükçe mobilyaların keskin köşelerine koruyucu yerleştirin.",
  },
  {
    id: "tip2",
    title: "Pratik Düzenleme",
    content:
      "Sık kullanılan eşyaları (bezler, ıslak mendiller, kıyafetler) kolay erişilebilir yerlere yerleştirin. Özellikle gece besleme ve bez değiştirme sırasında bu çok işinize yarayacak.",
  },
  {
    id: "tip3",
    title: "Büyümeye Uygun Tasarım",
    content:
      "Bebeğiniz hızla büyüyecek. Dönüştürülebilir mobilyalar (beşikten yatağa, alt değiştirme masasından şifoniyere) uzun vadede ekonomik olacaktır.",
  },
  {
    id: "tip4",
    title: "Depolama Çözümleri",
    content:
      "Asla yeterince depolama alanınız olmaz! Yatak altı çekmeceler, duvar rafları ve sepetler ekstra alan yaratır.",
  },
  {
    id: "tip5",
    title: "Aydınlatma Katmanları",
    content:
      "Ana ışık, gece lambası ve okuma lambası olmak üzere farklı aydınlatma seçenekleri oluşturun. Kısılabilir ışıklar gece rutinleri için idealdir.",
  },
  {
    id: "tip6",
    title: "Havalandırma",
    content:
      "İyi havalandırılan bir oda bebeğinizin sağlığı için önemlidir. Düzenli olarak odayı havalandırın ve nem dengesini kontrol edin.",
  },
  {
    id: "tip7",
    title: "Akustik Düzenleme",
    content: "Halılar, perdeler ve yumuşak oyuncaklar odadaki sesleri absorbe ederek daha sakin bir ortam yaratır.",
  },
  {
    id: "tip8",
    title: "Tema Seçimi",
    content:
      "Çok spesifik veya karmaşık temalar yerine, nötr ve zamanla değiştirilebilir dekorasyonlar tercih edin. Duvar çıkartmaları ve değiştirilebilir aksesuarlar esneklik sağlar.",
  },
]

// Bebek odası fikirleri
const roomIdeas = [
  {
    id: "idea1",
    title: "Minimalist Bebek Odası",
    description: "Sade renkler, az eşya ve fonksiyonel mobilyalarla ferah bir alan yaratın.",
    elements: [
      "Beyaz veya açık tonlarda duvarlar",
      "Ahşap detaylı mobilyalar",
      "Geometrik desenli halı veya battaniyeler",
      "Birkaç seçilmiş dekoratif öğe",
    ],
  },
  {
    id: "idea2",
    title: "Doğa Temalı Oda",
    description: "Doğal malzemeler ve yumuşak yeşil tonlarıyla huzurlu bir ortam oluşturun.",
    elements: [
      "Bitki motifleri veya gerçek bitkiler (bebeğin erişemeyeceği yerlerde)",
      "Ahşap mobilyalar",
      "Organik kumaşlar",
      "Hayvan figürleri veya orman temalı duvar dekorasyonu",
    ],
  },
  {
    id: "idea3",
    title: "Montessori İlkelerine Uygun Oda",
    description: "Bebeğin bağımsız keşfini destekleyen, erişilebilir bir düzenleme.",
    elements: [
      "Yer yatağı veya alçak beşik",
      "Çocuk boyutunda ayna",
      "Alçak raflar ve erişilebilir oyuncak alanları",
      "Doğal ışığı maksimize eden düzenleme",
    ],
  },
  {
    id: "idea4",
    title: "Çok Fonksiyonlu Küçük Oda",
    description: "Sınırlı alanı akıllıca kullanarak maksimum işlevsellik sağlayın.",
    elements: [
      "Duvar rafları ve asma depolama çözümleri",
      "Çekmeceli beşik",
      "Şifoniyere monte edilebilen alt değiştirme ünitesi",
      "Katlanabilir veya çok amaçlı mobilyalar",
    ],
  },
  {
    id: "idea5",
    title: "Nötr Renkli Unisex Oda",
    description: "Cinsiyet kalıplarından uzak, zamansız bir tasarım oluşturun.",
    elements: [
      "Gri, bej, mint yeşili veya lavanta tonları",
      "Geometrik desenler",
      "Kontrast yaratan siyah-beyaz aksesuarlar",
      "Farklı dokular (yumuşak halılar, örgü battaniyeler)",
    ],
  },
  {
    id: "idea6",
    title: "Vintage Esintili Oda",
    description: "Nostaljik ve sıcak bir atmosfer yaratın.",
    elements: [
      "Retro mobilyalar veya yenilenmiş antika parçalar",
      "Pastel renkler",
      "Dantel veya nakış detayları",
      "Vintage oyuncaklar veya kitaplar",
    ],
  },
]

// Ana bileşen
export default function BebekOdasiClient() {
  const { addShoppingItem, shoppingLists, createShoppingList } = useAppContext()

  // State'ler
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("essentials")
  const [listId, setListId] = useState<string | null>(null)

  // Öğeyi işaretle/işareti kaldır
  const toggleItem = (itemId: string) => {
    if (checkedItems.includes(itemId)) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId))
    } else {
      setCheckedItems([...checkedItems, itemId])
    }
  }

  // Alışveriş listesine ekle
  const addToShoppingList = (itemName: string, description?: string) => {
    // Eğer bebek odası listesi yoksa oluştur
    if (!listId) {
      const existingList = shoppingLists.find((list) => list.title === "Bebek Odası Ürünleri")

      if (existingList) {
        setListId(existingList.id)
        addShoppingItem(existingList.id, itemName, 1, description)
      } else {
        const newList = createShoppingList("Bebek Odası Ürünleri", "Bebek odası hazırlık listesi")
        setListId(newList.id)
        addShoppingItem(newList.id, itemName, 1, description)
      }
    } else {
      addShoppingItem(listId, itemName, 1, description)
    }
  }

  // Önem derecesine göre badge rengi
  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case "high":
        return <Badge className="bg-red-500">Olmazsa Olmaz</Badge>
      case "medium":
        return <Badge className="bg-amber-500">Önemli</Badge>
      case "low":
        return <Badge className="bg-blue-500">İsteğe Bağlı</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Bebek Odası Hazırlık Rehberi</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Bebeğiniz için mükemmel bir oda hazırlamanıza yardımcı olacak kapsamlı rehber, öneriler ve kontrol listesi
          </p>
        </div>

        <Alert className="mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-800 dark:text-amber-300">Önemli Not</AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-400">
            Bebek odası hazırlığına hamileliğin 5. veya 6. ayında başlamanız önerilir. Böylece doğum yaklaştığında
            telaşlanmadan her şeyi tamamlayabilirsiniz.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="essentials" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="essentials" className="flex items-center gap-1">
              <ListChecks className="h-4 w-4" />
              <span className="hidden sm:inline">Olmazsa Olmazlar</span>
              <span className="sm:hidden">Liste</span>
            </TabsTrigger>
            <TabsTrigger value="ideas" className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Oda Fikirleri</span>
              <span className="sm:hidden">Fikirler</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Hazırlık Önerileri</span>
              <span className="sm:hidden">Öneriler</span>
            </TabsTrigger>
            <TabsTrigger value="facts" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">İlginç Bilgiler</span>
              <span className="sm:hidden">Bilgiler</span>
            </TabsTrigger>
          </TabsList>

          {/* Olmazsa Olmazlar Sekmesi */}
          <TabsContent value="essentials">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-red-500" />
                  Bebek Odası Kontrol Listesi
                </CardTitle>
                <CardDescription>
                  Bebek odası için gerekli olan temel ürünlerin listesi. İhtiyacınız olan her şeyi işaretleyerek takip
                  edebilirsiniz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <BedDouble className="h-4 w-4 text-red-500" />
                      Mobilya ve Ana Ürünler
                    </h3>
                    <div className="space-y-3">
                      {essentialItems
                        .filter((item) => ["furniture", "lighting"].includes(item.category))
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start space-x-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <Checkbox
                              id={item.id}
                              checked={checkedItems.includes(item.id)}
                              onCheckedChange={() => toggleItem(item.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <label
                                  htmlFor={item.id}
                                  className={cn(
                                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                                    checkedItems.includes(item.id) && "line-through text-gray-500 dark:text-gray-400",
                                  )}
                                >
                                  {item.name}
                                </label>
                                {getImportanceBadge(item.importance)}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                              <div className="flex justify-between items-center mt-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-blue-600 dark:text-blue-400 p-0 h-auto"
                                  onClick={() => {
                                    const accordionItem = document.getElementById(`tip-${item.id}`)
                                    if (accordionItem) {
                                      accordionItem.scrollIntoView({ behavior: "smooth" })
                                    }
                                  }}
                                >
                                  İpucu Gör
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-7"
                                  onClick={() => addToShoppingList(item.name, item.description)}
                                >
                                  <ShoppingBag className="h-3 w-3 mr-1" />
                                  Listeye Ekle
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium flex items-center gap-2 mb-3">
                      <Palette className="h-4 w-4 text-red-500" />
                      Tekstil ve Dekorasyon
                    </h3>
                    <div className="space-y-3">
                      {essentialItems
                        .filter((item) => ["textiles", "decor", "accessories", "electronics"].includes(item.category))
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start space-x-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            <Checkbox
                              id={item.id}
                              checked={checkedItems.includes(item.id)}
                              onCheckedChange={() => toggleItem(item.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <label
                                  htmlFor={item.id}
                                  className={cn(
                                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                                    checkedItems.includes(item.id) && "line-through text-gray-500 dark:text-gray-400",
                                  )}
                                >
                                  {item.name}
                                </label>
                                {getImportanceBadge(item.importance)}
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                              <div className="flex justify-between items-center mt-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-blue-600 dark:text-blue-400 p-0 h-auto"
                                  onClick={() => {
                                    const accordionItem = document.getElementById(`tip-${item.id}`)
                                    if (accordionItem) {
                                      accordionItem.scrollIntoView({ behavior: "smooth" })
                                    }
                                  }}
                                >
                                  İpucu Gör
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs h-7"
                                  onClick={() => addToShoppingList(item.name, item.description)}
                                >
                                  <ShoppingBag className="h-3 w-3 mr-1" />
                                  Listeye Ekle
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-red-500" />
                    Ürün İpuçları
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {essentialItems.map((item) => (
                      <AccordionItem value={item.id} key={item.id} id={`tip-${item.id}`}>
                        <AccordionTrigger className="text-sm">{item.name} Hakkında İpuçları</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.tips}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="text-sm text-gray-500">
                  {checkedItems.length} / {essentialItems.length} tamamlandı
                </div>
                <Button variant="outline" onClick={() => setCheckedItems([])} disabled={checkedItems.length === 0}>
                  Listeyi Sıfırla
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Oda Fikirleri Sekmesi */}
          <TabsContent value="ideas">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  Bebek Odası Fikirleri
                </CardTitle>
                <CardDescription>Farklı tarzlarda bebek odası fikirleri ve ilham kaynakları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {roomIdeas.map((idea) => (
                    <Card
                      key={idea.id}
                      className="overflow-hidden border-2 hover:border-amber-200 dark:hover:border-amber-800 transition-colors"
                    >
                      <CardHeader className="bg-amber-50 dark:bg-amber-900/20 pb-2">
                        <CardTitle className="text-lg">{idea.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{idea.description}</p>
                        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                          İçerebilecek Öğeler:
                        </h4>
                        <ul className="text-sm space-y-1">
                          {idea.elements.map((element, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-amber-500 mr-2">•</span>
                              <span>{element}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-end pt-3 pb-3">
                        <Button variant="ghost" size="sm" className="text-amber-600 dark:text-amber-400">
                          <Bookmark className="h-4 w-4 mr-1" />
                          Kaydet
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hazırlık Önerileri Sekmesi */}
          <TabsContent value="tips">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Bebek Odası Hazırlama Önerileri
                </CardTitle>
                <CardDescription>Bebek odanızı hazırlarken dikkat etmeniz gereken önemli noktalar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roomPreparationTips.map((tip) => (
                    <div
                      key={tip.id}
                      className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30"
                    >
                      <h3 className="font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {tip.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{tip.content}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Hazırlık Zaman Çizelgesi
                  </h3>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-24 font-medium text-sm">5-6. Ay</div>
                      <div className="flex-1 text-sm">
                        <p>Oda planlaması, renk ve tema seçimi, büyük mobilyaların siparişi</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex">
                      <div className="w-24 font-medium text-sm">7. Ay</div>
                      <div className="flex-1 text-sm">
                        <p>Mobilyaların kurulumu, duvar boyama/kağıdı, temel tekstil ürünlerinin alımı</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex">
                      <div className="w-24 font-medium text-sm">8. Ay</div>
                      <div className="flex-1 text-sm">
                        <p>Dekoratif öğelerin yerleştirilmesi, depolama çözümlerinin düzenlenmesi</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex">
                      <div className="w-24 font-medium text-sm">9. Ay</div>
                      <div className="flex-1 text-sm">
                        <p>Son rötuşlar, bebek kıyafetlerinin yıkanması ve yerleştirilmesi, güvenlik kontrolü</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* İlginç Bilgiler Sekmesi */}
          <TabsContent value="facts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  Bebek Odası Hakkında İlginç Bilgiler
                </CardTitle>
                <CardDescription>Bebek odası hazırlarken bilmeniz gereken ilginç ve faydalı bilgiler</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {interestingFacts.map((fact) => (
                      <div
                        key={fact.id}
                        className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30"
                      >
                        <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                          <Info className="h-4 w-4 text-blue-500" />
                          {fact.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{fact.content}</p>
                      </div>
                    ))}

                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
                      <h3 className="font-medium mb-3">Bebek Odası Güvenlik Kontrol Listesi</h3>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Tüm mobilyalar duvara sabitlenmeli</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Elektrik kabloları gizlenmeli ve prizlere koruyucu takılmalı</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Pencerelerde güvenlik kilidi olmalı</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Beşikte yumuşak oyuncak, yastık veya kalın battaniye olmamalı</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Duman ve karbon monoksit dedektörü kurulmalı</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Mobilyaların keskin köşelerine koruyucu takılmalı</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>Perdeler ve jaluzi ipleri bebeğin erişemeyeceği yerde olmalı</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
                      <h3 className="font-medium text-purple-800 dark:text-purple-300 flex items-center gap-2 mb-2">
                        <Baby className="h-4 w-4 text-purple-500" />
                        Bebek Gelişimi ve Oda Tasarımı
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        Bebeğinizin gelişim aşamalarına göre odada yapmanız gereken değişiklikler:
                      </p>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs font-medium text-purple-600 dark:text-purple-400">0-3 Ay</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            Kontrast renkli görsel uyaranlar, yumuşak müzik, güvenli uyku ortamı
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-purple-600 dark:text-purple-400">4-6 Ay</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            Ayna, yumuşak oyuncaklar, emekleme alanı hazırlığı
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-purple-600 dark:text-purple-400">7-12 Ay</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            Güvenli keşif alanları, çekmece kilitleri, düşme önleyici bariyerler
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-purple-600 dark:text-purple-400">12+ Ay</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            Oyun alanı, kitaplık, tırmanma engelleyiciler
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-6">
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => {
              // Tüm işaretlenmemiş öğeleri alışveriş listesine ekle
              const uncheckedItems = essentialItems.filter((item) => !checkedItems.includes(item.id))

              if (uncheckedItems.length > 0) {
                // Eğer bebek odası listesi yoksa oluştur
                if (!listId) {
                  const existingList = shoppingLists.find((list) => list.title === "Bebek Odası Ürünleri")

                  if (existingList) {
                    setListId(existingList.id)
                    uncheckedItems.forEach((item) => {
                      addShoppingItem(existingList.id, item.name, 1, item.description)
                    })
                  } else {
                    const newList = createShoppingList("Bebek Odası Ürünleri", "Bebek odası hazırlık listesi")
                    setListId(newList.id)
                    uncheckedItems.forEach((item) => {
                      addShoppingItem(newList.id, item.name, 1, item.description)
                    })
                  }
                } else {
                  uncheckedItems.forEach((item) => {
                    addShoppingItem(listId, item.name, 1, item.description)
                  })
                }
              }
            }}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Eksik Ürünleri Alışveriş Listesine Ekle
          </Button>
        </div>
      </div>
    </div>
  )
}
