// Hamilelik ile ilgili hesaplamalar ve yardımcı fonksiyonlar

// Hamilelik haftasını hesapla
export function calculatePregnancyWeek(dueDate: Date): number {
  const today = new Date()
  const totalPregnancyDays = 280 // 40 hafta (ortalama hamilelik süresi)

  // Doğum tarihine kalan gün sayısı
  const daysLeft = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  // Geçen hamilelik günleri
  const daysPassed = totalPregnancyDays - daysLeft

  // Hamilelik haftası
  const pregnancyWeek = Math.floor(daysPassed / 7)

  // Geçerli bir hamilelik haftası döndür (1-42 arası)
  return Math.max(1, Math.min(42, pregnancyWeek))
}

// Eksik olan fonksiyonları ekleyelim
// Hamilelik haftası ve günlerini hesapla
export function calculateWeeksDays(dueDate: Date): { weeks: number; days: number } {
  const today = new Date()
  const totalPregnancyDays = 280 // 40 hafta (ortalama hamilelik süresi)

  // Doğum tarihine kalan gün sayısı
  const daysLeft = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  // Geçen hamilelik günleri
  const daysPassed = totalPregnancyDays - daysLeft

  // Hamilelik haftası ve günleri
  const weeks = Math.floor(daysPassed / 7)
  const days = daysPassed % 7

  // Geçerli değerler döndür
  return {
    weeks: Math.max(0, Math.min(42, weeks)),
    days: Math.max(0, Math.min(6, days)),
  }
}

// Alternatif hamilelik haftası hesaplama fonksiyonu
export function getPregnancyWeek(dueDate: Date): number {
  return calculatePregnancyWeek(dueDate)
}

// Trimester bilgisini döndür
export function getTrimester(pregnancyWeek: number): string {
  if (pregnancyWeek <= 13) {
    return "Birinci Trimester"
  } else if (pregnancyWeek <= 26) {
    return "İkinci Trimester"
  } else {
    return "Üçüncü Trimester"
  }
}

// Hamilelik haftasına göre bebek gelişim bilgisi
export function getBabyDevelopmentInfo(pregnancyWeek: number): string {
  const developmentInfo: Record<number, string> = {
    4: "Bebeğiniz şu anda yaklaşık 6 mm boyutunda ve kalbi atmaya başladı.",
    8: "Bebeğiniz artık bir üzüm tanesi büyüklüğünde ve temel organları oluşmaya başladı.",
    12: "Bebeğiniz yaklaşık 6 cm boyunda ve parmakları oluştu. Artık hareket etmeye başlıyor.",
    16: "Bebeğiniz yaklaşık 12 cm boyunda ve cinsiyeti belirlenebilir hale geldi.",
    20: "Bebeğiniz yaklaşık 25 cm boyunda ve ultrason ile daha net görülebiliyor.",
    24: "Bebeğiniz yaklaşık 30 cm boyunda ve akciğerleri gelişmeye devam ediyor.",
    28: "Bebeğiniz yaklaşık 38 cm boyunda ve gözlerini açıp kapatabiliyor.",
    32: "Bebeğiniz yaklaşık 43 cm boyunda ve beyin gelişimi hızlanıyor.",
    36: "Bebeğiniz yaklaşık 47 cm boyunda ve doğuma hazırlanıyor.",
    40: "Bebeğiniz tam gelişmiş durumda ve her an dünyaya gelebilir!",
  }

  // En yakın hafta bilgisini bul
  const weeks = Object.keys(developmentInfo).map(Number)
  const closestWeek = weeks.reduce((prev, curr) =>
    Math.abs(curr - pregnancyWeek) < Math.abs(prev - pregnancyWeek) ? curr : prev,
  )

  return developmentInfo[closestWeek] || "Bu hafta için gelişim bilgisi bulunmuyor."
}

// Hamilelik haftasına göre anne için öneriler
export function getMotherTips(pregnancyWeek: number): string[] {
  const allTips: Record<string, string[]> = {
    early: [
      "Folik asit takviyesi almayı unutmayın.",
      "Bol su için ve dengeli beslenin.",
      "Düzenli doktor kontrollerine gidin.",
      "Alkol, sigara ve kafeinden uzak durun.",
      "Hamilelik vitamini kullanmayı düşünün.",
    ],
    mid: [
      "Hafif egzersizler yapmaya devam edin.",
      "Hamilelik yogası deneyin.",
      "Doğum öncesi eğitim sınıflarına katılmayı düşünün.",
      "Bebeğiniz için hazırlıklara başlayın.",
      "Yeterli kalsiyum aldığınızdan emin olun.",
    ],
    late: [
      "Doğum çantanızı hazırlayın.",
      "Doğum planınızı oluşturun.",
      "Hastaneye gidiş rotanızı planlayın.",
      "Sol tarafınıza yatarak uyumaya çalışın.",
      "Doğum belirtileri hakkında bilgi edinin.",
      "Bebeğinizin hareketlerini takip edin.",
    ],
  }

  if (pregnancyWeek <= 13) {
    return allTips.early
  } else if (pregnancyWeek <= 26) {
    return allTips.mid
  } else {
    return allTips.late
  }
}

// Doğum çantası kontrol listesi
export const birthBagChecklist = [
  {
    id: "documents",
    title: "Belgeler",
    items: [
      { id: "id", name: "Kimlik kartı", checked: false },
      { id: "insurance", name: "Sağlık sigortası kartı", checked: false },
      { id: "birth-plan", name: "Doğum planı", checked: false },
      { id: "hospital-docs", name: "Hastane belgeleri", checked: false },
    ],
  },
  {
    id: "mother",
    title: "Anne İçin",
    items: [
      { id: "nightgown", name: "Gecelik/Pijama", checked: false },
      { id: "slippers", name: "Terlik", checked: false },
      { id: "underwear", name: "Birkaç adet iç çamaşırı", checked: false },
      { id: "toiletries", name: "Kişisel bakım ürünleri", checked: false },
      { id: "nursing-bra", name: "Emzirme sütyeni", checked: false },
      { id: "going-home-outfit", name: "Eve dönüş kıyafeti", checked: false },
      { id: "phone-charger", name: "Telefon şarj cihazı", checked: false },
    ],
  },
  {
    id: "baby",
    title: "Bebek İçin",
    items: [
      { id: "bodysuits", name: "Zıbınlar (3-4 adet)", checked: false },
      { id: "onesies", name: "Tulumlar (2-3 adet)", checked: false },
      { id: "socks", name: "Çoraplar", checked: false },
      { id: "hat", name: "Şapka", checked: false },
      { id: "blanket", name: "Battaniye", checked: false },
      { id: "diapers", name: "Bebek bezleri", checked: false },
      { id: "wipes", name: "Islak mendiller", checked: false },
      { id: "car-seat", name: "Bebek oto koltuğu", checked: false },
    ],
  },
  {
    id: "partner",
    title: "Eş İçin",
    items: [
      { id: "snacks", name: "Atıştırmalıklar", checked: false },
      { id: "change-clothes", name: "Yedek kıyafet", checked: false },
      { id: "toiletries-partner", name: "Kişisel bakım ürünleri", checked: false },
      { id: "camera", name: "Kamera/Fotoğraf makinesi", checked: false },
    ],
  },
]
