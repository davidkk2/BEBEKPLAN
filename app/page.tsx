import HomePage from "@/components/home-page"
import type { Metadata } from "next"
import { APP_DESCRIPTION } from "@/lib/constants"

export const metadata: Metadata = {
  title: "BebekPlan - Türkiye'nin İlk Kişiselleştirilebilir Bebek Alışveriş Websitesi",
  description: APP_DESCRIPTION,
}

export default function Home() {
  return <HomePage />
}
