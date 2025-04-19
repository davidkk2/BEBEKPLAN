"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BirthCountdownEnhanced from "@/components/birth-countdown-enhanced"
import PregnancyInfo from "@/components/pregnancy-info"
import BirthBagChecklist from "@/components/birth-bag-checklist"
import ShareCountdown from "@/components/share-countdown"
import { useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/ui-icons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppContext } from "@/lib/context/app-context"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/lib/context/user-context"
import { useRouter } from "next/navigation"

export default function BirthCountdownPageClient() {
  const { birthDate, setBirthDate, daysLeft } = useAppContext()
  const { profile, hasProfile } = useUser()
  const router = useRouter()
  const [showSharedAlert, setShowSharedAlert] = useState(false)
  const [activeTab, setActiveTab] = useState("info")
  const searchParams = useSearchParams()

  // Profil bilgilerinden doğum tarihini al
  useEffect(() => {
    if (profile?.dueDate) {
      setBirthDate(profile.dueDate)
    }
  }, [profile, setBirthDate])

  // URL'den paylaşılan doğum tarihini kontrol et
  useEffect(() => {
    if (searchParams.has("share") && searchParams.has("date")) {
      try {
        const sharedDate = new Date(searchParams.get("date") || "")
        if (!isNaN(sharedDate.getTime())) {
          setBirthDate(sharedDate)
          setShowSharedAlert(true)
          toast({
            title: "Paylaşılan Doğum Sayacı",
            description: `Bir arkadaşınız doğum sayacını sizinle paylaştı. Tahmini doğum tarihi: ${sharedDate.toLocaleDateString("tr-TR")}`,
          })
        }
      } catch (error) {
        console.error("Invalid date in URL", error)
      }
    }
  }, [searchParams, setBirthDate])

  // Profil bilgisi yoksa ve hamile değilse, profil sayfasına yönlendir
  useEffect(() => {
    if (hasProfile && profile?.status !== "pregnant" && !searchParams.has("share")) {
      toast({
        title: "Bilgi",
        description: "Doğum sayacı özelliği hamile kullanıcılar içindir. Profil bilgilerinizi güncelleyebilirsiniz.",
      })
    }
  }, [hasProfile, profile, router, searchParams])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Doğum Sayacı</h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl max-w-[700px] mx-auto">
            Bebeğinizin dünyaya gelişine ne kadar kaldığını takip edin ve hazırlıklarınızı planlayın
          </p>
        </div>

        {showSharedAlert && (
          <Alert className="mb-6 bg-pink-50 dark:bg-gray-800 border-pink-200 dark:border-pink-900">
            <Icons.Baby className="h-4 w-4 text-pink-500" />
            <AlertTitle>Paylaşılan Doğum Sayacı</AlertTitle>
            <AlertDescription>
              Bir arkadaşınız doğum sayacını sizinle paylaştı. Tahmini doğum tarihi:{" "}
              {birthDate?.toLocaleDateString("tr-TR")}
            </AlertDescription>
          </Alert>
        )}

        {!hasProfile && !searchParams.has("share") && (
          <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <Icons.User className="h-4 w-4 text-blue-500" />
            <AlertTitle>Profil Bilgilerinizi Tamamlayın</AlertTitle>
            <AlertDescription>
              Doğum sayacını kişiselleştirmek için lütfen profil sayfasından bilgilerinizi doldurun.
            </AlertDescription>
          </Alert>
        )}

        <div className="w-full max-w-3xl mx-auto">
          <BirthCountdownEnhanced />
        </div>

        {/* Sekmeleri her zaman göster, tarih seçilmediğinde bilgilendirici mesaj göster */}
        <div className="mt-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="info">Hamilelik Bilgisi</TabsTrigger>
              <TabsTrigger value="checklist">Doğum Çantası</TabsTrigger>
              <TabsTrigger value="share">Paylaş</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              {birthDate ? (
                <PregnancyInfo />
              ) : (
                <Card className="w-full">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Icons.Baby className="h-5 w-5 text-pink-500" />
                      Hamilelik Bilgisi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 text-center py-12">
                    <Icons.Calendar className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Henüz bir doğum tarihi seçilmedi</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                      Hamilelik bilgilerini görmek için lütfen yukarıdan tahmini doğum tarihinizi seçin.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="checklist">
              <BirthBagChecklist />
            </TabsContent>

            <TabsContent value="share">
              {birthDate ? (
                <ShareCountdown />
              ) : (
                <Card className="w-full">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Icons.MessageSquareText className="h-5 w-5 text-pink-500" />
                      Doğum Sayacını Paylaş
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 text-center py-12">
                    <Icons.Share className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Henüz bir doğum tarihi seçilmedi</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                      Doğum sayacınızı paylaşmak için lütfen yukarıdan tahmini doğum tarihinizi seçin.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-12 bg-pink-50 dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icons.Calendar className="h-5 w-5 text-pink-500" />
            Doğum Sayacı Hakkında
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              Doğum sayacı, hamilelik sürecinizde bebeğinizin dünyaya gelişine ne kadar zaman kaldığını takip etmenizi
              sağlar. Tahmini doğum tarihinizi (TDT) girerek, gün, saat, dakika ve saniye cinsinden geri sayımı
              görebilirsiniz.
            </p>
            <p>
              Tahmini doğum tarihi genellikle son adet döneminin ilk gününden itibaren 280 gün (40 hafta) sonrası olarak
              hesaplanır. Ancak bu tarih sadece bir tahmindir ve bebekler genellikle bu tarihten 2 hafta önce veya 2
              hafta sonra doğabilirler.
            </p>
            <p>
              Doğum tarihinizi doktorunuzun size verdiği tahmini doğum tarihine göre ayarlayabilirsiniz. Ultrason
              sonuçlarına göre bu tarih değişebilir, bu durumda sayacınızı güncelleyebilirsiniz.
            </p>
            <p>
              Doğum çantası kontrol listesi, doğum yaklaştıkça hazırlamanız gereken eşyaları takip etmenize yardımcı
              olur. Hamilelik bilgisi sekmesinde ise hamilelik haftanıza göre bebeğinizin gelişimi ve sizin için
              öneriler bulabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
