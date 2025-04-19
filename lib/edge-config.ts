import { createClient } from "@vercel/edge-config"

// Edge Config istemcisini oluştur
export const edgeConfig = createClient(process.env.EDGE_CONFIG)

// Kullanıcıları getir
export async function getUsers() {
  try {
    console.log("Edge Config URL:", process.env.EDGE_CONFIG)
    const users = await edgeConfig.get("users")
    console.log("Retrieved users:", users)
    return users || []
  } catch (error) {
    console.error("Edge Config getUsers error:", error)
    return []
  }
}

// Kullanıcıları kaydet
export async function saveUsers(users: any[]) {
  try {
    console.log("Saving users:", users)
    await edgeConfig.set("users", users)
    return true
  } catch (error) {
    console.error("Edge Config saveUsers error:", error)
    return false
  }
}

// Kullanıcı bul
export async function findUserByEmail(email: string) {
  const users = await getUsers()
  console.log("Finding user by email:", email)
  return users.find((user: any) => user.email === email)
}

// Kullanıcı bul (ID ile)
export async function findUserById(id: string) {
  const users = await getUsers()
  console.log("Finding user by ID:", id)
  return users.find((user: any) => user.id === id)
}

// Yeni kullanıcı ekle
export async function addUser(user: any) {
  const users = await getUsers()
  console.log("Adding new user:", user.email)
  users.push(user)
  return await saveUsers(users)
}

// Kullanıcıyı güncelle
export async function updateUser(id: string, userData: any) {
  const users = await getUsers()
  const index = users.findIndex((user: any) => user.id === id)
  console.log("Updating user with ID:", id)

  if (index !== -1) {
    users[index] = { ...users[index], ...userData }
    return await saveUsers(users)
  }

  return false
}
