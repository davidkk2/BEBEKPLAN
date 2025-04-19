// Doğum çantası için önerilen ürünler
export interface BirthBagProduct {
  id: string
  name: string
  description?: string
  essential: boolean // Zorunlu mu, isteğe bağlı mı?
  tip?: string // Ek ipucu veya öneri
}

export interface BirthBagCategory {
  id: string
  title: string
  description?: string
  products: BirthBagProduct[]
}

// Doğum çantası için önerilen ürünler listesi
export const birthBagProducts: BirthBagCategory[] = [
  {
    id: "anne-kisisel",
    title: "Anne İçin Kişisel Eşyalar",
    description: "Hastanede kalacağınız süre boyunca ihtiyaç duyacağınız kişisel bakım ürünleri",
    products: [
      {
        id: "pijama",
        name: "Pijama/Gecelik",
        description: "Önden düğmeli, emzirme için uygun 2-3 adet",
        essential: true,
        tip: "Kolay giyilip çıkarılabilen ve emzirme için uygun modeller tercih edin",
      },
      {
        id: "ic-camasiri",
        name: "İç Çamaşırı",
        description: "Pamuklu, rahat, yüksek belli 4-5 adet",
        essential: true,
        tip: "Doğum sonrası için özel tasarlanmış yüksek belli külotlar tercih edilebilir",
      },
      {
        id: "corap",
        name: "Çorap",
        description: "Pamuklu, kaymaz 3-4 çift",
        essential: true,
      },
      {
        id: "terlik",
        name: "Terlik",
        description: "Kaymaz tabanlı, kolay giyilip çıkarılabilen",
        essential: true,
        tip: "Hastane koridorlarında yürüyüş yapabileceğiniz kaymaz tabanlı terlikler tercih edin",
      },
      {
        id: "dis-fircasi",
        name: "Diş Fırçası ve Macunu",
        essential: true,
      },
      {
        id: "sampuan",
        name: "Şampuan ve Duş Jeli",
        description: "Seyahat boy tercih edilebilir",
        essential: true,
      },
      {
        id: "havlu",
        name: "Havlu",
        description: "El ve yüz havlusu, banyo havlusu",
        essential: true,
      },
      {
        id: "dudak-kremi",
        name: "Dudak Kremi",
        essential: false,
        tip: "Hastane ortamı genellikle kuru olduğundan dudaklarınız çatlayabilir",
      },
      {
        id: "el-kremi",
        name: "El Kremi",
        essential: false,
      },
      {
        id: "sac-fircasi",
        name: "Saç Fırçası/Tarak",
        essential: true,
      },
      {
        id: "makyaj-malzemeleri",
        name: "Temel Makyaj Malzemeleri",
        description: "İsteğe bağlı",
        essential: false,
        tip: "İlk fotoğraflar için kendinizi iyi hissetmenizi sağlayacak temel ürünler",
      },
      {
        id: "gozluk",
        name: "Gözlük/Lens Solüsyonu",
        description: "Kullanıyorsanız",
        essential: false,
      },
      {
        id: "sac-tokasi",
        name: "Saç Lastikleri/Tokaları",
        description: "Doğum sırasında saçlarınızı toplamak için",
        essential: false,
      },
      {
        id: "dudak-nemlendirici",
        name: "Dudak Nemlendirici",
        essential: false,
      },
    ],
  },
  {
    id: "anne-hijyen",
    title: "Anne İçin Hijyen Ürünleri",
    description: "Doğum sonrası hijyen için gerekli ürünler",
    products: [
      {
        id: "dogum-pedi",
        name: "Doğum Sonrası Ped",
        description: "Büyük boy, emici (1-2 paket)",
        essential: true,
        tip: "Normal hijyenik pedlerden daha büyük ve emici olan doğum sonrası pedlerden tercih edin",
      },
      {
        id: "gogus-pedi",
        name: "Göğüs Pedi",
        description: "Tek kullanımlık (1 paket)",
        essential: true,
        tip: "Süt gelmesi durumunda kıyafetlerinizin ıslanmasını önler",
      },
      {
        id: "islak-mendil",
        name: "Islak Mendil",
        description: "Hassas ciltler için",
        essential: true,
      },
      {
        id: "kagit-havlu",
        name: "Kağıt Havlu/Peçete",
        essential: true,
      },
      {
        id: "el-dezenfektani",
        name: "El Dezenfektanı",
        essential: true,
        tip: "Bebeğinizi tutmadan önce ellerinizi temizlemek için",
      },
      {
        id: "kulak-tikaci",
        name: "Kulak Tıkacı",
        description: "Hastane ortamında uyumak için",
        essential: false,
        tip: "Hastane ortamı gürültülü olabilir, iyi bir uyku için kulak tıkacı faydalı olabilir",
      },
      {
        id: "temizleme-mendili",
        name: "Antibakteriyel Temizleme Mendilleri",
        description: "Hastane yüzeylerini temizlemek için",
        essential: false,
      },
    ],
  },
  {
    id: "anne-giyim",
    title: "Anne İçin Giyim",
    description: "Hastanede ve eve dönüşte giyilecek kıyafetler",
    products: [
      {
        id: "emzirme-sutyeni",
        name: "Emzirme Sütyeni",
        description: "2-3 adet",
        essential: true,
        tip: "Kolay açılıp kapanabilen, pamuklu emzirme sütyenleri tercih edin",
      },
      {
        id: "eve-donus-kiyafeti",
        name: "Eve Dönüş Kıyafeti",
        description: "Rahat, bol, mevsime uygun",
        essential: true,
        tip: "Hamileliğinizin 6. ayındaki kıyafetleriniz uygun olabilir, normal kıyafetlerinize hemen sığmayabilirsiniz",
      },
      {
        id: "hırka",
        name: "Hırka/Şal",
        description: "Hastane odası serin olabilir",
        essential: false,
      },
      {
        id: "emzirme-atleti",
        name: "Emzirme Atleti",
        description: "Kolay emzirme için özel tasarlanmış",
        essential: false,
      },
      {
        id: "ceket",
        name: "Mevsime Uygun Ceket/Mont",
        description: "Eve dönüş için",
        essential: false,
      },
    ],
  },
  {
    id: "bebek-giyim",
    title: "Bebek İçin Giyim",
    description: "Bebeğinizin hastanede ve eve dönüşte ihtiyaç duyacağı kıyafetler",
    products: [
      {
        id: "body",
        name: "Body/Zıbın",
        description: "Yenidoğan beden (50-56), 3-4 adet",
        essential: true,
        tip: "Çıtçıtlı ve önden açılan modeller tercih edin",
      },
      {
        id: "tulum",
        name: "Tulum",
        description: "Yenidoğan beden (50-56), 3-4 adet",
        essential: true,
        tip: "Çıtçıtlı ve kolay giydirilip çıkarılabilen modeller tercih edin",
      },
      {
        id: "sapka",
        name: "Şapka",
        description: "Yenidoğan beden, 2 adet",
        essential: true,
        tip: "Bebeğinizin başını sıcak tutmak için pamuklu şapka tercih edin",
      },
      {
        id: "corap",
        name: "Çorap",
        description: "Yenidoğan beden, 3-4 çift",
        essential: true,
      },
      {
        id: "eldiven",
        name: "Eldiven",
        description: "Tırnak çizmesini önlemek için, 2 çift",
        essential: true,
        tip: "Bebeğinizin kendisini çizmemesi için pamuklu eldivenler tercih edin",
      },
      {
        id: "battaniye",
        name: "İnce Battaniye",
        description: "Pamuklu, 2 adet",
        essential: true,
      },
      {
        id: "hastaneden-cikis-kiyafeti",
        name: "Hastaneden Çıkış Kıyafeti",
        description: "Mevsime uygun, 1 takım",
        essential: true,
        tip: "İlk fotoğraflar için özel bir kıyafet tercih edebilirsiniz",
      },
      {
        id: "kundak",
        name: "Kundak/Swaddle",
        description: "Bebeği sarmak için, 1-2 adet",
        essential: false,
        tip: "Bebeğinizi sarmak ve güvende hissetmesini sağlamak için kullanışlıdır",
      },
    ],
  },
  {
    id: "bebek-bakim",
    title: "Bebek İçin Bakım Ürünleri",
    description: "Bebeğinizin bakımı için gerekli ürünler",
    products: [
      {
        id: "bebek-bezi",
        name: "Bebek Bezi",
        description: "Yenidoğan beden, 1 paket (24-30 adet)",
        essential: true,
        tip: "Yenidoğan bedeninde ve göbek kordonuna uygun kesimli bezler tercih edin",
      },
      {
        id: "islak-mendil",
        name: "Islak Mendil",
        description: "Hassas ciltler için, parfümsüz",
        essential: true,
        tip: "Yenidoğan bebeklere özel, alkol ve parfüm içermeyen mendiller tercih edin",
      },
      {
        id: "alt-acma",
        name: "Alt Açma Bezi",
        description: "Tek kullanımlık veya yıkanabilir, 5-6 adet",
        essential: true,
      },
      {
        id: "puset",
        name: "Bebek Arabası/Puset",
        description: "Yenidoğana uygun",
        essential: true,
        tip: "Yenidoğan için yatar pozisyonda kullanılabilen bir model tercih edin",
      },
      {
        id: "oto-koltugu",
        name: "Bebek Oto Koltuğu",
        description: "Hastaneden eve dönüş için",
        essential: true,
        tip: "0-13 kg arası kullanılabilen, ECE R44/04 veya i-Size (R129) standartlarına uygun bir model seçin",
      },
      {
        id: "bebek-sampuani",
        name: "Bebek Şampuanı",
        description: "Yenidoğanlar için özel",
        essential: false,
      },
      {
        id: "pisik-kremi",
        name: "Pişik Kremi",
        essential: false,
        tip: "Bebeğinizin cildini korumak için her bez değişiminde kullanabilirsiniz",
      },
      {
        id: "bebek-havlusu",
        name: "Bebek Havlusu",
        description: "Yumuşak dokulu, 1-2 adet",
        essential: false,
      },
      {
        id: "bebek-taragi",
        name: "Bebek Tarağı/Fırçası",
        essential: false,
      },
      {
        id: "burun-aspiratoru",
        name: "Burun Aspiratörü",
        essential: false,
        tip: "Bebeğinizin burnunu temizlemek için kullanışlıdır",
      },
    ],
  },
  {
    id: "baba-icin",
    title: "Baba İçin",
    description: "Babanın hastanede kalacağı süre için gerekli eşyalar",
    products: [
      {
        id: "yedek-kiyafet",
        name: "Yedek Kıyafet",
        description: "Uzun süre hastanede kalınabilir",
        essential: false,
      },
      {
        id: "kisisel-bakim",
        name: "Kişisel Bakım Ürünleri",
        description: "Diş fırçası, tıraş malzemeleri vb.",
        essential: false,
      },
      {
        id: "sarj-aleti",
        name: "Telefon Şarj Aleti",
        essential: true,
        tip: "Uzun pil ömrüne sahip bir powerbank da faydalı olabilir",
      },
      {
        id: "atistirmalik",
        name: "Atıştırmalıklar",
        description: "Uzun bekleyişler için",
        essential: false,
        tip: "Enerji veren, kolay bozulmayan atıştırmalıklar tercih edin",
      },
      {
        id: "bozuk-para",
        name: "Bozuk Para",
        description: "Otomat ve park ücreti için",
        essential: false,
      },
      {
        id: "rahat-ayakkabi",
        name: "Rahat Ayakkabı",
        description: "Uzun süre ayakta kalmak için",
        essential: false,
      },
    ],
  },
  {
    id: "diger",
    title: "Diğer Önemli Eşyalar",
    description: "Hastanede ihtiyaç duyabileceğiniz diğer önemli eşyalar",
    products: [
      {
        id: "belgeler",
        name: "Kimlik, Sigorta ve Hastane Belgeleri",
        description: "Kimlik kartı, sağlık sigortası kartı, gebelik takip kartı",
        essential: true,
        tip: "Tüm önemli belgeleri bir dosyada toplayın ve kolay erişilebilir bir yerde saklayın",
      },
      {
        id: "para",
        name: "Nakit Para ve Kredi Kartı",
        essential: true,
      },
      {
        id: "kamera",
        name: "Kamera/Fotoğraf Makinesi",
        description: "İlk anları kaydetmek için",
        essential: false,
        tip: "Şarj cihazını ve yedek hafıza kartını unutmayın",
      },
      {
        id: "sarj-aleti",
        name: "Telefon ve Şarj Aleti",
        essential: true,
      },
      {
        id: "muzik-calar",
        name: "Müzik Çalar/Kulaklık",
        description: "Rahatlamak için",
        essential: false,
        tip: "Doğum sırasında dinlemek istediğiniz rahatlatıcı müzikleri önceden hazırlayın",
      },
      {
        id: "kitap-dergi",
        name: "Kitap/Dergi",
        description: "Vakit geçirmek için",
        essential: false,
      },
      {
        id: "yastik",
        name: "Kendi Yastığınız",
        description: "Daha rahat uyumak için",
        essential: false,
      },
      {
        id: "su-sisesi",
        name: "Su Şişesi",
        description: "Kolay içilebilir kapaklı",
        essential: true,
        tip: "Doğum sırasında ve sonrasında bol su içmek önemlidir",
      },
      {
        id: "dudak-balsami",
        name: "Dudak Balsamı",
        description: "Dudakların kurumasını önlemek için",
        essential: false,
      },
      {
        id: "emzirme-yastigi",
        name: "Emzirme Yastığı",
        description: "Rahat emzirme pozisyonu için",
        essential: false,
      },
    ],
  },
  {
    id: "beslenme",
    title: "Beslenme İle İlgili",
    description: "Anne ve bebeğin beslenmesi için gerekli ürünler",
    products: [
      {
        id: "biberon",
        name: "Biberon",
        description: "Yenidoğan için uygun, 2-3 adet",
        essential: false,
        tip: "Emzirmeyi düşünseniz bile, acil durumlar için 1-2 biberon bulundurmak faydalı olabilir",
      },
      {
        id: "emzik",
        name: "Emzik",
        description: "Yenidoğan için uygun, 1-2 adet",
        essential: false,
        tip: "Emzik kullanmayı düşünüyorsanız, ortodontik ve yenidoğana uygun modeller tercih edin",
      },
      {
        id: "mama",
        name: "Hazır Mama",
        description: "Acil durumlar için",
        essential: false,
      },
      {
        id: "atistirmaliklar",
        name: "Anne İçin Atıştırmalıklar",
        description: "Enerji veren, sağlıklı atıştırmalıklar",
        essential: false,
        tip: "Kuruyemiş, meyve, granola bar gibi enerji veren atıştırmalıklar tercih edin",
      },
      {
        id: "su",
        name: "Su",
        description: "Yeterli miktarda",
        essential: true,
        tip: "Doğum sırasında ve sonrasında bol su içmek önemlidir",
      },
      {
        id: "gogus-pompasi",
        name: "Göğüs Pompası",
        description: "İhtiyaç halinde",
        essential: false,
        tip: "Hastanede genellikle göğüs pompası bulunur, ancak kendi pompanızı tercih edebilirsiniz",
      },
    ],
  },
]

