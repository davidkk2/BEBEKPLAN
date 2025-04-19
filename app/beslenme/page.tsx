"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Apple, Baby, Utensils, Salad, Milk, Search, BookOpen, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useAppContext } from "@/lib/context/app-context"
import { cn } from "@/lib/utils"

// Beslenme önerileri veri yapısı
interface NutritionItem {
  id: string
  title: string
  description: string
  items: Array<{
    text: string
    tags: string[]
  }>
  icon: React.ReactNode
  tags: string[]
}

// Hamilelik beslenmesi verileri
const pregnancyNutrition: NutritionItem[] = [
  {
    id: "first-trimester",
    title: "İlk Üç Ay (1-3. Aylar)",
    description:
      "Hamileliğin ilk üç ayında bulantı ve kusma yaygındır. Bu dönemde küçük ve sık öğünler tüketmek faydalı olabilir.",
    items: [
      {
        text: "Zencefil çayı bulantıyı azaltabilir",
        tags: ["bulantı", "zencefil"],
      },
      {
        text: "Kuru kraker veya tost gibi hafif yiyecekler sabah bulantısını hafifletebilir",
        tags: ["bulantı", "hafif yiyecek"],
      },
      {
        text: "Folik asit açısından zengin yeşil yapraklı sebzeler tüketin",
        tags: ["folik asit", "sebze"],
      },
      {
        text: "Günde en az 2 litre su için",
        tags: ["su", "hidrasyon"],
      },
      {
        text: "B6 vitamini içeren gıdalar (muz, avokado, patates) bulantıyı azaltabilir",
        tags: ["bulantı", "vitamin", "b6 vitamini"],
      },
      {
        text: "Demir açısından zengin gıdalar (kırmızı et, mercimek, ıspanak) tüketin",
        tags: ["demir", "kırmızı et", "baklagil"],
      },
    ],
    icon: <Apple className="h-6 w-6 text-pink-500" />,
    tags: ["bulantı", "folik asit", "su", "demir", "vitamin"],
  },
  {
    id: "second-trimester",
    title: "İkinci Üç Ay (4-6. Aylar)",
    description:
      "Bu dönemde genellikle enerji seviyeniz artar ve bulantılar azalır. Bebeğinizin gelişimi için protein ve kalsiyum alımı önemlidir.",
    items: [
      {
        text: "Süt, yoğurt ve peynir gibi kalsiyum kaynakları tüketin",
        tags: ["kalsiyum", "süt ürünleri"],
      },
      {
        text: "Yumurta, et, balık ve baklagiller gibi protein kaynakları önemlidir",
        tags: ["protein", "et", "balık", "baklagil"],
      },
      {
        text: "Demir açısından zengin gıdalar (kırmızı et, ıspanak) tüketin",
        tags: ["demir", "kırmızı et", "sebze"],
      },
      {
        text: "Omega-3 için haftada 2-3 kez yağlı balık tüketin",
        tags: ["omega-3", "balık"],
      },
      {
        text: "Tam tahıllı ürünler tercih edin",
        tags: ["tam tahıl", "lif"],
      },
      {
        text: "Çeşitli renklerde meyve ve sebzeler tüketin",
        tags: ["meyve", "sebze", "vitamin"],
      },
    ],
    icon: <Utensils className="h-6 w-6 text-pink-500" />,
    tags: ["kalsiyum", "protein", "demir", "omega-3", "tam tahıl"],
  },
  {
    id: "third-trimester",
    title: "Son Üç Ay (7-9. Aylar)",
    description: "Hamileliğin son döneminde bebeğiniz hızla büyür ve daha fazla kalori ihtiyacınız olur.",
    items: [
      {
        text: "Günlük kalori alımınızı yaklaşık 300-500 kalori artırın",
        tags: ["kalori", "enerji"],
      },
      {
        text: "D vitamini için güneş ışığından faydalanın ve süt ürünleri tüketin",
        tags: ["d vitamini", "süt ürünleri"],
      },
      {
        text: "Kabızlığı önlemek için lifli gıdalar ve bol su tüketin",
        tags: ["lif", "su", "kabızlık"],
      },
      {
        text: "Şişlik ve hazımsızlık için küçük ve sık öğünler tercih edin",
        tags: ["hazımsızlık", "şişlik", "sık öğün"],
      },
      {
        text: "Magnezyum açısından zengin gıdalar (koyu yeşil sebzeler, kuruyemişler) tüketin",
        tags: ["magnezyum", "sebze", "kuruyemiş"],
      },
      {
        text: "Potasyum için muz, patates ve avokado gibi besinler tüketin",
        tags: ["potasyum", "meyve", "sebze"],
      },
    ],
    icon: <Salad className="h-6 w-6 text-pink-500" />,
    tags: ["kalori", "d vitamini", "lif", "magnezyum", "potasyum"],
  },
  {
    id: "avoid-foods",
    title: "Kaçınılması Gereken Gıdalar",
    description: "Hamilelik sürecinde bazı gıdalardan kaçınmak bebeğinizin sağlığı için önemlidir.",
    items: [
      {
        text: "Çiğ veya az pişmiş et, balık ve yumurta",
        tags: ["çiğ gıda", "et", "balık", "yumurta"],
      },
      {
        text: "Pastörize edilmemiş süt ürünleri",
        tags: ["pastörize edilmemiş", "süt ürünleri"],
      },
      {
        text: "Alkol ve kafein (günde 200 mg'dan fazla)",
        tags: ["alkol", "kafein"],
      },
      {
        text: "Yüksek cıva içeren balıklar (kılıç balığı, köpek balığı)",
        tags: ["cıva", "balık"],
      },
      {
        text: "İşlenmiş et ürünleri (salam, sosis)",
        tags: ["işlenmiş et", "et"],
      },
      {
        text: "Yıkanmamış meyve ve sebzeler",
        tags: ["hijyen", "meyve", "sebze"],
      },
      {
        text: "Taze sıkılmamış meyve suları",
        tags: ["pastörize edilmemiş", "meyve suyu"],
      },
    ],
    icon: <Heart className="h-6 w-6 text-pink-500" />,
    tags: ["çiğ gıda", "alkol", "kafein", "cıva", "işlenmiş et"],
  },
]

