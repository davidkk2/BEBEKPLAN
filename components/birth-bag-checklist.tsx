"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui-icons"
import { toast } from "@/components/ui/use-toast"
import { useAppContext } from "@/lib/context/app-context"

interface ChecklistItem {
  id: string
  name: string
  checked: boolean
}

interface ChecklistCategory {
  id: string
  title: string
  items: ChecklistItem[]
}

export function BirthBagChecklist() {
  // Context'ten doğum çantası verilerini al
  const { birthBagItems, updateBirthBagItem, updateAllBirthBagItems, resetBirthBagItems } = useAppContext()
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  // Tamamlanma yüzdesini hesapla
  const calculateProgress = () => {
    const totalItems = birthBagItems.reduce((total, category) => total + category.items.length, 0)
    const checkedItems = birthBagItems.reduce(
      (total, category) => total + category.items.filter((item) => item.checked).length,
      0,
    )

    return totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0
  }

  const progress = calculateProgress()

  // Sayfa yüklendiğinde ilk kategoriyi aç
  useEffect(() => {
    if (birthBagItems.length > 0 && expandedCategories.length === 0) {
      setExpandedCategories([birthBagItems[0].id])
    }
  }, [birthBagItems, expandedCategories])

  // Öğe durumunu değiştir
  const toggleItem = (categoryId: string, itemId: string) => {
    const category = birthBagItems.find((c) => c.id === categoryId)
    if (category) {
      const item = category.items.find((i) => i.id === itemId)
      if (item) {
        updateBirthBagItem(categoryId, itemId, !item.checked)
      }
    }
  }

  // Tüm öğeleri işaretle/işareti kaldır
  const toggleAllItems = (categoryId: string, checked: boolean) => {
    updateAllBirthBagItems(categoryId, checked)

    toast({
      title: checked ? "Tüm öğeler işaretlendi" : "Tüm işaretler kaldırıldı",
      description: `${birthBagItems.find((c) => c.id === categoryId)?.title} kategorisindeki tüm öğeler ${checked ? "işaretlendi" : "işareti kaldırıldı"}.`,
      duration: 2000,
    })
  }

  // Listeyi sıfırla
  const handleResetChecklist = () => {
    if (confirm("Tüm işaretleri kaldırmak istediğinize emin misiniz?")) {
      resetBirthBagItems()
      toast({
        title: "Liste sıfırlandı",
        description: "Tüm işaretler kaldırıldı ve liste varsayılan haline döndürüldü.",
        duration: 2000,
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
        <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="flex items-center gap-2">
            <Icons.Calendar className="h-5 w-5 text-pink-500" />
            Doğum Çantası Kontrol Listesi
          </span>
          <div className="w-full sm:w-48 flex flex-col gap-1">
            <Progress value={progress} className="h-2" aria-label={`İlerleme: %${progress}`} />
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{progress}% tamamlandı</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Doğum çantanızda bulunması gereken eşyaları işaretleyerek takip edin.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetChecklist}
            className="text-xs"
            aria-label="Listeyi sıfırla"
          >
            <Icons.X className="mr-1 h-3 w-3" />
            Listeyi Sıfırla
          </Button>
        </div>

        <Accordion type="multiple" value={expandedCategories} onValueChange={setExpandedCategories} className="w-full">
          {birthBagItems.map((category) => {
            const categoryCompleted = category.items.every((item) => item.checked)
            const categoryProgress = Math.round(
              (category.items.filter((item) => item.checked).length / category.items.length) * 100,
            )

            return (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <AccordionTrigger className="hover:text-pink-500 py-4">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${categoryCompleted ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}
                      />
                      <span className="text-lg font-medium">{category.title}</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{categoryProgress}%</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2 pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {category.items.filter((item) => item.checked).length} / {category.items.length} öğe tamamlandı
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAllItems(category.id, true)}
                          className="text-xs h-7 px-2"
                          aria-label="Tümünü işaretle"
                        >
                          Tümünü İşaretle
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAllItems(category.id, false)}
                          className="text-xs h-7 px-2"
                          aria-label="Tüm işaretleri kaldır"
                        >
                          Tümünü Temizle
                        </Button>
                      </div>
                    </div>

                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <Checkbox
                          id={`${category.id}-${item.id}`}
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(category.id, item.id)}
                        />
                        <Label
                          htmlFor={`${category.id}-${item.id}`}
                          className={`flex-1 cursor-pointer ${item.checked ? "line-through text-gray-400" : ""}`}
                        >
                          {item.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {progress === 100 && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg text-center">
            <h3 className="text-lg font-medium text-green-700 dark:text-green-400">Tebrikler!</h3>
            <p className="text-green-600 dark:text-green-300">Doğum çantanız hazır. Bebeğinizin gelişine hazırsınız!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BirthBagChecklist
