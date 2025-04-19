"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui-icons"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/lib/context/app-context"
import { useUser } from "@/lib/context/user-context"

export default function ShareCountdown() {
  const { birthDate, daysLeft } = useAppContext()
  const { profile } = useUser()
  const [copied, setCopied] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Doğum tarihinin geçerli olduğundan emin ol
  if (!birthDate || isNaN(birthDate.getTime())) {
    return (
      <Card className="w-full">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Icons.MessageSquareText className="h-5 w-5 text-pink-500" />
            Doğum Sayacını Paylaş
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 text-center py-12">
          <Icons.Share className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Geçersiz doğum tarihi</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Lütfen geçerli bir doğum tarihi seçin.</p>
        </CardContent>
      </Card>
    )
  }

  const formattedDate = format(birthDate, "d MMMM yyyy", { locale: tr })
  const userName = profile && profile.firstName ? `${profile.firstName}'in` : "Bebeğimizin"

  const shareText = `${userName} dünyaya gelişine ${daysLeft} gün kaldı! Tahmini doğum tarihimiz: ${formattedDate}. #BebekPlan #DoğumSayacı`

  const shareUrl = `https://bebekplan.com/dogum-sayaci?share=true&date=${birthDate.toISOString()}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        toast({
          title: "Kopyalandı!",
          description: "Metin panoya kopyalandı.",
          duration: 3000,
        })
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        toast({
          title: "Hata!",
          description: "Metin kopyalanamadı.",
          variant: "destructive",
          duration: 3000,
        })
        console.error("Kopyalama hatası:", err)
      })
  }

  const shareOnSocialMedia = (platform: string) => {
    let url = ""

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        break
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
        break
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`
        break
      default:
        return
    }

    window.open(url, "_blank", "noopener,noreferrer")
    setIsDialogOpen(false)
  }

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Icons.MessageSquareText className="h-5 w-5 text-pink-500" />
          Doğum Sayacını Paylaş
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="p-4 bg-pink-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 font-medium">Paylaşım Metni:</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{shareText}</p>
          </div>

          <p className="text-gray-600 dark:text-gray-300">
            Doğum sayacınızı aileniz ve arkadaşlarınızla paylaşın. Onlar da bebeğinizin dünyaya gelişine ne kadar
            kaldığını görebilirler.
          </p>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-pink-500 hover:bg-pink-600">
                <Icons.MessageSquareText className="mr-2 h-4 w-4" />
                Paylaş
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Doğum Sayacını Paylaş</DialogTitle>
                <DialogDescription>
                  Doğum sayacınızı sosyal medyada paylaşın veya bağlantıyı kopyalayın.
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="social" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="social">Sosyal Medya</TabsTrigger>
                  <TabsTrigger value="link">Bağlantı</TabsTrigger>
                </TabsList>

                <TabsContent value="social" className="space-y-4 py-4">
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200"
                      onClick={() => shareOnSocialMedia("twitter")}
                      aria-label="Twitter'da Paylaş"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-twitter"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                      <span className="sr-only">Twitter'da Paylaş</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                      onClick={() => shareOnSocialMedia("facebook")}
                      aria-label="Facebook'ta Paylaş"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-facebook"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      <span className="sr-only">Facebook'ta Paylaş</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-green-50 hover:text-green-500 hover:border-green-200"
                      onClick={() => shareOnSocialMedia("whatsapp")}
                      aria-label="WhatsApp'ta Paylaş"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-circle"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      <span className="sr-only">WhatsApp'ta Paylaş</span>
                    </Button>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{shareText}</p>
                  </div>
                </TabsContent>

                <TabsContent value="link" className="space-y-4 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Bağlantı
                      </Label>
                      <Input
                        id="link"
                        defaultValue={shareUrl}
                        readOnly
                        className="h-10"
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                      />
                    </div>
                    <Button
                      size="sm"
                      className="px-3"
                      onClick={() => copyToClipboard(shareUrl)}
                      aria-label={copied ? "Kopyalandı" : "Kopyala"}
                    >
                      <span className="sr-only">{copied ? "Kopyalandı" : "Kopyala"}</span>
                      {copied ? (
                        <Icons.Check className="h-4 w-4" />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-copy"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Bu bağlantıyı paylaştığınızda, alıcılar doğum sayacınızı görebilecekler.
                  </p>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