// Bebek beslenmesi verileri
const babyNutrition: NutritionItem[] = [
  {
    id: "0-6-months",
    title: "0-6 Ay",
    description: "İlk 6 ay sadece anne sütü veya formül mama önerilir.",
    items: [
      {
        text: "Dünya Sağlık Örgütü ilk 6 ay sadece anne sütü önermektedir",
        tags: ["anne sütü", "DSÖ"],
      },
      {
        text: "Anne sütü bebeğinizin ihtiyacı olan tüm besinleri içerir",
        tags: ["anne sütü", "besin"],
      },
      {
        text: "Anne sütü alamayan bebekler için formül mama kullanılabilir",
        tags: ["formül mama", "alternatif"],
      },
      {
        text: "Bu dönemde su dahil ek gıda verilmemelidir",
        tags: ["ek gıda", "su"],
      },
      {
        text: "Anne sütü bebeğin bağışıklık sistemini güçlendirir",
        tags: ["anne sütü", "bağışıklık"],
      },
      {
        text: "Emzirme sırasında bebeğin doğru pozisyonda olması önemlidir",
        tags: ["emzirme", "pozisyon"],
      },
    ],
    icon: <Milk className="h-6 w-6 text-pink-500" />,
    tags: ["anne sütü", "formül mama", "emzirme", "bağışıklık"],
  },
  {
    id: "6-8-months",
    title: "6-8 Ay",
    description: "Bu dönemde ek gıdalara başlanabilir, ancak anne sütü veya formül mama hala temel besin kaynağıdır.",
    items: [
      {
        text: "Pirinç püresi, meyve püresi gibi tek bileşenli gıdalarla başlayın",
        tags: ["püre", "ek gıda", "meyve"],
      },
      {
        text: "Her yeni gıdayı 3-4 gün arayla tanıtın ve alerjik reaksiyonları gözlemleyin",
        tags: ["alerji", "yeni gıda"],
      },
      {
        text: "Günde 1-2 öğün ek gıda yeterlidir",
        tags: ["ek gıda", "öğün sayısı"],
      },
      {
        text: "Pütürsüz ve sulu kıvamda gıdalar tercih edin",
        tags: ["kıvam", "püre"],
      },
      {
        text: "Şeker ve tuz eklemeyin",
        tags: ["şeker", "tuz", "katkısız"],
      },
      {
        text: "Bebeğinizin açlık ve tokluk işaretlerine dikkat edin",
        tags: ["açlık işareti", "tokluk işareti"],
      },
    ],
    icon: <Utensils className="h-6 w-6 text-pink-500" />,
    tags: ["ek gıda", "püre", "alerji", "kıvam"],
  },
  {
    id: "9-12-months",
    title: "9-12 Ay",
    description: "Bu dönemde bebeğiniz daha çeşitli gıdalar yiyebilir ve parmak besinlere geçiş yapabilir.",
    items: [
      {
        text: "Günde 3 öğün ek gıda ve 2 ara öğün verilebilir",
        tags: ["öğün sayısı", "ara öğün"],
      },
      {
        text: "Küçük parçalar halinde yumuşak meyveler, sebzeler ve et verilebilir",
        tags: ["meyve", "sebze", "et", "yumuşak gıda"],
      },
      {
        text: "Yoğurt, peynir gibi süt ürünleri tanıtılabilir",
        tags: ["süt ürünleri", "yoğurt", "peynir"],
      },
      {
        text: "Kendi kendine yeme becerisini geliştirmek için parmak besinler sunun",
        tags: ["parmak besin", "kendini besleme"],
      },
      {
        text: "Çeşitli dokular ve tatlar tanıtın",
        tags: ["doku", "tat", "çeşitlilik"],
      },
      {
        text: "Aile yemeklerine benzer yemekler (baharatsız ve tuzsuz) verilebilir",
        tags: ["aile yemeği", "katkısız"],
      },
    ],
    icon: <Salad className="h-6 w-6 text-pink-500" />,
    tags: ["parmak besin", "süt ürünleri", "doku", "çeşitlilik"],
  },
  {
    id: "12-plus-months",
    title: "12+ Ay",
    description: "Bir yaşından sonra bebeğiniz aile yemeklerine geçiş yapabilir.",
    items: [
      {
        text: "Aile ile aynı yemekleri yiyebilir (baharatsız ve tuzlu olmayan versiyonları)",
        tags: ["aile yemeği", "katkısız"],
      },
      {
        text: "Günde 3 ana öğün ve 2-3 ara öğün önerilir",
        tags: ["öğün sayısı", "ara öğün"],
      },
      {
        text: "İnek sütü artık verilebilir (günde 500 ml'den fazla olmamalı)",
        tags: ["inek sütü", "miktar"],
      },
      {
        text: "Çeşitli besin gruplarından dengeli beslenme sağlayın",
        tags: ["dengeli beslenme", "besin grubu"],
      },
      {
        text: "Bal ve fıstık ezmesi gibi alerjik potansiyeli olan gıdalar dikkatle tanıtılabilir",
        tags: ["alerji", "bal", "fıstık"],
      },
      {
        text: "Düzenli yemek saatleri oluşturun",
        tags: ["düzen", "rutin"],
      },
    ],
    icon: <Baby className="h-6 w-6 text-pink-500" />,
    tags: ["aile yemeği", "inek sütü", "dengeli beslenme", "düzen"],
  },
]

