// Geçici olarak localStorage kullanarak kullanıcı verilerini yönetme
// Edge Config Store hazır olduğunda bu fonksiyonlar güncellenebilir

// Kullanıcıları getir
export async function getUsers() {
  try {
    if (typeof window !== "undefined") {
      const usersStr = localStorage.getItem("bebekplan_users")
      return usersStr ? JSON.parse(usersStr) : []
    }
    return []
  } catch (error) {
    console.error("getUsers error:", error)
    return []
  }
}

// Kullanıcıları kaydet
export async function saveUsers(users: any[]) {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem("bebekplan_users", JSON.stringify(users))
    }
    return true
  } catch (error) {
    console.error("saveUsers error:", error)
    return false
  }
}

// Kullanıcı bul
export async function findUserByEmail(email: string) {
  const users = await getUsers()
  return users.find((user: any) => user.email === email)
}

// Kullanıcı bul (ID ile)
export async function findUserById(id: string) {
  const users = await getUsers()
  return users.find((user: any) => user.id === id)
}

// Yeni kullanıcı ekle
export async function addUser(user: any) {
  const users = await getUsers()
  users.push(user)
  return await saveUsers(users)
}

// Kullanıcıyı güncelle
export async function updateUser(id: string, userData: any) {
  const users = await getUsers()
  const index = users.findIndex((user: any) => user.id === id)

  if (index !== -1) {
    users[index] = { ...users[index], ...userData }
    return await saveUsers(users)
  }

  return false
}
