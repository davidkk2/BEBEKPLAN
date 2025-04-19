"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useLocalStorage } from "@/lib/hooks/use-local-storage"
import { birthBagProducts } from "@/lib/birth-bag-products"

// Doğum çantası için tip tanımlamaları
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

// Alışveriş listesi için tip tanımlamaları ekleyelim
interface ShoppingListItem {
  id: string
  name: string
  quantity: number
  purchased: boolean
  imageUrl?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface ShoppingList {
  id: string
  title: string
  description?: string
  items: ShoppingListItem[]
  createdAt: string
  updatedAt: string
}

// Context için tip tanımlamaları
export interface AppContextType {
  // Doğum tarihi ile ilgili state'ler
  birthDate: Date | null
  setBirthDate: (date: Date | null) => void
  daysLeft: number

  // Doğum çantası ile ilgili state'ler
  birthBagItems: {
    id: string
    title: string
    items: {
      id: string
      name: string
      checked: boolean
    }[]
  }[]
  updateBirthBagItem: (categoryId: string, itemId: string, checked: boolean) => void
  updateAllBirthBagItems: (categoryId: string, checked: boolean) => void
  resetBirthBagItems: () => void

  // Alışveriş listesi state'leri ve fonksiyonları
  shoppingLists: ShoppingList[]
  createShoppingList: (title: string, description?: string) => ShoppingList
  updateShoppingList: (
    listId: string,
    data: Partial<Omit<ShoppingList, "id" | "items" | "createdAt" | "updatedAt">>,
  ) => void
  deleteShoppingList: (listId: string) => void

  addShoppingItem: (listId: string, name: string, quantity: number, notes?: string) => ShoppingListItem
  updateShoppingItem: (
    listId: string,
    itemId: string,
    data: Partial<Omit<ShoppingListItem, "id" | "createdAt" | "updatedAt">>,
  ) => void
  deleteShoppingItem: (listId: string, itemId: string) => void
  uploadItemImage: (listId: string, itemId: string, imageUrl: string) => void

  // Kullanıcı tercihleri
  userPreferences: {
    notifications: boolean
    language: string
  }
  updateUserPreferences: (preferences: Partial<{ notifications: boolean; language: string }>) => void

  // Uygulama durumu
  isLoading: boolean
  setIsLoading: (loading: boolean) => void

