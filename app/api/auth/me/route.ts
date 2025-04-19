import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { users } from "../register/route"

export async function GET(req: NextRequest) {
  try {
    // JWT token'ı al
    const token = cookies().get("bebekplan_auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Yetkilendirme hatası" }, { status: 401 })
    }

    // Token'ı doğrula
    const decoded = verify(token, process.env.JWT_SECRET || "bebekplan-secret-key") as any

    // Kullanıcıyı bul
    const user = users.find((user) => user.id === decoded.id)

    if (!user) {
      // Demo kullanıcısı kontrolü
      if (decoded.email === "demo@bebekplan.com") {
        return NextResponse.json({
          id: "demo-user",
          firstName: "Demo",
          lastName: "Kullanıcı",
          email: "demo@bebekplan.com",
          role: "user",
          status: "active",
        })
      }

      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 })
    }

    // Kullanıcı bilgilerini döndür (şifre hariç)
    const { password, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Yetkilendirme hatası" }, { status: 401 })
  }
}
