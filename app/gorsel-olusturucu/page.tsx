import CanvasImageGenerator from "@/components/canvas-image-generator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Görsel Oluşturucu | BebekPlan",
  description: "Kendi özel görsellerinizi oluşturun ve indirin",
}

export default function ImageGeneratorPage() {
  return (
    <div className="container mx-auto py-8">
      <CanvasImageGenerator />
    </div>
  )
}
