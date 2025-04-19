"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  firstName?: string
  lastName?: string
  email: string
  role?: string
  status?: string
  avatar?: string
  name?: string
  profile?: any
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Sayfa yüklendiğinde kullanıcı bilgilerini kontrol et
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          setIsAuthenticated(true)

          // Ayrıca localStorage'a da kaydet (istemci tarafı erişim için)
          localStorage.setItem("bebekplan_auth", JSON.stringify(userData))
        } else {
          setUser(null)
          setIsAuthenticated(false)
          localStorage.removeItem("bebekplan_auth")
        }
      } catch (error) {
        console.error("Auth check error:", error)
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem("bebekplan_auth")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Kayıt fonksiyonu
  const register = async (userData: any) => {
    setIsLoading(true)

    try {
      console.log("Registering user:", userData.email)
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      console.log("Register response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("Register success:", data)
        setUser(data)
        setIsAuthenticated(true)

        // localStorage'a da kaydet
        localStorage.setItem("bebekplan_auth", JSON.stringify(data))

        setIsLoading(false)
        return true
      } else {
        const error = await response.json()
        console.error("Registration error:", error)
        setIsLoading(false)
        return false
      }
    } catch (error) {
      console.error("Registration error:", error)
      setIsLoading(false)
      return false
    }
  }

  // Giriş fonksiyonu
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      console.log("Logging in user:", email)
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      console.log("Login response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("Login success:", data)
        setUser(data)
        setIsAuthenticated(true)

        // localStorage'a da kaydet
        localStorage.setItem("bebekplan_auth", JSON.stringify(data))

        setIsLoading(false)
        return true
      } else {
        const error = await response.json()
        console.error("Login error:", error)
        setIsLoading(false)
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  // Çıkış fonksiyonu
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })

      setUser(null)
      setIsAuthenticated(false)
      localStorage.removeItem("bebekplan_auth")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
