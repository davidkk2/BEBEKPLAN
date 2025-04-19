import type { Metadata } from "next"
import AsistanClientPage from "./AsistanClientPage"

export const metadata: Metadata = {
  title: "BebekPlan - Yapay Zeka Asistanı",
  description: "Hamilelik ve bebek bakımı hakkında sorularınızı yanıtlayan yapay zeka asistanı",
}

export default function AsistanPage() {
  return <AsistanClientPage />
}
