import { type NextRequest, NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"
import { users } from "../register/route"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log("Login request body:", body)

    const { email, password } = body

    // Kullanıcıyı e-posta adresine göre bul
    const user = users.find((user) => user.email === email)
    if (!user) {
      console.log("User not found:", email)
      // Demo hesabı kontrolü
      if (email === "demo@bebekplan.com" && password === "password") {
        const demoUser = {
          id: "demo-user",
          firstName: "Demo",
          lastName: "Kullanıcı",
          email: "demo@bebekplan.com",
          role: "user",
          status: "active",
        }

        // JWT token oluştur
        const token = sign(
          {
            id: demoUser.id,
            email: demoUser.email,
            name: `${demoUser.firstName} ${demoUser.lastName}`,
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

        console.log("Demo user logged in successfully")
        return NextResponse.json(demoUser)
      }

      return NextResponse.json({ error: "E-posta adresi veya şifre hatalı" }, { status: 401 })
    }

    // Şifreleri karşılaştır
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      console.log("Password does not match for user:", email)
      return NextResponse.json({ error: "E-posta adresi veya şifre hatalı" }, { status: 401 })
    }

    // JWT token oluştur
    const token = sign(
      {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
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

    console.log("User logged in successfully:", email)

    // Kullanıcı bilgilerini döndür (şifre hariç)
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Giriş hatası:", error)
    return NextResponse.json({ error: "Giriş işlemi sırasında bir hata oluştu" }, { status: 500 })
  }
}
