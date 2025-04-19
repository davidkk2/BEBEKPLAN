import { type NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"

// Geçici kullanıcı veritabanı
const users: any[] = []

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log("Register request body:", body)

    const { firstName, lastName, email, password, role = "user", status = "active", profile } = body

    // E-posta adresinin daha önce kullanılıp kullanılmadığını kontrol et
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "Bu e-posta adresi zaten kullanılıyor" }, { status: 400 })
    }

    // Şifreyi hash'le
    const hashedPassword = await hash(password, 10)

    // Yeni kullanıcı oluştur
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      status,
      profile,
      createdAt: new Date().toISOString(),
    }

    // Kullanıcıyı kaydet
    users.push(newUser)
    console.log("User registered successfully:", newUser.email)

    // JWT token oluştur
    const token = sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: `${newUser.firstName} ${newUser.lastName}`,
      },
      process.env.JWT_SECRET || "bebekplan-secret-key",
      { expiresIn: "7d" },
    )

    // Cookie'ye token'ı kaydet
    cookies().set({
      name: "bebekplan_auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 gün
      sameSite: "strict",
    })

    // Kullanıcı bilgilerini döndür (şifre hariç)
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Kayıt hatası:", error)
    return NextResponse.json({ error: "Kayıt işlemi sırasında bir hata oluştu" }, { status: 500 })
  }
}

export { users }
