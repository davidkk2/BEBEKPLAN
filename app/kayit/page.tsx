import type { Metadata } from "next"
import KayitForm from "./kayit-form"

export const metadata: Metadata = {
  title: "Kayıt Ol | BebekPlan",
  description: "BebekPlan'a üye olun ve kişiselleştirilmiş hamilelik ve bebek takip deneyiminin keyfini çıkarın.",
}

export default function KayitPage() {
  return <KayitForm />
}
