import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    // Auth cookie'sini sil
    cookies().delete("bebekplan_auth_token")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Çıkış işlemi sırasında bir hata oluştu" }, { status: 500 })
  }
}