export default function BeslenmePage() {
  const { birthDate } = useAppContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("hamilelik")
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])

  // Hamilelik haftasına göre önerilen beslenme öğesini belirle
  const getRecommendedSection = () => {
    if (!birthDate) return null

    const today = new Date()
    const dueDate = new Date(birthDate)
    const totalPregnancyDays = 280 // 40 hafta

    // Doğum tarihine kalan gün sayısı
    const daysLeft = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    // Geçen hamilelik günleri
    const daysPassed = totalPregnancyDays - daysLeft

    // Hamilelik haftası
    const pregnancyWeek = Math.floor(daysPassed / 7)

    if (pregnancyWeek <= 0) return null

    if (pregnancyWeek <= 13) {
      return "first-trimester"
    } else if (pregnancyWeek <= 26) {
      return "second-trimester"
    } else {
      return "third-trimester"
    }
  }

  const recommendedSection = getRecommendedSection()

  // Tüm etiketleri topla
  useEffect(() => {
    const tags = new Set<string>()

    const currentData = activeTab === "hamilelik" ? pregnancyNutrition : babyNutrition

    // Ana etiketleri ekle
    currentData.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag))
    })

    // Öğe etiketlerini ekle
    currentData.forEach((item) => {
      item.items.forEach((subItem) => {
        subItem.tags.forEach((tag) => tags.add(tag))
      })
    })

    setAllTags(Array.from(tags).sort())
  }, [activeTab])

  // Arama ve filtreleme fonksiyonu
  const filterItems = (items: NutritionItem[]) => {
    return items.filter((item) => {
      // Etiketlere göre filtrele
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some(
          (tag) =>
            item.tags.includes(tag) || item.items.some((subItem) => subItem.tags.some((itemTag) => itemTag === tag)),
        )

      // Arama sorgusuna göre filtrele
      if (searchQuery === "") {
        return matchesTags
      }

      const query = searchQuery.toLowerCase()
      const titleMatch = item.title.toLowerCase().includes(query)
      const descriptionMatch = item.description.toLowerCase().includes(query)
      const itemsMatch = item.items.some((subItem) => subItem.text.toLowerCase().includes(query))

      return (titleMatch || descriptionMatch || itemsMatch) && matchesTags
    })
  }

  // Filtrelenmiş öğeler
  const filteredPregnancyItems = filterItems(pregnancyNutrition)
  const filteredBabyItems = filterItems(babyNutrition)

  // Etiket seçme/kaldırma fonksiyonu
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Etiket filtresine göre öğeleri vurgula
  const highlightMatchingItems = (item: NutritionItem) => {
    if (selectedTags.length === 0) return item.items

    return item.items.map((subItem) => {
      const isHighlighted = selectedTags.some((tag) => subItem.tags.includes(tag))
      return {
        ...subItem,
        isHighlighted,
      }
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Beslenme Önerileri</h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl max-w-[700px] mx-auto">
            Hamilelik ve bebeklik döneminde sağlıklı beslenme tavsiyeleri
          </p>
        </div>

        {/* Arama ve Filtreleme */}
        <div className="mb-6 sm:mb-8">
          {" "}
          {/* Mobil için daha az margin */}
          <div className="relative mb-3 sm:mb-4">
            {" "}
            {/* Mobil için daha az margin */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Beslenme önerilerinde ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {" "}
            {/* Mobil için daha az gap ve margin */}
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer text-xs sm:text-sm py-1 px-2 sm:py-1.5 sm:px-3", // Mobil için daha küçük badge
                  selectedTags.includes(tag) ? "bg-pink-500 hover:bg-pink-600" : "hover:bg-pink-100",
                )}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])} className="text-xs">
              Filtreleri Temizle
            </Button>
          )}
        </div>

        <Tabs defaultValue="hamilelik" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 sm:mb-8">
            {" "}
            {/* Mobil için daha az margin */}
            <TabsTrigger value="hamilelik">Hamilelik Beslenmesi</TabsTrigger>
            <TabsTrigger value="bebek">Bebek Beslenmesi</TabsTrigger>
          </TabsList>

          {/* Tab içerikleri için mobil iyileştirmeler */}
          <TabsContent value="hamilelik" className="space-y-4 sm:space-y-6">
            {" "}
            {/* Mobil için daha az boşluk */}
            {filteredPregnancyItems.length > 0 ? (
              <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems} className="w-full">
                {filteredPregnancyItems.map((item) => {
                  const highlightedItems = highlightMatchingItems(item)
                  const hasHighlightedItems = highlightedItems.some((i: any) => i.isHighlighted)

                  return (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className={cn(
                        "border rounded-lg mb-3 sm:mb-4 overflow-hidden", // Mobil için daha az margin
                        recommendedSection === item.id && "border-pink-300 dark:border-pink-700",
                        hasHighlightedItems && selectedTags.length > 0 && "border-pink-300 dark:border-pink-700",
                      )}
                    >
                      <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                        {" "}
                        {/* Mobil için daha az padding */}
                        <div className="flex items-center gap-2 sm:gap-3 text-left">
                          {" "}
                          {/* Mobil için daha az gap */}
                          {item.icon}
                          <div>
                            <h3 className="font-medium text-base sm:text-lg">{item.title}</h3>{" "}
                            {/* Mobil için daha küçük font */}
                            <div className="flex flex-wrap gap-1 mt-1">
                              {recommendedSection === item.id && (
                                <Badge className="bg-pink-500 text-xs">Önerilen</Badge>
                              )}
                              {hasHighlightedItems && selectedTags.length > 0 && (
                                <Badge className="bg-blue-500 text-xs">Eşleşen İçerik</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4">
                        {" "}
                        {/* Mobil için daha az padding */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                          {item.description}
                        </p>{" "}
                        {/* Mobil için daha küçük font ve margin */}
                        <ul className="space-y-1.5 sm:space-y-2">
                          {" "}
                          {/* Mobil için daha az boşluk */}
                          {item.items.map((listItem, index) => {
                            const isHighlighted = selectedTags.some((tag) => listItem.tags.includes(tag))

                            return (
                              <li
                                key={index}
                                className={cn(
                                  "flex items-start p-1.5 sm:p-2 rounded-md transition-colors", // Mobil için daha az padding
                                  isHighlighted && selectedTags.length > 0 ? "bg-pink-50 dark:bg-pink-900/20" : "",
                                )}
                              >
                                <span
                                  className={cn(
                                    "p-1 rounded-full mr-2 mt-1",
                                    isHighlighted && selectedTags.length > 0
                                      ? "bg-pink-200 dark:bg-pink-800 text-pink-600 dark:text-pink-300"
                                      : "bg-pink-100 dark:bg-pink-900 text-pink-500",
                                  )}
                                >
                                  •
                                </span>
                                <span className="text-sm sm:text-base">{listItem.text}</span>{" "}
                                {/* Mobil için daha küçük font */}
                              </li>
                            )
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                  {" "}
                  {/* Mobil için daha az padding */}
                  <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mb-3 sm:mb-4" />{" "}
                  {/* Mobil için daha küçük ikon ve margin */}
                  <h3 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2">Sonuç Bulunamadı</h3>{" "}
                  {/* Mobil için daha küçük font ve margin */}
                  <p className="text-gray-500 text-center max-w-md text-sm sm:text-base">
                    {" "}
                    {/* Mobil için daha küçük font */}
                    Arama kriterlerinize uygun beslenme önerisi bulunamadı. Lütfen farklı bir arama terimi deneyin veya
                    filtreleri temizleyin.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3 sm:mt-4" // Mobil için daha az margin
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedTags([])
                    }}
                  >
                    Filtreleri Temizle
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="bebek" className="space-y-6">
            {filteredBabyItems.length > 0 ? (
              <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems} className="w-full">
                {filteredBabyItems.map((item) => {
                  const highlightedItems = highlightMatchingItems(item)
                  const hasHighlightedItems = highlightedItems.some((i: any) => i.isHighlighted)

                  return (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className={cn(
                        "border rounded-lg mb-4 overflow-hidden",
                        hasHighlightedItems && selectedTags.length > 0 && "border-pink-300 dark:border-pink-700",
                      )}
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-center gap-3 text-left">
                          {item.icon}
                          <div>
                            <h3 className="font-medium text-lg">{item.title}</h3>
                            {hasHighlightedItems && selectedTags.length > 0 && (
                              <Badge className="mt-1 bg-blue-500">Eşleşen İçerik</Badge>
                            )}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                        <ul className="space-y-2">
                          {item.items.map((listItem, index) => {
                            const isHighlighted = selectedTags.some((tag) => listItem.tags.includes(tag))

                            return (
                              <li
                                key={index}
                                className={cn(
                                  "flex items-start p-2 rounded-md transition-colors",
                                  isHighlighted && selectedTags.length > 0 ? "bg-pink-50 dark:bg-pink-900/20" : "",
                                )}
                              >
                                <span
                                  className={cn(
                                    "p-1 rounded-full mr-2 mt-1",
                                    isHighlighted && selectedTags.length > 0
                                      ? "bg-pink-200 dark:bg-pink-800 text-pink-600 dark:text-pink-300"
                                      : "bg-pink-100 dark:bg-pink-900 text-pink-500",
                                  )}
                                >
                                  •
                                </span>
                                <span>{listItem.text}</span>
                              </li>
                            )
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Sonuç Bulunamadı</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Arama kriterlerinize uygun beslenme önerisi bulunamadı. Lütfen farklı bir arama terimi deneyin veya
                    filtreleri temizleyin.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedTags([])
                    }}
                  >
                    Filtreleri Temizle
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-pink-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-pink-500" />
            Beslenme Hakkında Bilgiler
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              Hamilelik ve bebeklik döneminde doğru beslenme, hem anne hem de bebek sağlığı için kritik öneme sahiptir.
              Hamilelik sırasında dengeli ve çeşitli besinler tüketmek, bebeğinizin sağlıklı gelişimini destekler ve
              doğum sonrası toparlanmanızı kolaylaştırır.
            </p>
            <p>
              Bebekler için ilk 6 ay sadece anne sütü veya formül mama önerilir. 6. aydan sonra ek gıdalara
              başlanabilir, ancak her bebeğin gelişimi farklıdır ve ek gıdalara hazır olma belirtileri gösterdiğinden
              emin olun.
            </p>
            <p>
              Bu sayfadaki bilgiler genel önerilerdir. Her hamilelik ve her bebek benzersizdir, bu nedenle beslenme
              konusunda doktorunuz veya diyetisyeninizle görüşmeniz önemlidir.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
