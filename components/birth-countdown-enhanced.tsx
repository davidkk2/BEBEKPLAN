"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { format, addDays } from "date-fns"
import { tr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Icons } from "@/components/ui-icons"
import { useCountdown } from "@/lib/hooks/use-countdown"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/lib/context/app-context"
import { useUser } from "@/lib/context/user-context"

interface CountdownUnitProps {
  value: number
  label: string
}

export default function BirthCountdownEnhanced() {
  const { birthDate, setBirthDate } = useAppContext()
  const { profile, updateProfile } = useUser()
  const [isCountingDown, setIsCountingDown] = useState(!!birthDate)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Doğum tarihini ayarla
  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (newDate < today) {
        toast({
          title: "Geçersiz tarih",
          description: "Lütfen bugün veya gelecek bir tarih seçin.",
          variant: "destructive",
        })
        return
      }

      setBirthDate(newDate)
      setIsCountingDown(true)
      setIsCalendarOpen(false)

      // Profil bilgilerini güncelle
      if (profile) {
        updateProfile({ dueDate: newDate })
      }
    } else {
      setBirthDate(null)
      setIsCountingDown(false)

      // Profil bilgilerinden doğum tarihini kaldır
      if (profile) {
        updateProfile({ dueDate: undefined })
      }
    }
  }

  // Son adet tarihinden hesaplama
  const calculateFromLMP = () => {
    const today = new Date()
    const lmpDate = prompt("Son adet döneminizin ilk gününü girin (GG/AA/YYYY):")

    if (!lmpDate) return

    try {
      const [day, month, year] = lmpDate.split("/").map(Number)
      const lmp = new Date(year, month - 1, day)

      if (isNaN(lmp.getTime())) {
        throw new Error("Geçersiz tarih formatı")
      }

      if (lmp > today) {
        throw new Error("Son adet tarihi bugünden sonra olamaz")
      }

      // Naegele kuralı: LMP + 280 gün (40 hafta)
      const dueDate = addDays(lmp, 280)
      handleDateSelect(dueDate)

      toast({
        title: "Doğum tarihi hesaplandı",
        description: `Tahmini doğum tarihiniz: ${format(dueDate, "d MMMM yyyy", { locale: tr })}`,
      })
    } catch (error) {
      toast({
        title: "Hata",
        description: "Geçerli bir tarih formatı girin (GG/AA/YYYY).",
        variant: "destructive",
      })
    }
  }

  // Geri sayım hook'unu kullan
  const [countdown, { start, stop }] = useCountdown(birthDate, {
    onComplete: () => {
      toast({
        title: "Doğum günü geldi!",
        description: "Bebeğinizin dünyaya gelme zamanı. Tebrikler!",
      })
    },
  })

  // Sayfa yüklendiğinde veya tarih değiştiğinde geri sayımı başlat
  useEffect(() => {
    if (birthDate) {
      setIsCountingDown(true)
      start()
    } else {
      setIsCountingDown(false)
      stop()
    }
  }, [birthDate, start, stop])

  // Tahmini doğum tarihini sıfırla
  const resetDate = () => {
    setBirthDate(null)
    setIsCountingDown(false)
    stop()

    // Profil bilgilerinden doğum tarihini kaldır
    if (profile) {
      updateProfile({ dueDate: undefined })
    }
  }

  // Tarihi düzenle
  const editDate = () => {
    const newDate = prompt("Yeni doğum tarihini girin (GG/AA/YYYY):", birthDate ? format(birthDate, "dd/MM/yyyy") : "")

    if (!newDate) return

    try {
      const [day, month, year] = newDate.split("/").map(Number)
      const updatedDate = new Date(year, month - 1, day)

      if (isNaN(updatedDate.getTime())) {
        throw new Error("Geçersiz tarih formatı")
      }

      handleDateSelect(updatedDate)
    } catch (error) {
      toast({
        title: "Hata",
        description: "Geçerli bir tarih formatı girin (GG/AA/YYYY).",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full overflow-hidden border-none shadow-lg">
      <CardContent className="p-6 md:p-8">
        {!isCountingDown ? (
          <div className="flex flex-col space-y-4 w-full px-4 sm:px-0">
            {" "}
            {/* Mobil için tam genişlik ve padding */}
            <h3 className="text-lg sm:text-xl font-medium">Tahmini Doğum Tarihinizi Seçin</h3>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="dueDate">Doğum Tarihi</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !birthDate && "text-muted-foreground")}
                  >
                    <Icons.Calendar className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "PPP", { locale: tr }) : <span>Tarih seçin</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={birthDate || undefined}
                    onSelect={handleDateSelect}
                    initialFocus
                    disabled={(date) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return date < today
                    }}
                    locale={tr}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Son adet döneminizin ilk gününü biliyorsanız, tahmini doğum tarihinizi hesaplayabiliriz.
              </p>
              <Button
                variant="link"
                className="p-0 h-auto text-pink-500 hover:text-pink-600 mt-2"
                onClick={calculateFromLMP}
                aria-label="Son adet tarihinden hesapla"
              >
                Son adet tarihinden hesapla
              </Button>
            </div>
            <div className="bg-pink-50 dark:bg-gray-800 p-4 rounded-lg mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Doğum tarihinizi seçtikten sonra hamilelik bilgilerinizi görebilir, doğum çantası hazırlayabilir ve
                sayacınızı paylaşabilirsiniz.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl md:text-2xl font-medium">Bebeğinizin Dünyaya Gelişine</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <CountdownUnit value={countdown.days} label="Gün" />
              <CountdownUnit value={countdown.hours} label="Saat" />
              <CountdownUnit value={countdown.minutes} label="Dakika" />
              <CountdownUnit value={countdown.seconds} label="Saniye" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">Kaldı</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button variant="outline" onClick={resetDate} className="mt-4" aria-label="Tarihi sıfırla">
                <Icons.X className="mr-2 h-4 w-4" />
                Tarihi Sıfırla
              </Button>
              <Button variant="outline" onClick={editDate} className="mt-4" aria-label="Tarihi düzenle">
                <Icons.Calendar className="mr-2 h-4 w-4" />
                Tarihi Düzenle
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl sm:text-3xl md:text-5xl font-bold bg-pink-50 dark:bg-gray-800 text-pink-500 dark:text-pink-300 rounded-lg w-14 sm:w-16 md:w-24 h-14 sm:h-16 md:h-24 flex items-center justify-center">
        {" "}
        {/* Mobil için daha küçük boyut */}
        {value}
      </div>
      <span className="text-xs sm:text-sm md:text-base mt-2 text-gray-600 dark:text-gray-400">{label}</span>{" "}
      {/* Mobil için daha küçük font */}
    </div>
  )
}
