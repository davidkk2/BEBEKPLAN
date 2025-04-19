import LogoGenerator from "@/components/logo-generator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Logo Oluşturucu | BebekPlan",
  description: "Kendi özel logonuzu oluşturun ve indirin",
}

export default function LogoGeneratorPage() {
  return (
    <div className="container mx-auto py-8">
      <LogoGenerator />
    </div>
  )
}
