export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    title: string
  }
  publishedAt: string
  readingTime: number
  category: string
  tags: string[]
  image: string
  featured?: boolean
  didYouKnow?: string[]
  factOrMyth?: Array<{
    statement: string
    isTrue: boolean
    explanation: string
  }>
  quiz?: {
    title: string
    questions: Array<{
      id: string
      question: string
      options: string[]
      correctAnswer: number
      explanation: string
    }>
  }
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "hamilelikte-beslenme-rehberi",
    title: "Hamilelikte Beslenme Rehberi: Sağlıklı Bir Gebelik İçin İpuçları",
    excerpt:
      "Hamilelik sürecinde doğru beslenme, hem annenin hem de bebeğin sağlığı için kritik öneme sahiptir. Bu rehberde, hamilelik döneminde beslenme konusunda bilmeniz gereken her şeyi bulabilirsiniz.",
    content: `
      <p>Hamilelik, bir kadının hayatındaki en özel ve önemli dönemlerden biridir. Bu süreçte beslenme alışkanlıklarınız, hem sizin hem de bebeğinizin sağlığını doğrudan etkiler. Doğru beslenme, bebeğinizin gelişimini desteklerken, sizin de enerji seviyenizi yüksek tutmanıza yardımcı olur.</p>

      <h2>İlk Üç Ay (1. Trimester)</h2>
      <p>Hamileliğin ilk üç ayında, birçok kadın bulantı ve kusma gibi sorunlarla karşılaşır. Bu dönemde beslenmenizde dikkat etmeniz gereken noktalar:</p>
      <ul>
        <li>Küçük ve sık öğünler tüketin</li>
        <li>Sabah kalkar kalkmaz kuru kraker veya tost yiyin</li>
        <li>Zencefil çayı bulantıyı azaltabilir</li>
        <li>Folik asit açısından zengin gıdalar tüketin (yeşil yapraklı sebzeler, kuruyemişler)</li>
        <li>Günde en az 2 litre su için</li>
      </ul>

      <h2>İkinci Üç Ay (2. Trimester)</h2>
      <p>Bu dönemde genellikle bulantılar azalır ve iştahınız artar. Bebeğinizin gelişimi hızlanır, bu nedenle protein ve kalsiyum alımı önemlidir:</p>
      <ul>
        <li>Süt, yoğurt ve peynir gibi kalsiyum kaynakları tüketin</li>
        <li>Yumurta, et, balık ve baklagiller gibi protein kaynakları önemlidir</li>
        <li>Demir açısından zengin gıdalar (kırmızı et, ıspanak) tüketin</li>
        <li>Omega-3 için haftada 2-3 kez yağlı balık tüketin</li>
        <li>Tam tahıllı ürünler tercih edin</li>
      </ul>

      <h2>Son Üç Ay (3. Trimester)</h2>
      <p>Hamileliğin son döneminde bebeğiniz hızla büyür ve daha fazla kalori ihtiyacınız olur:</p>
      <ul>
        <li>Günlük kalori alımınızı yaklaşık 300-500 kalori artırın</li>
        <li>D vitamini için güneş ışığından faydalanın ve süt ürünleri tüketin</li>
        <li>Kabızlığı önlemek için lifli gıdalar ve bol su tüketin</li>
        <li>Şişlik ve hazımsızlık için küçük ve sık öğünler tercih edin</li>
        <li>Magnezyum açısından zengin gıdalar (koyu yeşil sebzeler, kuruyemişler) tüketin</li>
      </ul>

      <h2>Kaçınılması Gereken Gıdalar</h2>
      <p>Hamilelik sürecinde bazı gıdalardan kaçınmak bebeğinizin sağlığı için önemlidir:</p>
      <ul>
        <li>Çiğ veya az pişmiş et, balık ve yumurta</li>
        <li>Pastörize edilmemiş süt ürünleri</li>
        <li>Alkol (hiçbir miktarda güvenli değildir)</li>
        <li>Kafein (günde 200 mg'dan fazla)</li>
        <li>Yüksek cıva içeren balıklar (kılıç balığı, köpek balığı)</li>
        <li>İşlenmiş et ürünleri (salam, sosis)</li>
      </ul>

      <p>Unutmayın, her hamilelik benzersizdir ve beslenme ihtiyaçlarınız kişisel sağlık durumunuza göre değişebilir. Bu nedenle, doktorunuz veya bir diyetisyenle görüşerek size özel bir beslenme planı oluşturmanız en doğru yaklaşım olacaktır.</p>
    `,
    author: {
      name: "Dr. Ayşe Yılmaz",
      avatar: "AY",
      title: "Kadın Doğum Uzmanı",
    },
    publishedAt: "2023-05-15",
    readingTime: 8,
    category: "Hamilelik",
    tags: ["beslenme", "hamilelik", "sağlık", "gebelik"],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hamilelikte%20Beslenme%20Rehberi%20Sa%C4%9Fl%C4%B1kl%C4%B1%20Bir%20Gebelik%20%C4%B0%C3%A7in%20%C4%B0pu%C3%A7lar%C4%B1.jpg-gThFXOOhIxFLwZYo58GWkVstLMEoVd.jpeg",
    featured: true,
    didYouKnow: [
      "Hamilelikte günlük folik asit ihtiyacınız iki katına çıkar",
      "Hamilelikte ortalama 10-12.5 kg kilo alımı normaldir",
      "Bebeğinizin beyin gelişimi için omega-3 yağ asitleri kritik öneme sahiptir",
      "Hamilelikte demir ihtiyacınız %50 oranında artar",
    ],
    factOrMyth: [
      {
        statement: "Hamilelikte iki kişilik yemek yemelisiniz",
        isTrue: false,
        explanation:
          "Hamilelikte kalori ihtiyacınız artar, ancak 'iki kişilik' yemek doğru değildir. İlk trimesterde ek kaloriye gerek yoktur, ikinci trimesterde günde 340, üçüncü trimesterde ise 450 ek kalori yeterlidir.",
      },
      {
        statement: "Hamilelikte balık tüketimi tehlikelidir",
        isTrue: false,
        explanation:
          "Tüm balıklar değil, sadece yüksek cıva içeren balıklar (kılıç, köpek balığı) tehlikelidir. Somon, sardalye gibi düşük cıvalı balıklar omega-3 kaynağı olarak faydalıdır.",
      },
      {
        statement: "Hamilelikte kafein tamamen yasaktır",
        isTrue: false,
        explanation:
          "Günde 200 mg'a kadar kafein (yaklaşık 1-2 fincan kahve) güvenli kabul edilir. Ancak aşırı kafein tüketimi düşük riskini artırabilir.",
      },
      {
        statement: "Hamilelikte folik asit takviyesi önemlidir",
        isTrue: true,
        explanation:
          "Folik asit, nöral tüp defektleri riskini azaltır. Hamilelikten en az bir ay önce başlayarak günde 400-800 mcg folik asit alınması önerilir.",
      },
    ],
    quiz: {
      title: "Hamilelikte Beslenme Bilginizi Test Edin",
      questions: [
        {
          id: "q1",
          question: "Hamilelikte günlük olarak ne kadar su tüketilmelidir?",
          options: [
            "4-5 bardak (1 litre)",
            "6-8 bardak (1.5-2 litre)",
            "10-12 bardak (2.5-3 litre)",
            "Su kısıtlaması yapılmalıdır",
          ],
          correctAnswer: 2,
          explanation:
            "Hamilelikte günde 10-12 bardak (2.5-3 litre) su içmek önerilir. Yeterli su tüketimi, amniyon sıvısının oluşumu, besin taşınımı ve toksinlerin atılması için önemlidir.",
        },
        {
          id: "q2",
          question: "Aşağıdakilerden hangisi hamilelikte kaçınılması gereken bir gıda DEĞİLDİR?",
          options: ["Pastörize süt", "Çiğ balık (sushi)", "Yumuşak peynirler (beyaz peynir)", "Alkollü içecekler"],
          correctAnswer: 0,
          explanation:
            "Pastörize süt, hamilelikte güvenle tüketilebilir. Diğer seçenekler (çiğ balık, pastörize edilmemiş yumuşak peynirler ve alkol) hamilelikte kaçınılması gereken gıdalardır.",
        },
        {
          id: "q3",
          question: "Hamilelikte folik asit hangi besinlerde bulunur?",
          options: [
            "Et ve süt ürünleri",
            "Yeşil yapraklı sebzeler ve kuruyemişler",
            "Şekerli gıdalar ve tatlılar",
            "Sadece takviyelerden alınabilir",
          ],
          correctAnswer: 1,
          explanation:
            "Folik asit özellikle yeşil yapraklı sebzeler (ıspanak, marul), kuruyemişler, baklagiller ve tahıllarda bulunur. Hamilelikte takviye olarak da alınması önerilir.",
        },
      ],
    },
  },
  {
    id: "2",
    slug: "bebek-uyku-duzenini-saglamanin-yollari",
    title: "Bebek Uyku Düzenini Sağlamanın Yolları",
    excerpt:
      "Bebeğinizin uyku düzenini sağlamak, hem onun sağlıklı gelişimi hem de sizin dinlenmeniz için önemlidir. Bu yazıda, bebeklerde sağlıklı uyku alışkanlıkları geliştirmenin yollarını bulabilirsiniz.",
    content: `
      <p>Yeni ebeveynlerin en büyük zorluklarından biri, bebeklerinin uyku düzenini sağlamaktır. Düzenli ve kaliteli uyku, bebeğinizin fiziksel ve zihinsel gelişimi için kritik öneme sahiptir. Aynı zamanda, ebeveynlerin de dinlenmesi ve günlük yaşamlarını sürdürebilmeleri için bebeğin düzenli uyuması önemlidir.</p>

      <h2>Bebeklerde Uyku Düzeni Nasıl Gelişir?</h2>
      <p>Yenidoğan bebekler günde 16-17 saat uyurlar, ancak bu uyku 2-3 saatlik periyotlar halindedir. Yaş ilerledikçe, bebeklerin toplam uyku süresi azalır, ancak gece uykuları uzar. 3-6 aylık bebekler günde yaklaşık 14-15 saat, 6-12 aylık bebekler ise 12-14 saat uyurlar.</p>

      <h2>Sağlıklı Uyku Alışkanlıkları Geliştirme</h2>
      <p>Bebeğinizin sağlıklı uyku alışkanlıkları geliştirmesine yardımcı olmak için şu adımları izleyebilirsiniz:</p>

      <h3>1. Tutarlı Bir Uyku Rutini Oluşturun</h3>
      <p>Her gece aynı saatte, benzer aktivitelerle bir uyku rutini oluşturun. Örneğin:</p>
      <ul>
        <li>Ilık bir banyo</li>
        <li>Rahatlatıcı bir masaj</li>
        <li>Sakin bir ortamda kitap okuma</li>
        <li>Ninni söyleme veya hafif müzik dinleme</li>
      </ul>

      <h3>2. Uyku ve Uyanıklık İşaretlerini Tanıyın</h3>
      <p>Bebeğinizin uyku işaretlerini tanımak önemlidir. Gözlerini ovuşturma, esneme, huzursuzluk gibi belirtiler bebeğinizin yorulduğunu gösterir. Bebeğinizi aşırı yorgun hale gelmeden yatırmak, daha kolay uykuya dalmasını sağlar.</p>

      <h3>3. Uygun Uyku Ortamı Yaratın</h3>
      <p>Bebeğinizin uyku ortamı şu özelliklere sahip olmalıdır:</p>
      <ul>
        <li>Serin (18-22°C arası)</li>
        <li>Karanlık veya loş ışıklı</li>
        <li>Sessiz veya hafif beyaz gürültü</li>
        <li>Güvenli bir beşik veya yatak</li>
      </ul>

      <h3>4. Bebeğinizi Uykulu Ama Uyanıkken Yatırın</h3>
      <p>Bebeğinizi tamamen uyumadan, uykulu bir haldeyken yatağına yatırmak, kendi kendine uykuya dalma becerisini geliştirmesine yardımcı olur. Bu, gece uyanmalarında da kendi kendine tekrar uykuya dalabilmesini sağlar.</p>

      <h3>5. Gündüz ve Gece Arasında Fark Yaratın</h3>
      <p>Gündüzleri aktif ve aydınlık bir ortam, geceleri ise sakin ve karanlık bir ortam oluşturarak bebeğinizin gündüz-gece döngüsünü anlamasına yardımcı olun.</p>

      <h2>Yaygın Uyku Sorunları ve Çözümleri</h2>

      <h3>Gece Uyanmaları</h3>
      <p>Tüm bebekler gece uyanır, bu normaldir. Ancak her uyanmada müdahale etmek yerine, bebeğinize kendi kendine sakinleşme fırsatı verin. Eğer ağlama devam ederse, minimal müdahale ile (hafif dokunma, fısıldama) sakinleştirmeyi deneyin.</p>

      <h3>Uyku Regrasyonu</h3>
      <p>Gelişim sıçramaları, diş çıkarma veya hastalık dönemlerinde bebeğinizin uyku düzeni bozulabilir. Bu dönemlerde sabırlı olun ve temel rutininizi korumaya çalışın.</p>

      <h3>Emzirme ve Uyku İlişkisi</h3>
      <p>Emzirme, bebeğinizi sakinleştirmek için mükemmel bir yoldur. Ancak bebeğinizin her uykuya dalışında emzirmeye bağımlı olmaması için, bazen uykulu ama uyanıkken yatağına yatırmayı deneyin.</p>

      <p>Unutmayın, her bebek benzersizdir ve uyku düzenleri de farklılık gösterebilir. Kendi bebeğinizin ihtiyaçlarına ve ritmine uygun bir yaklaşım geliştirmek en doğru yöntemdir. Sabırlı olun ve tutarlı bir şekilde uyku rutininizi sürdürün.</p>
    `,
    author: {
      name: "Uzm. Psikolog Mehmet Demir",
      avatar: "MD",
      title: "Çocuk Gelişim Uzmanı",
    },
    publishedAt: "2023-06-22",
    readingTime: 10,
    category: "Bebek Bakımı",
    tags: ["uyku", "bebek bakımı", "bebek gelişimi", "ebeveynlik"],
    image: "/placeholder.svg?height=400&width=600",
    didYouKnow: [
      "Yenidoğan bebekler günün yaklaşık %70'ini uyuyarak geçirirler",
      "Bebekler yetişkinlerden daha fazla REM uykusu geçirirler",
      "6 aylık bir bebek, gece boyunca 6-8 saat kesintisiz uyuyabilir",
      "Beyaz gürültü, anne karnındaki seslere benzediği için bebekleri sakinleştirir",
    ],
    factOrMyth: [
      {
        statement: "Bebeği geç saatte uyutmak daha uzun uyumasını sağlar",
        isTrue: false,
        explanation:
          "Bebeği geç saatte uyutmak genellikle aşırı yorgunluğa ve daha huzursuz bir uykuya neden olur. Erken ve düzenli uyku saatleri daha kaliteli uyku sağlar.",
      },
      {
        statement: "Bebeklerin uyku ihtiyacı yaşla birlikte azalır",
        isTrue: true,
        explanation:
          "Yenidoğanlar günde 16-17 saat uyurken, 1 yaşındaki bebekler günde 12-14 saat uyur. Yaş ilerledikçe toplam uyku süresi azalır.",
      },
      {
        statement: "Bebekler her zaman sessiz bir ortamda uyumalıdır",
        isTrue: false,
        explanation:
          "Aşırı sessiz ortamlar, bebeklerin en ufak sese bile uyanmasına neden olabilir. Hafif bir arka plan gürültüsü (beyaz gürültü) daha derin ve kesintisiz uyku sağlayabilir.",
      },
      {
        statement: "Uyku eğitimi vermek için bebeğin en az 4 aylık olması gerekir",
        isTrue: true,
        explanation:
          "4 aydan önce bebeklerin sirkadiyen ritmi tam olarak gelişmemiştir. Uyku eğitimine 4-6 ay civarında başlamak daha etkilidir.",
      },
    ],
    quiz: {
      title: "Bebek Uykusu Hakkında Ne Kadar Bilgilisiniz?",
      questions: [
        {
          id: "q1",
          question: "Yenidoğan bir bebek günde ortalama kaç saat uyur?",
          options: ["8-10 saat", "12-14 saat", "16-17 saat", "20-22 saat"],
          correctAnswer: 2,
          explanation:
            "Yenidoğan bebekler günde ortalama 16-17 saat uyurlar, ancak bu uyku 2-3 saatlik periyotlar halindedir.",
        },
        {
          id: "q2",
          question: "Aşağıdakilerden hangisi bebeklerde uyku işaretlerinden biri DEĞİLDİR?",
          options: ["Gözleri ovuşturma", "Esneme", "Aşırı hareketlilik ve gülme", "Kulak çekme"],
          correctAnswer: 2,
          explanation:
            "Aşırı hareketlilik ve gülme genellikle bebeğin uyanık ve enerjik olduğunu gösterir. Diğer seçenekler (gözleri ovuşturma, esneme, kulak çekme) uyku işaretleridir.",
        },
        {
          id: "q3",
          question: "Bebeklerin uyuması için ideal oda sıcaklığı nedir?",
          options: ["16-17°C", "18-22°C", "23-25°C", "26-28°C"],
          correctAnswer: 1,
          explanation:
            "Bebeklerin uyuması için ideal oda sıcaklığı 18-22°C arasıdır. Bu sıcaklık aralığı, aşırı ısınma riskini azaltırken bebeğin rahat etmesini sağlar.",
        },
      ],
    },
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag))
}