  // Yardımcı fonksiyonlar
  refreshData: () => void
}

// Varsayılan değerler
const defaultContext: AppContextType = {
  birthDate: null,
  setBirthDate: () => {},
  daysLeft: 0,

  birthBagItems: [],
  updateBirthBagItem: () => {},
  updateAllBirthBagItems: () => {},
  resetBirthBagItems: () => {},

  // Alışveriş listesi varsayılan değerleri
  shoppingLists: [],
  createShoppingList: () => ({ id: "", title: "", items: [], createdAt: "", updatedAt: "" }),
  updateShoppingList: () => {},
  deleteShoppingList: () => {},

  addShoppingItem: () => ({ id: "", name: "", quantity: 0, purchased: false, createdAt: "", updatedAt: "" }),
  updateShoppingItem: () => {},
  deleteShoppingItem: () => {},
  uploadItemImage: () => {},

  userPreferences: {
    notifications: true,
    language: "tr",
  },
  updateUserPreferences: () => {},

  isLoading: false,
  setIsLoading: () => {},

  refreshData: () => {},
}

// Context oluşturma
const AppContext = createContext<AppContextType>(defaultContext)

// Context provider bileşeni
export function AppProvider({ children }: { children: ReactNode }) {
  // Doğum tarihi state'i
  const [savedBirthDate, setSavedBirthDate] = useLocalStorage<string | null>("birth-due-date", null)
  const [birthDate, setBirthDateState] = useState<Date | null>(savedBirthDate ? new Date(savedBirthDate) : null)
  const [daysLeft, setDaysLeft] = useState(0)

  // Doğum çantası öğeleri
  const [birthBagItems, setBirthBagItems] = useLocalStorage<
    {
      id: string
      title: string
      items: {
        id: string
        name: string
        checked: boolean
      }[]
    }[]
  >("birth-bag-items", initializeBirthBagItems())

  // Doğum çantası öğelerini başlatma fonksiyonu
  function initializeBirthBagItems() {
    return birthBagProducts.map((category) => ({
      id: category.id,
      title: category.title,
      items: category.products.map((product) => ({
        id: product.id,
        name: product.name,
        checked: false,
      })),
    }))
  }

  // Doğum çantası öğesini güncelleme
  const updateBirthBagItem = (categoryId: string, itemId: string, checked: boolean) => {
    setBirthBagItems((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) => (item.id === itemId ? { ...item, checked } : item)),
            }
          : category,
      ),
    )
  }

  // Bir kategorideki tüm öğeleri güncelleme
  const updateAllBirthBagItems = (categoryId: string, checked: boolean) => {
    setBirthBagItems((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) => ({ ...item, checked })),
            }
          : category,
      ),
    )
  }

  // Tüm doğum çantası öğelerini sıfırlama
  const resetBirthBagItems = () => {
    setBirthBagItems(initializeBirthBagItems())
  }

  // Alışveriş listesi state'i
  const [shoppingLists, setShoppingLists] = useLocalStorage<ShoppingList[]>("shopping-lists", [])

  // Kullanıcı tercihleri state'i
  const [userPreferences, setUserPreferences] = useLocalStorage("user-preferences", {
    notifications: true,
    language: "tr",
  })

  // Uygulama durumu state'i
  const [isLoading, setIsLoading] = useState(false)

  // Doğum tarihini ayarla ve localStorage'a kaydet
  const setBirthDate = (date: Date | null) => {
    if (date) {
      setBirthDateState(date)
      setSavedBirthDate(date.toISOString())
    } else {
      setBirthDateState(null)
      setSavedBirthDate(null)
    }
  }

  // Kullanıcı tercihlerini güncelle
  const updateUserPreferences = (preferences: Partial<{ notifications: boolean; language: string }>) => {
    setUserPreferences((prev) => ({ ...prev, ...preferences }))
  }

  // Verileri yenile
  const refreshData = () => {
    // Burada API çağrıları veya diğer veri yenileme işlemleri yapılabilir
    if (savedBirthDate) {
      setBirthDateState(new Date(savedBirthDate))
    }
  }

  // Alışveriş listesi fonksiyonları
  const createShoppingList = (title: string, description?: string): ShoppingList => {
    const newList: ShoppingList = {
      id: crypto.randomUUID(),
      title,
      description,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setShoppingLists((prev) => [...prev, newList])
    return newList
  }

  const updateShoppingList = (
    listId: string,
    data: Partial<Omit<ShoppingList, "id" | "items" | "createdAt" | "updatedAt">>,
  ) => {
    setShoppingLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : list,
      ),
    )
  }

  const deleteShoppingList = (listId: string) => {
    setShoppingLists((prev) => prev.filter((list) => list.id !== listId))
  }

  const addShoppingItem = (listId: string, name: string, quantity: number, notes?: string): ShoppingListItem => {
    const newItem: ShoppingListItem = {
      id: crypto.randomUUID(),
      name,
      quantity,
      purchased: false,
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setShoppingLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: [...list.items, newItem],
              updatedAt: new Date().toISOString(),
            }
          : list,
      ),
    )

    return newItem
  }

  const updateShoppingItem = (
    listId: string,
    itemId: string,
    data: Partial<Omit<ShoppingListItem, "id" | "createdAt" | "updatedAt">>,
  ) => {
    setShoppingLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      ...data,
                      updatedAt: new Date().toISOString(),
                    }
                  : item,
              ),
              updatedAt: new Date().toISOString(),
            }
          : list,
      ),
    )
  }

  const deleteShoppingItem = (listId: string, itemId: string) => {
    setShoppingLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter((item) => item.id !== itemId),
              updatedAt: new Date().toISOString(),
            }
          : list,
      ),
    )
  }

  const uploadItemImage = (listId: string, itemId: string, imageUrl: string) => {
    updateShoppingItem(listId, itemId, { imageUrl })
  }

  // Kalan günleri hesapla
  useEffect(() => {
    if (birthDate) {
      const now = new Date()
      const diffTime = birthDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysLeft(diffDays > 0 ? diffDays : 0)
    } else {
      setDaysLeft(0)
    }
  }, [birthDate])

  // Context değerlerini oluştur
  const contextValue: AppContextType = {
    birthDate,
    setBirthDate,
    daysLeft,

    birthBagItems,
    updateBirthBagItem,
    updateAllBirthBagItems,
    resetBirthBagItems,

    // Alışveriş listesi değerleri
    shoppingLists,
    createShoppingList,
    updateShoppingList,
    deleteShoppingList,

    addShoppingItem,
    updateShoppingItem,
    deleteShoppingItem,
    uploadItemImage,

    userPreferences,
    updateUserPreferences,

    isLoading,
    setIsLoading,

    refreshData,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

// Context hook'u
export const useAppContext = () => useContext(AppContext)
