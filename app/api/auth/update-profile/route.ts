import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { findUserById, updateUser } from "@/lib/edge-config"

export async function POST(req: NextRequest) {
  try {
    // Cookie'den token'ı al
    const token = cookies().get("bebekplan_auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Yetkilendirme hatası" }, { status: 401 })
    }

    // Token'ı doğrula
    const decoded = verify(token, process.env.JWT_SECRET || "bebekplan-secret-key") as any

    // Kullanıcıyı ID'ye göre bul
    const user = await findUserById(decoded.id)

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 })
    }

    // Güncellenecek verileri al
    const body = await req.json()

    // Şifre ve e-posta gibi hassas bilgilerin güncellenmesini engelle
    const { password, email, role, status, ...updateData } = body

    // Kullanıcıyı güncelle
    const success = await updateUser(user.id, updateData)

    if (!success) {
      return NextResponse.json({ error: "Profil güncellenemedi" }, { status: 500 })
    }

    // Güncellenmiş kullanıcı bilgilerini al
    const updatedUser = await findUserById(user.id)

    // Kullanıcı bilgilerini döndür (şifre hariç)
    const { password: _, ...userWithoutPassword } = updatedUser
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Profil güncelleme hatası:", error)
    return NextResponse.json({ error: "Profil güncellenirken bir hata oluştu" }, { status: 500 })
  }
}
