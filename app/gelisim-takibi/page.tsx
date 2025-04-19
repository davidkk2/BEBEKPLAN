import type React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Baby, Brain, Ruler, Weight, Activity, Eye } from "lucide-react"

export default function GelisimTakibi() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter mb-3 sm:mb-4">
            Bebek Gelişim Takibi
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-xl max-w-[700px] mx-auto">
            Bebeğinizin yaş grubuna göre gelişim aşamalarını takip edin
          </p>
        </div>

        <Tabs defaultValue="0-3" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6 sm:mb-8 overflow-x-auto">
            <TabsTrigger value="0-3">0-3 Ay</TabsTrigger>
            <TabsTrigger value="4-6">4-6 Ay</TabsTrigger>
            <TabsTrigger value="7-9">7-9 Ay</TabsTrigger>
            <TabsTrigger value="10-12">10-12 Ay</TabsTrigger>
            <TabsTrigger value="13-18">13-18 Ay</TabsTrigger>
          </TabsList>

          <TabsContent value="0-3" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Baby className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  0-3 Ay Gelişim Özellikleri
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Bebeğinizin ilk üç ayında beklenen gelişim aşamaları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <DevelopmentItem
                    icon={<Brain className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Bilişsel Gelişim"
                    items={[
                      "Yüzleri tanımaya başlar",
                      "Seslere tepki verir",
                      "Gözleriyle hareketli nesneleri takip eder",
                      "Ellerini ve ayaklarını keşfetmeye başlar",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Activity className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Fiziksel Gelişim"
                    items={[
                      "Başını kısa süreli dik tutabilir",
                      "Yüzüstü yatırıldığında başını kaldırabilir",
                      "Ellerini yumruk şeklinde tutar",
                      "Refleks hareketleri gösterir",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Ruler className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Boy ve Kilo"
                    items={[
                      "Doğumda ortalama 48-52 cm boy",
                      "3. ayda ortalama 58-62 cm boy",
                      "Doğumda ortalama 2.8-3.5 kg",
                      "3. ayda ortalama 5-6.5 kg",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Eye className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Sosyal Gelişim"
                    items={[
                      "Gülümsemeye başlar (6-8 hafta)",
                      "Ağlayarak ihtiyaçlarını belirtir",
                      "Tanıdık seslere sakinleşir",
                      "Göz teması kurmaya başlar",
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Weight className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  Beslenme Önerileri
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  0-3 ay arası bebeğinizin beslenme düzeni
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Sadece anne sütü veya formül mama ile beslenme (ilk 6 ay sadece anne sütü önerilir)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>2-3 saatte bir beslenme (günde 8-12 kez)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Her beslenme seansında 10-15 dakika emzirme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Ek gıdalara henüz başlanmamalı</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="4-6" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Baby className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  4-6 Ay Gelişim Özellikleri
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Bebeğinizin 4-6 ay arasında beklenen gelişim aşamaları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <DevelopmentItem
                    icon={<Brain className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Bilişsel Gelişim"
                    items={[
                      "Nesneleri ağzına götürmeye başlar",
                      "Seslerin geldiği yöne bakar",
                      "Aynada kendi yansımasıyla ilgilenir",
                      "Oyuncakları tutmaya ve sallamaya başlar",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Activity className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Fiziksel Gelişim"
                    items={[
                      "Destekle oturmaya başlar",
                      "Başını dik tutabilir",
                      "Yardımla yuvarlanabilir",
                      "Nesneleri kavrayabilir",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Ruler className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Boy ve Kilo"
                    items={[
                      "4. ayda ortalama 62-65 cm boy",
                      "6. ayda ortalama 65-68 cm boy",
                      "4. ayda ortalama 6-7 kg",
                      "6. ayda ortalama 7-8 kg",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Eye className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Sosyal Gelişim"
                    items={[
                      "Kahkaha atmaya başlar",
                      "Tanıdık yüzleri ayırt eder",
                      "Kendi adına tepki verir",
                      "Basit sesler çıkarmaya başlar",
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Weight className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  Beslenme Önerileri
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  4-6 ay arası bebeğinizin beslenme düzeni
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Anne sütü veya formül mama ile beslenmeye devam</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>6. ayda ek gıdalara başlanabilir (pirinç püresi, meyve püresi gibi)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>3-4 saatte bir beslenme (günde 6-8 kez)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Yeni gıdaları 3-4 gün arayla tanıtın</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 7-9 Ay içeriği */}
          <TabsContent value="7-9" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Baby className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  7-9 Ay Gelişim Özellikleri
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Bebeğinizin 7-9 ay arasında beklenen gelişim aşamaları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <DevelopmentItem
                    icon={<Brain className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Bilişsel Gelişim"
                    items={[
                      "Basit sebep-sonuç ilişkilerini anlamaya başlar",
                      "Nesnelerin kalıcılığını kavramaya başlar (saklanınca yok olmadıklarını anlar)",
                      "Basit oyunları taklit eder (el çırpma gibi)",
                      "Farklı sesleri taklit etmeye çalışır",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Activity className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Fiziksel Gelişim"
                    items={[
                      "Desteksiz oturabilir",
                      "Emeklemeye başlar",
                      "Tutunarak ayağa kalkabilir",
                      "Parmak ucuyla küçük nesneleri alabilir (parmak kavrama)",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Ruler className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Boy ve Kilo"
                    items={[
                      "7. ayda ortalama 68-71 cm boy",
                      "9. ayda ortalama 71-74 cm boy",
                      "7. ayda ortalama 7.5-9 kg",
                      "9. ayda ortalama 8.5-10 kg",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Eye className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Sosyal Gelişim"
                    items={[
                      "Yabancı korkusu gelişebilir",
                      "İsmine tepki verir",
                      "Basit kelimeleri anlamaya başlar ('hayır', 'bay bay' gibi)",
                      "Duygularını daha belirgin ifade eder (sevinç, korku, öfke)",
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Weight className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  Beslenme Önerileri
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  7-9 ay arası bebeğinizin beslenme düzeni
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Anne sütü veya formül mama ile beslenmeye devam</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Günde 3 öğün katı gıda (sebze, meyve, tahıl püresi)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Parmak besinlere başlanabilir (yumuşak meyve parçaları, pişmiş sebzeler)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Yoğurt ve peynir gibi süt ürünleri tanıtılabilir</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Protein kaynakları eklenebilir (iyi pişmiş et, tavuk, balık, baklagiller)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 10-12 Ay içeriği */}
          <TabsContent value="10-12" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Baby className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  10-12 Ay Gelişim Özellikleri
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Bebeğinizin 10-12 ay arasında beklenen gelişim aşamaları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <DevelopmentItem
                    icon={<Brain className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Bilişsel Gelişim"
                    items={[
                      "Basit komutları anlar ('ver', 'al' gibi)",
                      "Nesneleri işlevlerine göre kullanmaya başlar (telefonu kulağına götürme gibi)",
                      "Basit problem çözme becerileri gelişir",
                      "Nesneleri kutuya koyup çıkarabilir",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Activity className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Fiziksel Gelişim"
                    items={[
                      "Tutunarak yürümeye başlar",
                      "Bazı bebekler desteksiz yürüyebilir",
                      "İşaret parmağıyla nesneleri gösterir",
                      "Kaşık ve bardağı tutmaya çalışır",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Ruler className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Boy ve Kilo"
                    items={[
                      "10. ayda ortalama 73-76 cm boy",
                      "12. ayda ortalama 75-80 cm boy",
                      "10. ayda ortalama 9-10.5 kg",
                      "12. ayda ortalama 9.5-11 kg",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Eye className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Sosyal Gelişim"
                    items={[
                      "İlk kelimelerini söylemeye başlar ('anne', 'baba' gibi)",
                      "Basit oyunlar oynar (saklambaç gibi)",
                      "Sosyal referans davranışı gösterir (ebeveynin tepkisine göre davranır)",
                      "Sevdiği ve sevmediği şeyleri belirgin şekilde gösterir",
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Weight className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  Beslenme Önerileri
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  10-12 ay arası bebeğinizin beslenme düzeni
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Anne sütü veya formül mama ile beslenmeye devam</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Günde 3 ana öğün ve 2 ara öğün</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Aile yemeklerinden uygun olanlar verilebilir (tuzsuz ve baharatsız)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Kendi kendine yemek yeme becerisini destekleyin</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Çiğ bal ve inek sütü 1 yaşından önce verilmemelidir</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 13-18 Ay içeriği */}
          <TabsContent value="13-18" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Baby className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  13-18 Ay Gelişim Özellikleri
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Bebeğinizin 13-18 ay arasında beklenen gelişim aşamaları
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <DevelopmentItem
                    icon={<Brain className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Bilişsel Gelişim"
                    items={[
                      "Sembolik oyun oynamaya başlar (oyuncak telefonla konuşma gibi)",
                      "Basit bulmacaları çözebilir",
                      "Nesneleri kategorilere ayırmaya başlar",
                      "Resimli kitaplarda tanıdık nesneleri gösterebilir",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Activity className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Fiziksel Gelişim"
                    items={[
                      "Bağımsız yürür",
                      "Merdivenleri emekleyerek çıkabilir",
                      "Topu atabilir",
                      "Üst üste 2-3 küp dizebilir",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Ruler className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Boy ve Kilo"
                    items={[
                      "15. ayda ortalama 78-82 cm boy",
                      "18. ayda ortalama 81-85 cm boy",
                      "15. ayda ortalama 10-12 kg",
                      "18. ayda ortalama 10.5-12.5 kg",
                    ]}
                  />

                  <DevelopmentItem
                    icon={<Eye className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />}
                    title="Sosyal Gelişim"
                    items={[
                      "Kelime dağarcığı genişler (10-50 kelime)",
                      "Basit cümleleri anlar",
                      "İsteklerini işaret ederek veya kelimelerle belirtir",
                      "Aynada kendini tanır",
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Weight className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                  Beslenme Önerileri
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  13-18 ay arası bebeğinizin beslenme düzeni
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Anne sütü veya tam yağlı inek sütü (günde 2-3 bardak)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Günde 3 ana öğün ve 2-3 ara öğün</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Çeşitli besin gruplarından dengeli beslenme (protein, tahıl, sebze, meyve)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Kendi kendine yemek yeme becerisini geliştirme</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span>Şekerli ve tuzlu gıdalardan kaçının</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function DevelopmentItem({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-medium text-base sm:text-lg">{title}</h3>
      </div>
      <ul className="space-y-1.5 sm:space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
            <span className="text-sm sm:text-base">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
