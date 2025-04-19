"use client"

import { useState, useEffect } from "react"

// localStorage'da veri saklama ve yönetme için özel hook
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Tarayıcıda çalıştığımızdan emin olmak için state'i başlatırken bir fonksiyon kullanıyoruz
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      // localStorage'dan değeri al
      const item = window.localStorage.getItem(key)
      // Parse edilmiş JSON değerini veya initialValue'yu döndür
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // Hata durumunda initialValue'yu döndür
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // storedValue değiştiğinde localStorage'ı güncelle
  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    try {
      // Değeri localStorage'a kaydet
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
