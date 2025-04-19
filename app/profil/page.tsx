import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import ProfileClientPage from "./ProfileClientPage"

export const metadata = {
  title: "Profil | BebekPlan",
  description: "Kişisel bilgilerinizi ve hamilelik takibinizi yönetin.",
}

export default function ProfilePage() {
  // Server-side auth kontrolü
  const authCookie = cookies().get("bebekplan_auth")

  // Eğer auth cookie yoksa, giriş sayfasına yönlendir
  if (!authCookie || !authCookie.value) {
    redirect("/giris?redirect=/profil")
  }

  // Cookie değerini parse et
  let userData
  try {
    userData = JSON.parse(authCookie.value)
  } catch (error) {
    console.error("Invalid auth cookie:", error)
    redirect("/giris?redirect=/profil")
  }

  // Geçerli bir kullanıcı verisi yoksa, giriş sayfasına yönlendir
  if (!userData || !userData.id || !userData.email) {
    redirect("/giris?redirect=/profil")
  }

  return <ProfileClientPage />
}
