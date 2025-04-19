"use client"

// Kullanıcının giriş yapmış olup olmadığını kontrol et
export function isAuthenticated() {
  if (typeof window === "undefined") return false
  return localStorage.getItem("bebekplan_auth") === "true"
}

// Kullanıcı bilgilerini getir
export function getCurrentUser() {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("bebekplan_user")
  return userStr ? JSON.parse(userStr) : null
}

// Çıkış yap
export function logout() {
  if (typeof window === "undefined") return
  localStorage.removeItem("bebekplan_auth")
  localStorage.removeItem("bebekplan_user")
}
