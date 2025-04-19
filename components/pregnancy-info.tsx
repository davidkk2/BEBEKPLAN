"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui-icons"
import { calculatePregnancyWeek, getTrimester, getBabyDevelopmentInfo, getMotherTips } from "@/lib/pregnancy-utils"
import { Progress } from "@/components/ui/progress"
import { useAppContext } from "@/lib/context/app-context"
import { useUser } from "@/lib/context/user-context"
import { useEffect, useState } from "react"

export default function PregnancyInfo() {
  const { birthDate } = useAppContext()
  const { profile, updateProfile } = useUser()
  const [pregnancyWeek, setPregnancyWeek] = useState<number>(0)
  const [trimester, setTrimester] = useState<string>("")
  const [babyInfo, setBabyInfo] = useState<string>("")
  const [motherTips, setMotherTips] = useState<string[]>([])
  const [progressPercentage, setProgressPercentage] = useState<number>(0)
  const [babySize, setBabySize] = useState<any>(null)

  // Hamilelik bilgilerini hesapla
  useEffect(() => {
    if (birthDate && !isNaN(birthDate.getTime())) {
      const week = calculatePregnancyWeek(birthDate)
      setPregnancyWeek(week)
      setTrimester(getTrimester(week))
      setBabyInfo(getBabyDevelopmentInfo(week))
      setMotherTips(getMotherTips(week))
      setProgressPercentage(Math.min(100, Math.round((week / 40) * 100)))
      setBabySize(getBabySizeComparison(week))

      // Profil bilgilerini güncelle
      if (profile && (!profile.pregnancyWeek || profile.pregnancyWeek !== week.toString())) {
        updateProfile({ pregnancyWeek: week.toString() })
      }
    }
  }, [birthDate, profile, updateProfile])

  // Doğum tarihinin geçerli olup olmadığını kontrol et
  const isValidBirthDate = birthDate !== null && !isNaN(birthDate.getTime())

  // Geçersiz doğum tarihi durumunda gösterilecek içerik
  if (!isValidBirthDate) {
    return (
      <Card className="w-full">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Icons.Baby className="h-5 w-5 text-pink-500" />
            Hamilelik Bilgisi
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 text-center py-12">
          <Icons.Calendar className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Geçersiz doğum tarihi</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">Lütfen geçerli bir doğum tarihi seçin.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Icons.Baby className="h-5 w-5 text-pink-500" />
            Hamilelik Bilgisi
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-pink-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hamilelik Haftası</p>
                <p className="text-2xl font-bold text-pink-500">{pregnancyWeek}. Hafta</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{trimester}</p>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Başlangıç</span>
                  <span>40. Hafta</span>
                </div>
                <Progress
                  value={progressPercentage}
                  className="h-2"
                  aria-label={`Hamilelik ilerlemesi: %${progressPercentage}`}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                  %{progressPercentage} tamamlandı
                </p>
              </div>
            </div>

            {babySize && (
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-pink-50 dark:bg-gray-800 rounded-lg">
                <div className="relative w-20 h-20 flex-shrink-0 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl">
                  {babySize.emoji}
                </div>
                <div>
                  <p className="font-medium">Bebeğiniz şu anda yaklaşık olarak...</p>
                  <p className="text-lg font-bold text-pink-500">{babySize.name} büyüklüğünde</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{babySize.description}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Icons.Baby className="h-4 w-4 text-pink-500" />
                Bebeğinizin Gelişimi
              </h3>
              <p className="text-gray-600 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">{babyInfo}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Icons.User className="h-4 w-4 text-pink-500" />
                Anne İçin Öneriler
              </h3>
              <ul className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                {motherTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-pink-100 dark:bg-pink-900 text-pink-500 p-1 rounded-full mr-2 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hamilelik haftasına göre bebek boyutu karşılaştırması
function getBabySizeComparison(week: number) {
  const comparisons = [
    { week: 4, name: "haşhaş tohumu", emoji: "🌱", description: "Yaklaşık 0.4 mm" },
    { week: 5, name: "susam tohumu", emoji: "🌱", description: "Yaklaşık 1.5 mm" },
    { week: 6, name: "mercimek", emoji: "🔴", description: "Yaklaşık 4 mm" },
    { week: 7, name: "yaban mersini", emoji: "🫐", description: "Yaklaşık 1 cm" },
    { week: 8, name: "fasulye tanesi", emoji: "🫘", description: "Yaklaşık 1.6 cm" },
    { week: 9, name: "üzüm tanesi", emoji: "🍇", description: "Yaklaşık 2.3 cm" },
    { week: 10, name: "çilek", emoji: "🍓", description: "Yaklaşık 3.1 cm" },
    { week: 11, name: "misket limonu", emoji: "🍋", description: "Yaklaşık 4.1 cm" },
    { week: 12, name: "kivi", emoji: "🥝", description: "Yaklaşık 5.4 cm" },
    { week: 13, name: "limon", emoji: "🍋", description: "Yaklaşık 7.4 cm" },
    { week: 14, name: "elma", emoji: "🍎", description: "Yaklaşık 8.7 cm" },
    { week: 15, name: "portakal", emoji: "🍊", description: "Yaklaşık 10.1 cm" },
    { week: 16, name: "avokado", emoji: "🥑", description: "Yaklaşık 11.6 cm" },
    { week: 17, name: "nar", emoji: "🍎", description: "Yaklaşık 13 cm" },
    { week: 18, name: "tatlı patates", emoji: "🍠", description: "Yaklaşık 14.2 cm" },
    { week: 19, name: "mango", emoji: "🥭", description: "Yaklaşık 15.3 cm" },
    { week: 20, name: "muz", emoji: "🍌", description: "Yaklaşık 16.4 cm" },
    { week: 21, name: "havuç", emoji: "🥕", description: "Yaklaşık 26.7 cm" },
    { week: 22, name: "patlıcan", emoji: "🍆", description: "Yaklaşık 27.8 cm" },
    { week: 23, name: "mısır koçanı", emoji: "🌽", description: "Yaklaşık 28.9 cm" },
    { week: 24, name: "marul", emoji: "🥬", description: "Yaklaşık 30 cm" },
    { week: 25, name: "karnabahar", emoji: "🥦", description: "Yaklaşık 34.6 cm" },
    { week: 26, name: "lahana", emoji: "🥬", description: "Yaklaşık 35.6 cm" },
    { week: 27, name: "karpuz dilimi", emoji: "🍉", description: "Yaklaşık 36.6 cm" },
    { week: 28, name: "hindistan cevizi", emoji: "🥥", description: "Yaklaşık 37.6 cm" },
    { week: 29, name: "kabak", emoji: "🎃", description: "Yaklaşık 38.6 cm" },
    { week: 30, name: "karpuz", emoji: "🍉", description: "Yaklaşık 39.9 cm" },
    { week: 31, name: "kavun", emoji: "🍈", description: "Yaklaşık 41.1 cm" },
    { week: 32, name: "ananas", emoji: "🍍", description: "Yaklaşık 42.4 cm" },
    { week: 33, name: "kavun", emoji: "🍈", description: "Yaklaşık 43.7 cm" },
    { week: 34, name: "bal kabağı", emoji: "🎃", description: "Yaklaşık 45 cm" },
    { week: 35, name: "hindistan cevizi", emoji: "🥥", description: "Yaklaşık 46.2 cm" },
    { week: 36, name: "lahana", emoji: "🥬", description: "Yaklaşık 47.4 cm" },
    { week: 37, name: "kereviz", emoji: "🥬", description: "Yaklaşık 48.6 cm" },
    { week: 38, name: "karpuz", emoji: "🍉", description: "Yaklaşık 49.8 cm" },
    { week: 39, name: "bal kabağı", emoji: "🎃", description: "Yaklaşık 50.7 cm" },
    { week: 40, name: "karpuz", emoji: "🍉", description: "Yaklaşık 51.2 cm" },
  ]

  // En yakın hafta karşılaştırmasını bul
  const closest = comparisons.reduce((prev, curr) =>
    Math.abs(curr.week - week) < Math.abs(prev.week - week) ? curr : prev,
  )

  return closest
}
