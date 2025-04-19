// Uygulama genelinde kullanılan sabit değerler
export const APP_NAME = "BebekPlan"
export const APP_DESCRIPTION =
  "Türkiye'nin ilk en kapsamlı kişiselleştirilebilir bebek alışveriş websitesi ve hamilelik takip uygulaması"
export const APP_URL = "https://bebekplan.com"

// Navigasyon linkleri
export const NAV_LINKS = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Gelişim Takibi", path: "/gelisim-takibi" },
  { name: "Doğum Sayacı", path: "/dogum-sayaci" },
  { name: "Beslenme", path: "/beslenme" },
  { name: "Blog", path: "/blog" },
  { name: "Asistan", path: "/asistan" },
  { name: "Alışveriş Listesi", path: "/alisveris-listesi", highlight: true },
]

// Özellikler
export const FEATURES = [
  {
    icon: "ShoppingCart", // Alışveriş listesi için uygun bir ikon
    title: "Kişiselleştirilebilir Alışveriş Listesi",
    description: "Türkiye'nin ilk kişiselleştirilebilir bebek alışveriş listesi ile tüm ihtiyaçlarınızı planlayın",
    href: "/alisveris-listesi",
    buttonText: "Alışveriş Listesine Git",
    featured: true, // Öne çıkan özellik olarak işaretle
  },
  {
    icon: "Baby",
    title: "Gelişim Takibi",
    description: "Bebeğinizin yaş gruplarına göre gelişim aşamalarını takip edin",
    href: "/gelisim-takibi",
    buttonText: "Gelişim Takibine Git",
  },
  {
    icon: "Calendar",
    title: "Doğum Sayacı",
    description: "Bebeğinizin dünyaya gelişine ne kadar kaldığını görün",
    href: "/dogum-sayaci",
    buttonText: "Doğum Sayacına Git",
  },
  {
    icon: "Apple",
    title: "Beslenme Önerileri",
    description: "Hamilelik ve bebeklik döneminde sağlıklı beslenme tavsiyeleri",
    href: "/beslenme",
    buttonText: "Beslenme Önerilerine Git",
  },
  {
    icon: "BookOpen",
    title: "Blog",
    description: "Hamilelik ve bebek bakımı ile ilgili faydalı makaleler",
    href: "/blog",
    buttonText: "Blogu Ziyaret Et",
  },
  {
    icon: "MessageSquare",
    title: "Yapay Zeka Asistanı",
    description: "Sorularınızı yanıtlayan akıllı chatbot",
    href: "/asistan",
    buttonText: "Asistana Sor",
  },
  {
    icon: "User",
    title: "Profil",
    description: "Bebek bilgilerinizi kaydedin ve kişiselleştirilmiş öneriler alın",
    href: "/profil",
    buttonText: "Profiline Git",
  },
]

// Kullanıcı yorumları
export const TESTIMONIALS = [
  {
    name: "Ayşe K.",
    avatar: "AK",
    role: "Yeni Anne",
    content:
      "BebekPlan sayesinde bebeğimin gelişimini kolayca takip edebiliyorum. Özellikle doğum sayacı özelliği hamilelik dönemimde çok işime yaradı.",
  },
  {
    name: "Zeynep M.",
    avatar: "ZM",
    role: "Hamile",
    content:
      "Beslenme önerileri ve yapay zeka asistanı ile tüm sorularıma anında cevap bulabiliyorum. Harika bir uygulama!",
  },
  {
    name: "Elif B.",
    avatar: "EB",
    role: "2 Çocuk Annesi",
    content:
      "İkinci bebeğimde de BebekPlan'ı kullanıyorum. Gelişim takibi özelliği ile bebeğimin hangi aşamada olduğunu görmek çok faydalı.",
  },
]

