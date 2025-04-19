"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Icons } from "@/components/ui-icons"

interface CountdownState {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function BirthCountdown() {
  const [date, setDate] = useState<Date>()
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isCountingDown, setIsCountingDown] = useState(false)

  useEffect(() => {
    // Doğum tarihi seçilmediğinde daha iyi bir kullanıcı deneyimi için iyileştirme
    if (!date && isCountingDown) {
      setIsCountingDown(false)
    }

    if (!date) return

    setIsCountingDown(true)
    const interval = setInterval(() => {
      const now = new Date()
      const difference = date.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(interval)
        setIsCountingDown(false)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [date, isCountingDown])

  // Geçmiş tarih seçimini engelleyelim ve daha iyi hata mesajı gösterelim
  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (newDate < today) {
        alert("Lütfen bugün veya gelecek bir tarih seçin.")
        return
      }
    }
    setDate(newDate)
  }

  return (
    <Card className="w-full overflow-hidden border-none shadow-lg">
      <CardContent className="p-6 md:p-8">
        {!isCountingDown ? (
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-medium">Tahmini Doğum Tarihinizi Seçin</h3>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="dueDate">Doğum Tarihi</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <Icons.Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: tr }) : <span>Tarih seçin</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                    disabled={(date) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return date < today
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-xl md:text-2xl font-medium">Bebeğinizin Dünyaya Gelişine</h3>
            <div className="flex justify-center gap-4">
              <CountdownUnit value={countdown.days} label="Gün" />
              <CountdownUnit value={countdown.hours} label="Saat" />
              <CountdownUnit value={countdown.minutes} label="Dakika" />
              <CountdownUnit value={countdown.seconds} label="Saniye" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">Kaldı</p>
            <Button variant="outline" onClick={() => setIsCountingDown(false)} className="mt-4">
              Tarihi Değiştir
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl md:text-5xl font-bold bg-pink-50 dark:bg-gray-800 text-pink-500 dark:text-pink-300 rounded-lg w-16 md:w-24 h-16 md:h-24 flex items-center justify-center">
        {value}
      </div>
      <span className="text-sm md:text-base mt-2 text-gray-600 dark:text-gray-400">{label}</span>
    </div>
  )
}
