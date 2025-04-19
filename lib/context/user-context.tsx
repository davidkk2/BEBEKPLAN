"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserProfile = {
  firstName: string
  lastName: string
  email: string
  role: string
  status: string
  dueDate?: Date
  pregnancyWeek?: string
  babyBirthDate?: Date
  babyGender?: string
  babyCount?: string
  avatar?: string
}

interface UserContextType {
  profile: UserProfile | null
  updateProfile: (data: Partial<UserProfile>) => void
  hasProfile: boolean
}

const defaultProfile: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
  role: "mother",
  status: "pregnant",
}

const UserContext = createContext<UserContextType>({
  profile: null,
  updateProfile: () => {},
  hasProfile: false,
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini al
  useEffect(() => {
    const storedProfile = localStorage.getItem("bebekplan_profile")
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile)

        // Tarih string'lerini Date objelerine dönüştür
        if (parsedProfile.dueDate && typeof parsedProfile.dueDate === "string") {
          parsedProfile.dueDate = new Date(parsedProfile.dueDate)
        }
        if (parsedProfile.babyBirthDate && typeof parsedProfile.babyBirthDate === "string") {
          parsedProfile.babyBirthDate = new Date(parsedProfile.babyBirthDate)
        }

        setProfile(parsedProfile)
      } catch (error) {
        console.error("Stored profile data is invalid", error)
        localStorage.removeItem("bebekplan_profile")
        setProfile(defaultProfile)
      }
    } else {
      setProfile(defaultProfile)
    }
  }, [])

  // Profil bilgilerini güncelle
  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => {
      if (!prev) return null

      const updatedProfile = { ...prev, ...data } as UserProfile

      // Tarih nesnelerini string'e dönüştür (localStorage için)
      const storageProfile = { ...updatedProfile }
      if (storageProfile.dueDate instanceof Date) {
        storageProfile.dueDate = storageProfile.dueDate.toISOString()
      }
      if (storageProfile.babyBirthDate instanceof Date) {
        storageProfile.babyBirthDate = storageProfile.babyBirthDate.toISOString()
      }

      // localStorage'a kaydet
      localStorage.setItem("bebekplan_profile", JSON.stringify(storageProfile))

      return updatedProfile
    })
  }

  // Profil bilgilerinin doldurulup doldurulmadığını kontrol et
  const hasProfile = !!profile && !!profile.firstName && !!profile.lastName

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        hasProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Mevcut useUser hook'unu koruyalım
export const useUser = () => useContext(UserContext)

// Eksik olan useUserContext hook'unu ekleyelim
export const useUserContext = () => useContext(UserContext)
