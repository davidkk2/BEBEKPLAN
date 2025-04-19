"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FEATURES } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  ShoppingCart,
  Heart,
  Star,
  Check,
  ArrowRight,
  Baby,
  Sparkles,
  Clock,
  List,
  Gift,
  MessageSquare,
  User,
  BookOpen,
  Apple,
} from "lucide-react"
import { format, addDays } from "date-fns"
import { tr } from "date-fns/locale"

export default function HomePage() {
  const [lmpDate, setLmpDate] = useState("")
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [calculatedWeek, setCalculatedWeek] = useState<number | null>(null)
  const [showDueDateResult, setShowDueDateResult] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const featuredRef = useRef<HTMLDivElement>(null)

  // Görünürlük kontrolü için
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (featuredRef.current) {
      observer.observe(featuredRef.current)
    }

    return () => {
      if (featuredRef.current) {
        observer.unobserve(featuredRef.current)
      }
    }
  }, [])

  // Son adet tarihinden hesaplama
  const calculateDueDate = () => {
    if (!lmpDate) return

    try {
      const [day, month, year] = lmpDate.split("/").map(Number)
      const lmp = new Date(year, month - 1, day)

      if (isNaN(lmp.getTime())) {
        alert("Geçerli bir tarih formatı girin (GG/AA/YYYY)")
        return
      }

      // Naegele kuralı: LMP + 280 gün (40 hafta)
      const calculatedDueDate = addDays(lmp, 280)
      setDueDate(calculatedDueDate)

      // Hamilelik haftasını hesapla
      const today = new Date()
      const diffTime = today.getTime() - lmp.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      const week = Math.floor(diffDays / 7)

      if (week >= 0 && week <= 42) {
        setCalculatedWeek(week)
      } else {
        setCalculatedWeek(null)
      }

      setShowDueDateResult(true)
    } catch (error) {
      alert("Geçerli bir tarih formatı girin (GG/AA/YYYY)")
    }
  }

  // Özellikler için sekme içeriği
  const tabContent = [
    {
      title: "Alışveriş Listesi",
      description:
        "Türkiye'nin ilk kişiselleştirilebilir bebek alışveriş listesi ile tüm ihtiyaçlarınızı planlayın, organize edin ve takip edin.",
      features: [
        "Kişiselleştirilmiş alışveriş listeleri",
        "Doğum çantası hazırlama rehberi",
        "Bebek odası planlama araçları",
        "Önerilen ürünler ve kategoriler",
        "İlerleme takibi ve hatırlatıcılar",
      ],
      image: "/images/alisveris-listesi.png",
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "bg-pink-500",
      link: "/alisveris-listesi",
    },
    {
      title: "Doğum Sayacı",
      description: "Bebeğinizin dünyaya gelişine ne kadar kaldığını gün, saat, dakika ve saniye olarak takip edin.",
      features: [
        "Kişiselleştirilmiş doğum sayacı",
        "Haftalık gelişim bilgileri",
        "Trimester takibi",
        "Sosyal medyada paylaşım",
        "Önemli tarihlerin hatırlatıcıları",
      ],
      image: "/images/dogum-tarihi.png",
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-blue-500",
      link: "/dogum-sayaci",
    },
    {
      title: "Gelişim Takibi",
      description: "Bebeğinizin haftalık ve aylık gelişimini detaylı olarak takip edin.",
      features: [
        "Haftalık gelişim bilgileri",
        "Bebeğinizin boy ve kilo takibi",
        "Gelişim kilometre taşları",
        "Uzman tavsiyeleri",
        "Kişiselleştirilmiş gelişim grafikleri",
      ],
      image: "/images/kisisellestirilmis-alisveris.png",
      icon: <Baby className="h-5 w-5" />,
      color: "bg-purple-500",
      link: "/gelisim-takibi",
    },
    {
      title: "Yapay Zeka Asistanı",
      description: "Hamilelik ve bebek bakımı hakkında tüm sorularınızı yanıtlayan yapay zeka asistanımız.",
      features: [
        "7/24 soru-cevap desteği",
        "Uzman kaynaklardan bilgiler",
        "Kişiselleştirilmiş tavsiyeler",
        "Hamilelik ve bebek bakımı ipuçları",
        "Sağlık ve beslenme önerileri",
      ],
      image: "/images/alisveris-listesi.png",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "bg-green-500",
      link: "/asistan",
    },
  ]

  // Nasıl çalışır adımları
  const howItWorks = [
    {
      title: "Hesap Oluşturun",
      description: "Ücretsiz hesap oluşturarak BebekPlan'ın tüm özelliklerine erişin.",
      icon: <User className="h-10 w-10 text-pink-500" />,
    },
    {
      title: "Bilgilerinizi Girin",
      description: "Hamilelik bilgilerinizi girerek kişiselleştirilmiş deneyim yaşayın.",
      icon: <List className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Listelerinizi Oluşturun",
      description: "İhtiyaçlarınıza göre kişiselleştirilmiş alışveriş listeleri oluşturun.",
      icon: <ShoppingCart className="h-10 w-10 text-purple-500" />,
    },
    {
      title: "Takip Edin ve Keyfini Çıkarın",
      description: "Gelişiminizi takip edin ve hamilelik sürecinizin keyfini çıkarın.",
      icon: <Heart className="h-10 w-10 text-red-500" />,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section - Yeni Tasarım */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-purple-900/20">
        {/* Dekoratif arka plan öğeleri */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl dark:bg-pink-900/20"></div>
          <div className="absolute top-40 -left-20 w-60 h-60 bg-purple-200/30 rounded-full blur-3xl dark:bg-purple-900/20"></div>
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-blue-200/20 rounded-full blur-3xl dark:bg-blue-900/20"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Türkiye'nin İlk Bebek Alışveriş Platformu</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400">
                Kişiselleştirilebilir Bebek Alışveriş Listeleri
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
                Hamilelikten bebeklik dönemine kadar tüm ihtiyaçlarınızı planlayın, organize edin ve takip edin.
                Kişiselleştirilmiş alışveriş listeleri ile hiçbir şeyi unutmayın.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/alisveris-listesi" className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Alışveriş Listesi Oluştur</span>
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/20"
                >
                  <Link href="/dogum-sayaci" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>Doğum Sayacı</span>
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">10,000+</span> mutlu anne tarafından
                  kullanılıyor
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-xl">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
                <Image
                  src="/images/kisisellestirilmis-alisveris.png"
                  alt="BebekPlan Alışveriş Listesi"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <Badge className="w-fit mb-2 bg-pink-500 text-white border-0">Yeni Özellik</Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">Kişiselleştirilmiş Alışveriş Listeleri</h3>
                  <p className="text-white/90 mb-4">
                    Bebeğiniz için ihtiyacınız olan her şeyi organize edin ve takip edin
                  </p>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -right-4 top-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 animate-float">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Doğum Çantası Hazır!</span>
                </div>
              </div>

              <div className="absolute -left-4 bottom-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 animate-float-delay">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">32 gün kaldı</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto fill-white dark:fill-gray-950"
            preserveAspectRatio="none"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Öne Çıkan Özellikler - Sekmeli Tasarım */}
      <section ref={featuredRef} className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              <Star className="h-3.5 w-3.5 mr-1" />
              Öne Çıkan Özellikler
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bebeğiniz İçin Tüm İhtiyaçlarınız</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              BebekPlan ile hamilelik ve bebeklik dönemini kolayca yönetin. Kişiselleştirilmiş araçlarımızla sürecinizi
              kontrol altında tutun.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabContent.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                  activeTab === index
                    ? `${tab.color} text-white`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
            <div
              className={`order-2 md:order-1 ${
                isVisible ? "animate-fade-in-left" : "opacity-0"
              } transition-all duration-700`}
            >
              <Badge
                className={`mb-4 ${tabContent[activeTab].color
                  .replace("bg-", "bg-opacity-10 text-")
                  .replace("500", "700")} dark:text-opacity-90`}
              >
                {tabContent[activeTab].icon}
                <span className="ml-1">{tabContent[activeTab].title}</span>
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{tabContent[activeTab].title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{tabContent[activeTab].description}</p>

              <ul className="space-y-3 mb-8">
                {tabContent[activeTab].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div
                      className={`mr-3 mt-1 p-1 rounded-full ${tabContent[activeTab].color
                        .replace("bg-", "bg-opacity-10 text-")
                        .replace("500", "700")} dark:text-opacity-90`}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className={`rounded-full ${tabContent[activeTab].color} hover:opacity-90 text-white`}>
                <Link href={tabContent[activeTab].link} className="flex items-center gap-2">
                  <span>Hemen Başla</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div
              className={`order-1 md:order-2 ${
                isVisible ? "animate-fade-in-right" : "opacity-0"
              } transition-all duration-700`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-8 border-white dark:border-gray-800">
                <Image
                  src={tabContent[activeTab].image || "/placeholder.svg"}
                  alt={tabContent[activeTab].title}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nasıl Çalışır */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 relative overflow-hidden">
        {/* Dekoratif arka plan öğeleri */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-60 h-60 bg-pink-200/30 rounded-full blur-3xl dark:bg-pink-900/20"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 bg-purple-200/30 rounded-full blur-3xl dark:bg-purple-900/20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              <Clock className="h-3.5 w-3.5 mr-1" />
              Nasıl Çalışır
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dört Kolay Adımda Başlayın</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              BebekPlan'ı kullanmaya başlamak çok kolay. Sadece birkaç adımda kişiselleştirilmiş deneyiminizi oluşturun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-700 dark:text-pink-300 font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/kayit">
                <span>Hemen Ücretsiz Hesap Oluştur</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Doğum Tarihi Hesaplayıcı */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                Doğum Tarihi Hesaplayıcı
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Bebeğinizin Doğum Tarihini Öğrenin</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                Son adet döneminizin ilk gününü girerek tahmini doğum tarihinizi ve hamilelik haftanızı öğrenin.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="mb-4">
                  <label htmlFor="lmpDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Son adet döneminizin ilk günü (GG/AA/YYYY)
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="lmpDate"
                      placeholder="Örn: 01/05/2023"
                      value={lmpDate}
                      onChange={(e) => setLmpDate(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:text-white"
                    />
                    <Button
                      onClick={calculateDueDate}
                      className="rounded-l-none bg-pink-500 hover:bg-pink-600 text-white"
                    >
                      Hesapla
                    </Button>
                  </div>
                </div>

                {showDueDateResult && dueDate && (
                  <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg animate-fade-in">
                    <h3 className="font-semibold text-lg mb-2">Hesaplama Sonucu</h3>
                    <p className="mb-1">
                      <span className="font-medium">Tahmini Doğum Tarihi:</span>{" "}
                      {format(dueDate, "d MMMM yyyy", { locale: tr })}
                    </p>
                    {calculatedWeek !== null && (
                      <p>
                        <span className="font-medium">Hamilelik Haftası:</span> {calculatedWeek}. hafta
                      </p>
                    )}
                    <div className="mt-4">
                      <Button asChild variant="outline" size="sm" className="text-pink-500 border-pink-500">
                        <Link href="/dogum-sayaci" className="flex items-center gap-2">
                          <span>Doğum Sayacı Oluştur</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-8 border-white dark:border-gray-800">
                <Image
                  src="/images/dogum-tarihi.png"
                  alt="Hamilelik Takvimi"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Hafta Hafta Hamilelik</h3>
                  <p className="text-white/90 mb-4">
                    Bebeğinizin gelişimini ve vücudunuzdaki değişimleri hafta hafta takip edin
                  </p>
                  <Button asChild variant="secondary" className="w-fit">
                    <Link href="/gelisim-takibi">Gelişim Takibine Git</Link>
                  </Button>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -right-4 top-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 animate-float">
                <div className="flex items-center gap-2">
                  <Baby className="h-5 w-5 text-pink-500" />
                  <span className="text-sm font-medium">24. Hafta</span>
                </div>
              </div>

              <div className="absolute -left-4 bottom-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 animate-float-delay">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-purple-500" />
                  <span className="text-sm font-medium">Doğum Çantası</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kullanıcı Yorumları ve Google Yorumları */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 relative overflow-hidden">
        {/* Dekoratif arka plan öğeleri */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-60 h-60 bg-pink-200/30 rounded-full blur-3xl dark:bg-pink-900/20"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 bg-purple-200/30 rounded-full blur-3xl dark:bg-purple-900/20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
              <Heart className="h-3.5 w-3.5 mr-1" />
              Kullanıcı Yorumları
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mutlu Annelerden</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              BebekPlan'ı kullanan annelerin deneyimleri ve başarı hikayeleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Ayşe K.",
                role: "Yeni Anne",
                content:
                  "BebekPlan sayesinde bebeğimin gelişimini kolayca takip edebiliyorum. Özellikle alışveriş listesi özelliği hamilelik dönemimde çok işime yaradı.",
              },
              {
                name: "Zeynep M.",
                role: "Hamile",
                content:
                  "Kişiselleştirilmiş alışveriş listesi ve yapay zeka asistanı ile tüm sorularıma anında cevap bulabiliyorum. Harika bir uygulama!",
              },
              {
                name: "Elif B.",
                role: "2 Çocuk Annesi",
                content:
                  "İkinci bebeğimde de BebekPlan'ı kullanıyorum. Doğum çantası listesi ve bebek odası planlama araçları sayesinde hiçbir şeyi unutmuyorum.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{testimonial.content}</p>
                  <div className="flex items-center mt-auto">
                    <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-pink-600 dark:text-pink-300">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-950/20"
            >
              <Link href="/blog">
                <span>Daha Fazla Deneyim Oku</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-pink-500 to-purple-600 text-white relative overflow-hidden">
        {/* Dekoratif arka plan öğeleri */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-0">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Türkiye'nin İlk Bebek Alışveriş Platformu
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Kişiselleştirilmiş Bebek Alışveriş Deneyimi
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Ücretsiz kaydolun ve BebekPlan'ın sunduğu tüm özelliklere anında erişim kazanın. Kişiselleştirilmiş
              alışveriş listeleri, doğum çantası planlama ve daha fazlası sizi bekliyor!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-pink-600 hover:bg-gray-100 hover:text-pink-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/alisveris-listesi" className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Alışveriş Listesi Oluştur</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-white text-white hover:bg-white/10"
              >
                <Link href="/kayit" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>Hesap Oluştur</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Özellikler Grid */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              <Check className="h-3.5 w-3.5 mr-1" />
              Tüm Özellikler
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">BebekPlan'da Neler Var?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              BebekPlan'ın sunduğu tüm özellikleri keşfedin ve hamilelik sürecinizi kolaylaştırın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
                    {feature.icon === "ShoppingCart" ? (
                      <ShoppingCart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    ) : feature.icon === "Baby" ? (
                      <Baby className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    ) : feature.icon === "Calendar" ? (
                      <Calendar className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    ) : feature.icon === "MessageSquare" ? (
                      <MessageSquare className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    ) : feature.icon === "User" ? (
                      <User className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    ) : feature.icon === "BookOpen" ? (
                      <BookOpen className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    ) : feature.icon === "Apple" ? (
                      <Apple className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    ) : (
                      <Star className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{feature.description}</p>
                  <Button
                    asChild
                    variant={feature.featured ? "default" : "outline"}
                    className={
                      feature.featured ? "mt-auto w-full bg-pink-500 hover:bg-pink-600 text-white" : "mt-auto w-full"
                    }
                  >
                    <Link href={feature.href}>{feature.buttonText}</Link>
                  </Button>
                  {feature.featured && (
                    <span className="inline-block mt-2 text-xs font-semibold text-pink-500 dark:text-pink-400">
                      Yeni Özellik!
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