// Sık sorulan sorular
export const FAQS = [
  {
    question: "Bebeğim ne zaman katı gıdalara başlayabilir?",
    answer:
      "Bebekler genellikle 6 aylık olduklarında katı gıdalara başlayabilirler. İlk olarak pirinç püresi veya tek bir meyve püresi ile başlamak iyi bir seçenektir.",
  },
  {
    question: "Hamilelikte ne kadar kilo almalıyım?",
    answer:
      "Hamilelikte sağlıklı kilo alımı, başlangıç kilonuza ve vücut kitle indeksinize bağlıdır. Genel olarak, normal kilolu bir kadın için 11-16 kg arası kilo alımı normaldir.",
  },
  {
    question: "Yenidoğan bebekler günde kaç saat uyur?",
    answer:
      "Yenidoğan bebekler günde ortalama 16-17 saat uyurlar, ancak bu uyku genellikle 2-3 saatlik periyotlar halinde olur.",
  },
  {
    question: "Bebeklerde pişik nasıl önlenir?",
    answer:
      "Bebeklerde pişiği önlemek için bezi sık değiştirmek, bebeğin poposunu her bez değişiminde temizlemek, poponun havalanmasını sağlamak ve uygun pişik kremleri kullanmak önemlidir.",
  },
  {
    question: "Emzirme sırasında anne nasıl beslenmeli?",
    answer:
      "Emziren anneler dengeli ve çeşitli besinlerle beslenmelidir. Günde en az 2-2.5 litre su içmeli, protein, kalsiyum ve demir açısından zengin gıdalar tüketmelidir. Kafein ve alkol tüketimini sınırlandırmalıdır.",
  },
]

// Bebek bakımı ve hamilelik ipuçları
export const BABY_TIPS = [
  "Bebeğin 3. ayında hangi gelişim aşamalarından geçtiğini biliyor musun?",
  "Bebek kıyafetlerini yıkarken dikkat edilmesi gereken noktalar nelerdir?",
  "Mama hazırlarken nelere dikkat etmeliyim?",
  "Bebeğin uyku düzenini nasıl oturtabilirim?",
  "Hamilelikte hangi egzersizler güvenlidir?",
  "Bebeğin göbek bağı bakımı nasıl yapılır?",
  "Emzirme sırasında yaşanan sorunlarla nasıl başa çıkabilirim?",
  "Bebeklerde gaz sorununu gidermenin yolları nelerdir?",
  "Hamilelikte beslenme düzeni nasıl olmalıdır?",
  "Bebeğin diş çıkarma belirtileri nelerdir?",
  "Bebek masajının faydaları nelerdir?",
  "Bebeğin bağışıklık sistemini güçlendirmek için neler yapabilirim?",
  "Hamilelikte yaşanan bulantılarla nasıl başa çıkabilirim?",
  "Bebeğin ilk banyo rutini nasıl olmalıdır?",
  "Bebeğin ateşi çıktığında ne yapmalıyım?",
  "Hamilelikte hangi besinlerden kaçınmalıyım?",
  "Bebeğin aşı takvimi nasıl takip edilmelidir?",
  "Bebeklerde kolik nedir ve nasıl rahatlatılır?",
  "Hamilelikte uyku pozisyonları nasıl olmalıdır?",
  "Bebeğin ilk kelimelerini söylemesi için neler yapabilirim?",
]

// SEO için yapısal veri
export const getStructuredData = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME,
    url: APP_URL,
    description: APP_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${APP_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    sameAs: ["https://facebook.com/bebekplan", "https://instagram.com/bebekplan", "https://twitter.com/bebekplan"],
    publisher: {
      "@type": "Organization",
      name: APP_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${APP_URL}/logo.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Gelişim Takibi",
          url: `${APP_URL}/gelisim-takibi`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Doğum Sayacı",
          url: `${APP_URL}/dogum-sayaci`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Beslenme Önerileri",
          url: `${APP_URL}/beslenme`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Blog",
          url: `${APP_URL}/blog`,
        },
      ],
    },
  })
}

// Sık sorulan sorular için FAQ schema.org yapısı
export const getFAQStructuredData = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  })
}
