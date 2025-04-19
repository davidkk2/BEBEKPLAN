"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer, Share2 } from "lucide-react"
import { BirthBagChecklist } from "@/components/birth-bag-checklist"

export default function DogumCantasiClient() {
  const [activeTab, setActiveTab] = useState("checklist")

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Doğum Çantası Kontrol Listesi",
          text: "BebekPlan uygulamasındaki doğum çantası kontrol listemi sizinle paylaşıyorum.",
          url: window.location.href,
        })
      } catch (error) {
        console.error("Paylaşım sırasında bir hata oluştu:", error)
      }
    } else {
      // Paylaşım API'si desteklenmiyorsa URL'yi panoya kopyala
      navigator.clipboard.writeText(window.location.href)
      alert("Bağlantı panoya kopyalandı!")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Doğum Çantası</h1>
          <p className="text-muted-foreground">
            Doğum çantanızda bulunması gereken tüm eşyaların kapsamlı listesi ve hazırlık önerileri.
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0 print:hidden">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Yazdır
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Paylaş
          </Button>
        </div>
      </div>

      <Tabs defaultValue="checklist" className="print:block" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="print:hidden">
          <TabsTrigger value="checklist">Kontrol Listesi</TabsTrigger>
          <TabsTrigger value="tips">Öneriler</TabsTrigger>
          <TabsTrigger value="hospital">Hastane Bilgileri</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist" className="mt-6">
          <BirthBagChecklist />
        </TabsContent>

        <TabsContent value="tips" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Doğum Çantası Hazırlama İpuçları</CardTitle>
              <CardDescription>Doğum çantanızı hazırlarken dikkat etmeniz gereken önemli noktalar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Ne Zaman Hazırlanmalı?</h3>
                <p>
                  Doğum çantanızı hamileliğinizin 35-36. haftalarında hazırlamaya başlamanız önerilir. Böylece erken
                  doğum durumunda da hazırlıklı olursunuz.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Çanta Seçimi</h3>
                <p>
                  Orta boy, kolay taşınabilir ve birden fazla bölmesi olan bir çanta tercih edin. Anne, bebek ve
                  refakatçi için ayrı bölümler oluşturabilirsiniz.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Belgeler Önemli</h3>
                <p>
                  Kimlik, sağlık sigortası, doğum planı ve önemli tıbbi belgeleri bir dosyada düzenli şekilde
                  bulundurun.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Konfor Öğeleri</h3>
                <p>
                  Kendi yastığınız, sevdiğiniz müzikler, dudak nemlendiricisi gibi konforunuzu artıracak küçük eşyaları
                  unutmayın.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Teknoloji</h3>
                <p>Telefon, şarj aleti, kamera ve yedek piller gibi teknolojik cihazlarınızı kontrol edin.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hospital" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Hastane Bilgileri</CardTitle>
              <CardDescription>Doğum yapacağınız hastane ile ilgili önemli bilgiler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Hastane Politikaları</h3>
                <p>
                  Doğum yapacağınız hastanenin ziyaretçi politikası, refakatçi kuralları ve doğum sonrası kalış süresi
                  hakkında bilgi edinin.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Hastaneye Gidiş Planı</h3>
                <p>Hastaneye nasıl gideceğinizi, park yerlerini ve alternatif rotaları önceden planlayın.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">İletişim Bilgileri</h3>
                <p>
                  Doktorunuzun, hastanenin ve acil durumlarda ulaşabileceğiniz kişilerin telefon numaralarını not edin.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Ön Kayıt</h3>
                <p>Mümkünse, hastaneye önceden kayıt yaptırarak doğum günü işlemleri hızlandırın.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Hastaneye Gitme Zamanı</h3>
                <p>Doktorunuzun talimatlarına göre, hangi durumlarda hastaneye gitmeniz gerektiğini öğrenin.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