// Doğum çantası hazırlama zamanı hakkında bilgiler
export const birthBagTimingInfo = {
  title: "Doğum Çantası Ne Zaman Hazırlanmalı?",
  description:
    "Doğum çantanızı hazırlamak için ideal zaman hamileliğinizin 35-36. haftalarıdır. Ancak erken doğum ihtimaline karşı 32. haftadan itibaren temel eşyaları hazırlamaya başlayabilirsiniz. Çantanızı hazırladıktan sonra, doğum gününe kadar arabanızda veya kapı yanında kolay erişilebilir bir yerde tutmanız önerilir.",
  tips: [
    "Çantanızı hazırlarken bir kontrol listesi kullanın",
    "Hastaneye gitmeden önce son kez kontrol edin",
    "Eşinizin/refakatçinizin çantanızın yerini bildiğinden emin olun",
    "Acil durumlar için arabanızda yedek bir mini çanta bulundurun",
  ],
}

// Doğum çantası hakkında önemli ipuçları
export const birthBagTips = [
  "Hastanede kalacağınız süreyi düşünerek, genellikle 2-3 gün için hazırlık yapın",
  "Kıyafetlerinizi seçerken kolay giyilip çıkarılabilen modelleri tercih edin",
  "Değerli eşyalarınızı mümkünse evde bırakın",
  "Hastane odasının sıcaklığı değişken olabilir, katmanlı giyinmeyi tercih edin",
  "Bebeğiniz için farklı bedenlerde kıyafetler götürün, tahmin ettiğinizden büyük veya küçük olabilir",
  "Doğum fotoğrafçısı tutmayı düşünüyorsanız, önceden ayarlayın ve iletişim bilgilerini eşinizle paylaşın",
  "Doğum planınız varsa, birkaç kopya hazırlayın ve çantanıza koyun",
  "Hastane politikalarını önceden öğrenin, bazı hastaneler kendi kıyafetlerini kullanmanızı isteyebilir",
]
