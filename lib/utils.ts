import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "Tarih belirtilmemiş"

  try {
    const date = new Date(dateString)

    // Geçersiz tarih kontrolü
    if (isNaN(date.getTime())) {
      return "Tarih belirtilmemiş"
    }

    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  } catch (error) {
    console.error("Tarih formatlanırken hata oluştu:", error)
    return "Tarih belirtilmemiş"
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function getReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return `${readingTime} dk`
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function calculateDueDate(lastPeriodDate: Date): Date {
  const dueDate = new Date(lastPeriodDate)
  dueDate.setDate(dueDate.getDate() + 280) // 40 weeks (280 days) from last period
  return dueDate
}

export function calculatePregnancyWeek(lastPeriodDate: Date): number {
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - lastPeriodDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(diffDays / 7)

  // Negatif hafta olmaması için kontrol
  if (weeks < 0) return 0

  // 42 haftadan fazla olmaması için kontrol
  return weeks > 42 ? 42 : weeks
}

export function getPregnancyTrimester(weeks: number): string {
  if (weeks < 13) return "Birinci Trimester"
  if (weeks < 27) return "İkinci Trimester"
  return "Üçüncü Trimester"
}

export function getDaysUntilDueDate(dueDate: Date): number {
  const today = new Date()
  const diffTime = Math.abs(dueDate.getTime() - today.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function isValidDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime())
}

export function getPregnancyProgress(lastPeriodDate: Date): number {
  const weeks = calculatePregnancyWeek(lastPeriodDate)
  return Math.min(Math.round((weeks / 40) * 100), 100) // Cap at 100%
}

export function formatDateForInput(date: Date): string {
  return date.toISOString().split("T")[0]
}

export function getWeekRange(week: number): string {
  if (week < 1 || week > 42) return "Geçersiz hafta"

  const ranges = [
    "1-4 hafta: Embriyonik dönem başlangıcı",
    "5-8 hafta: Organların oluşmaya başlaması",
    "9-12 hafta: Fetüs dönemine geçiş",
    "13-16 hafta: Cinsiyet belirginleşmeye başlar",
    "17-20 hafta: Hareketler hissedilmeye başlar",
    "21-24 hafta: Akciğerler gelişmeye devam eder",
    "25-28 hafta: Gözler açılır ve kapanır",
    "29-32 hafta: Beyin hızla gelişir",
    "33-36 hafta: Akciğerler olgunlaşır",
    "37-40 hafta: Doğuma hazırlık",
    "41-42 hafta: Geç dönem",
  ]

  const rangeIndex = Math.floor((week - 1) / 4)
  return ranges[Math.min(rangeIndex, ranges.length - 1)]
}

export function getPregnancySymptoms(week: number): string[] {
  const allSymptoms = {
    "1-4": ["Bulantı", "Yorgunluk", "Göğüslerde hassasiyet"],
    "5-8": ["Sabah bulantıları", "Sık idrara çıkma", "Yorgunluk"],
    "9-12": ["Bulantıların azalması", "Kilo artışı başlangıcı", "Cilt değişimleri"],
    "13-16": ["Enerji artışı", "İştah artışı", "Burun tıkanıklığı"],
    "17-20": ["Bebek hareketleri", "Sırt ağrısı", "Cilt lekeleri"],
    "21-24": ["Karın büyümesi", "Ayaklarda şişme", "Bacak krampları"],
    "25-28": ["Nefes darlığı", "Hemoroid", "Uykusuzluk"],
    "29-32": ["Sık idrara çıkma (tekrar)", "Mide yanması", "Braxton Hicks kasılmaları"],
    "33-36": ["Pelvik baskı", "Yorgunluk (tekrar)", "Sırt ağrısı artışı"],
    "37-40": ["Enerji patlaması", "Daha sık kasılmalar", "Mukus tıkacı kaybı"],
    "41-42": ["Rahatsızlık", "Uykusuzluk", "Sabırsızlık"],
  }

  const rangeKey = Object.keys(allSymptoms).find((range) => {
    const [start, end] = range.split("-").map(Number)
    return week >= start && week <= end
  })

  return rangeKey ? allSymptoms[rangeKey as keyof typeof allSymptoms] : ["Belirsiz"]
}

export function getPregnancyTips(week: number): string[] {
  const allTips = {
    "1-4": ["Folik asit takviyesi alın", "Alkol ve sigaradan uzak durun", "Düzenli doktor kontrollerine başlayın"],
    "5-8": ["Küçük ve sık öğünler yiyin", "Bol su için", "Yeterli dinlenin"],
    "9-12": ["Hafif egzersizlere başlayın", "Sağlıklı beslenmeye devam edin", "Hamilelik vitamini kullanın"],
    "13-16": [
      "Hamile kıyafetleri almayı düşünün",
      "Düzenli yürüyüşler yapın",
      "Bebeğiniz için planlar yapmaya başlayın",
    ],
    "17-20": [
      "Bebeğinizin cinsiyetini öğrenebilirsiniz",
      "Kegel egzersizleri yapın",
      "Doğum öncesi eğitimlere katılmayı düşünün",
    ],
    "21-24": [
      "Bebeğinizin odasını hazırlamaya başlayın",
      "Doğum planınızı düşünün",
      "Sırt ve bel desteği için yastık kullanın",
    ],
    "25-28": [
      "Gestasyonel diyabet testi yaptırın",
      "Doğum çantanızı hazırlamaya başlayın",
      "Bebeğinizin hareketlerini takip edin",
    ],
    "29-32": ["Doğum öncesi sınıflara katılın", "Emzirme hakkında bilgi edinin", "Bebeğinizin odasını tamamlayın"],
    "33-36": [
      "Doğum çantanızı tamamlayın",
      "Hastaneye gidiş planınızı yapın",
      "Bebeğinizin bakımı için hazırlık yapın",
    ],
    "37-40": ["Doğum belirtilerini öğrenin", "Dinlenmeye öncelik verin", "Ailenizle son hazırlıkları tamamlayın"],
    "41-42": ["Doktorunuzla yakın temas halinde olun", "Hafif yürüyüşler yapın", "Sakin ve pozitif kalmaya çalışın"],
  }

  const rangeKey = Object.keys(allTips).find((range) => {
    const [start, end] = range.split("-").map(Number)
    return week >= start && week <= end
  })

  return rangeKey ? allTips[rangeKey as keyof typeof allTips] : ["Doktorunuzla görüşün"]
}
