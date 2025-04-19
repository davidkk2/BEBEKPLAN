"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useAppContext } from "@/lib/context/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Image, Trash2, ShoppingBag, ListChecks, Printer } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { tr } from "date-fns/locale"
import { suggestedProducts, type SuggestedProduct } from "@/lib/suggested-products"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import BirthBagChecklist from "@/components/birth-bag-checklist"
import BebekOdasiClient from "./bebek-odasi-client"

export default function AlisverisListesiClient() {
  const {
    shoppingLists,
    createShoppingList,
    updateShoppingList,
    deleteShoppingList,
    addShoppingItem,
    updateShoppingItem,
    deleteShoppingItem,
    uploadItemImage,
  } = useAppContext()

  const [newListTitle, setNewListTitle] = useState("")
  const [newListDescription, setNewListDescription] = useState("")
  const [isNewListDialogOpen, setIsNewListDialogOpen] = useState(false)

  const [selectedList, setSelectedList] = useState<string | null>(null)
  const [newItemName, setNewItemName] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState(1)
  const [newItemNotes, setNewItemNotes] = useState("")
  const [isNewItemDialogOpen, setIsNewItemDialogOpen] = useState(false)

  const [editingItem, setEditingItem] = useState<{ listId: string; itemId: string } | null>(null)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Önerilen ürünler için state'ler
  const [isSuggestedProductsDialogOpen, setIsSuggestedProductsDialogOpen] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<{ product: SuggestedProduct; quantity: number }[]>([])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCreateList = () => {
    if (newListTitle.trim()) {
      createShoppingList(newListTitle, newListDescription)
      setNewListTitle("")
      setNewListDescription("")
      setIsNewListDialogOpen(false)
    }
  }

  const handleAddItem = () => {
    if (selectedList && newItemName.trim()) {
      addShoppingItem(selectedList, newItemName, newItemQuantity, newItemNotes)
      setNewItemName("")
      setNewItemQuantity(1)
      setNewItemNotes("")
      setIsNewItemDialogOpen(false)
    }
  }

  const handleImageUpload = (listId: string, itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Gerçek bir uygulamada, burada dosyayı bir sunucuya yükleyip URL'sini alırdık
      // Bu örnekte, dosyayı base64 formatına dönüştürüp localStorage'da saklayacağız
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        uploadItemImage(listId, itemId, base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTogglePurchased = (listId: string, itemId: string, purchased: boolean) => {
    updateShoppingItem(listId, itemId, { purchased })
  }

  const openImageDialog = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setIsImageDialogOpen(true)
  }

  // Önerilen ürünleri seçme/kaldırma işlevi
  const toggleProductSelection = (product: SuggestedProduct) => {
    const isSelected = selectedProducts.some((item) => item.product.id === product.id)

    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((item) => item.product.id !== product.id))
    } else {
      setSelectedProducts([...selectedProducts, { product, quantity: product.defaultQuantity }])
    }
  }

  // Seçilen ürünün miktarını güncelleme
  const updateSelectedProductQuantity = (productId: string, quantity: number) => {
    setSelectedProducts(
      selectedProducts.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    )
  }

  // Seçilen ürünleri listeye ekleme
  const addSelectedProductsToList = () => {
    if (selectedList && selectedProducts.length > 0) {
      selectedProducts.forEach((item) => {
        addShoppingItem(selectedList, item.product.name, item.quantity, item.product.description)
      })

      setSelectedProducts([])
      setIsSuggestedProductsDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-block p-3 bg-red-100 rounded-full dark:bg-red-900/30 mb-4">
          <ShoppingCart className="h-10 w-10 text-red-500" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Alışveriş Listesi</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mb-8">
          Bebek ve anne ihtiyaçlarınızı organize edin ve takip edin. Doğum öncesi ve sonrası için alışveriş listenizi
          oluşturun.
        </p>

        <Tabs defaultValue="personal" className="w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Kişisel Listelerim</TabsTrigger>
            <TabsTrigger value="hospital">Doğum Çantası</TabsTrigger>
            <TabsTrigger value="nursery">Bebek Odası</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Kişisel Listelerim</h2>
              <Dialog open={isNewListDialogOpen} onOpenChange={setIsNewListDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-500 hover:bg-red-600">
                    <Plus className="mr-2 h-4 w-4" /> Yeni Liste Oluştur
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yeni Alışveriş Listesi</DialogTitle>
                    <DialogDescription>
                      Yeni bir alışveriş listesi oluşturmak için aşağıdaki bilgileri doldurun.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="list-title">Liste Adı</Label>
                      <Input
                        id="list-title"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        placeholder="Örn: Bebek Kıyafetleri"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="list-description">Açıklama (İsteğe Bağlı)</Label>
                      <Textarea
                        id="list-description"
                        value={newListDescription}
                        onChange={(e) => setNewListDescription(e.target.value)}
                        placeholder="Liste hakkında kısa bir açıklama"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewListDialogOpen(false)}>
                      İptal
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600" onClick={handleCreateList}>
                      Oluştur
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {shoppingLists.length === 0 ? (
              <Card className="text-center p-8">
                <CardContent className="pt-6">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Henüz liste oluşturmadınız</h3>
                  <p className="text-gray-500 mb-4">
                    İhtiyaçlarınızı organize etmek için yeni bir alışveriş listesi oluşturun.
                  </p>
                  <Button className="bg-red-500 hover:bg-red-600" onClick={() => setIsNewListDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Yeni Liste Oluştur
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {shoppingLists.map((list) => (
                  <Card key={list.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle>{list.title}</CardTitle>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => deleteShoppingList(list.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Sil</span>
                          </Button>
                        </div>
                      </div>
                      {list.description && <CardDescription>{list.description}</CardDescription>}
                      <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                        <span>
                          {formatDistanceToNow(new Date(list.createdAt), { addSuffix: true, locale: tr })} oluşturuldu
                        </span>
                        <Badge variant="outline">
                          {list.items.filter((item) => item.purchased).length}/{list.items.length} tamamlandı
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      {list.items.length > 0 ? (
                        <ul className="space-y-3">
                          {list.items.map((item) => (
                            <li
                              key={item.id}
                              className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <Checkbox
                                id={`item-${item.id}`}
                                checked={item.purchased}
                                onCheckedChange={(checked) => handleTogglePurchased(list.id, item.id, checked === true)}
                                className="mt-1"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <label
                                    htmlFor={`item-${item.id}`}
                                    className={`font-medium ${item.purchased ? "line-through text-gray-400" : ""}`}
                                  >
                                    {item.name}
                                  </label>
                                  <div className="flex items-center">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => {
                                        const newQuantity = Math.max(1, item.quantity - 1)
                                        updateShoppingItem(list.id, item.id, { quantity: newQuantity })
                                      }}
                                    >
                                      <span className="font-bold">-</span>
                                    </Button>
                                    <span className="text-sm font-medium mx-1">{item.quantity}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={() => {
                                        updateShoppingItem(list.id, item.id, { quantity: item.quantity + 1 })
                                      }}
                                    >
                                      <span className="font-bold">+</span>
                                    </Button>
                                  </div>
                                </div>
                                {item.notes && <p className="text-sm text-gray-500 truncate">{item.notes}</p>}
                              </div>
                              <div className="flex space-x-1 items-center">
                                {item.imageUrl ? (
                                  <div
                                    className="h-10 w-10 rounded-md overflow-hidden cursor-pointer border border-gray-200"
                                    onClick={() => openImageDialog(item.imageUrl!)}
                                  >
                                    <img
                                      src={item.imageUrl || "/placeholder.svg"}
                                      alt={item.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => {
                                      if (fileInputRef.current) {
                                        setEditingItem({ listId: list.id, itemId: item.id })
                                        fileInputRef.current.click()
                                      }
                                    }}
                                  >
                                    <Image className="h-4 w-4" />
                                    <span className="sr-only">Fotoğraf Ekle</span>
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500"
                                  onClick={() => deleteShoppingItem(list.id, item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Sil</span>
                                </Button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center text-gray-500 py-4">Bu listede henüz ürün yok</p>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0 flex flex-col gap-2">
                      <div className="flex gap-2 w-full">
                        <Dialog
                          open={isNewItemDialogOpen && selectedList === list.id}
                          onOpenChange={(open) => {
                            setIsNewItemDialogOpen(open)
                            if (open) setSelectedList(list.id)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1" onClick={() => setSelectedList(list.id)}>
                              <Plus className="mr-2 h-4 w-4" /> Ürün Ekle
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Yeni Ürün Ekle</DialogTitle>
                              <DialogDescription>{list.title} listesine yeni bir ürün ekleyin.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="item-name">Ürün Adı</Label>
                                <Input
                                  id="item-name"
                                  value={newItemName}
                                  onChange={(e) => setNewItemName(e.target.value)}
                                  placeholder="Örn: Bebek Bezi"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="item-quantity">Miktar</Label>
                                <Input
                                  id="item-quantity"
                                  type="number"
                                  min="1"
                                  value={newItemQuantity}
                                  onChange={(e) => setNewItemQuantity(Number.parseInt(e.target.value) || 1)}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="item-notes">Notlar (İsteğe Bağlı)</Label>
                                <Textarea
                                  id="item-notes"
                                  value={newItemNotes}
                                  onChange={(e) => setNewItemNotes(e.target.value)}
                                  placeholder="Ürün hakkında notlar (marka, boyut, vb.)"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsNewItemDialogOpen(false)}>
                                İptal
                              </Button>
                              <Button className="bg-red-500 hover:bg-red-600" onClick={handleAddItem}>
                                Ekle
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Dialog
                          open={isSuggestedProductsDialogOpen && selectedList === list.id}
                          onOpenChange={(open) => {
                            setIsSuggestedProductsDialogOpen(open)
                            if (open) {
                              setSelectedList(list.id)
                              setSelectedProducts([])
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="default"
                              className="flex-1 bg-red-500 hover:bg-red-600"
                              onClick={() => setSelectedList(list.id)}
                            >
                              <ListChecks className="mr-2 h-4 w-4" /> Önerilen Ürünler
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Önerilen Ürünler</DialogTitle>
                              <DialogDescription>
                                {list.title} listesine eklemek istediğiniz önerilen ürünleri seçin.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="py-4">
                              <Accordion type="multiple" className="w-full">
                                {suggestedProducts.map((category) => (
                                  <AccordionItem key={category.id} value={category.id}>
                                    <AccordionTrigger className="text-lg font-medium">
                                      {category.title}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="space-y-2">
                                        {category.products.map((product) => {
                                          const isSelected = selectedProducts.some(
                                            (item) => item.product.id === product.id,
                                          )
                                          const selectedItem = selectedProducts.find(
                                            (item) => item.product.id === product.id,
                                          )

                                          return (
                                            <div
                                              key={product.id}
                                              className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                                            >
                                              <Checkbox
                                                id={`product-${product.id}`}
                                                checked={isSelected}
                                                onCheckedChange={() => toggleProductSelection(product)}
                                                className="mt-1"
                                              />
                                              <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                  <label htmlFor={`product-${product.id}`} className="font-medium">
                                                    {product.name}
                                                  </label>

                                                  {isSelected && (
                                                    <div className="flex items-center">
                                                      <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => {
                                                          if (selectedItem) {
                                                            updateSelectedProductQuantity(
                                                              product.id,
                                                              selectedItem.quantity - 1,
                                                            )
                                                          }
                                                        }}
                                                      >
                                                        <span className="font-bold">-</span>
                                                      </Button>
                                                      <span className="text-sm font-medium mx-1">
                                                        {selectedItem?.quantity || product.defaultQuantity}
                                                      </span>
                                                      <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={() => {
                                                          if (selectedItem) {
                                                            updateSelectedProductQuantity(
                                                              product.id,
                                                              selectedItem.quantity + 1,
                                                            )
                                                          }
                                                        }}
                                                      >
                                                        <span className="font-bold">+</span>
                                                      </Button>
                                                    </div>
                                                  )}
                                                </div>
                                                {product.description && (
                                                  <p className="text-sm text-gray-500">{product.description}</p>
                                                )}
                                              </div>
                                            </div>
                                          )
                                        })}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </div>

                            <div className="flex justify-between items-center py-2 border-t">
                              <div className="text-sm text-gray-500">{selectedProducts.length} ürün seçildi</div>
                              {selectedProducts.length > 0 && (
                                <Badge variant="outline" className="ml-2">
                                  Toplam {selectedProducts.reduce((sum, item) => sum + item.quantity, 0)} adet
                                </Badge>
                              )}
                            </div>

                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsSuggestedProductsDialogOpen(false)}>
                                İptal
                              </Button>
                              <Button
                                className="bg-red-500 hover:bg-red-600"
                                onClick={addSelectedProductsToList}
                                disabled={selectedProducts.length === 0}
                              >
                                Seçilen Ürünleri Ekle
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="hospital" className="mt-6">
            <div className="flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Doğum Çantası</h2>
                  <p className="text-gray-500">Hastaneye götürmeniz gereken eşyalar</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2" onClick={() => window.print()}>
                  <Printer className="h-4 w-4" />
                  Listeyi Yazdır
                </Button>
              </div>

              <BirthBagChecklist />

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Doğum Çantası Hakkında Bilgiler</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ne Zaman Hazırlanmalı?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        Doğum çantanızı hamileliğinizin 35-36. haftasında hazırlamanız önerilir. Erken doğum ihtimaline
                        karşı 32. haftadan itibaren temel eşyaları hazırlamaya başlayabilirsiniz.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Önemli Belgeler</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                        <li>Kimlik kartı</li>
                        <li>Sağlık sigortası kartı/belgesi</li>
                        <li>Doğum planı (varsa)</li>
                        <li>Hastane kayıt belgeleri</li>
                        <li>Kan grubu kartı</li>
                        <li>Gebelik takip kartı</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nursery" className="mt-6">
            <BebekOdasiClient />
          </TabsContent>
        </Tabs>
      </div>

      {/* Gizli dosya input'u */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          if (editingItem) {
            handleImageUpload(editingItem.listId, editingItem.itemId, e)
            setEditingItem(null)
          }
        }}
      />

      {/* Fotoğraf görüntüleme dialog'u */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ürün Fotoğrafı</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="flex items-center justify-center p-2">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Ürün fotoğrafı"
                className="max-h-[70vh] max-w-full object-contain rounded-md"
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
