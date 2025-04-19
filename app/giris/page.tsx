import GirisForm from "./giris-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Giriş Yap | BebekPlan",
  description: "BebekPlan hesabınıza giriş yapın ve kişiselleştirilmiş hamilelik ve bebek takip deneyiminize başlayın.",
}

export default function GirisPage() {
  return <GirisForm />
}
