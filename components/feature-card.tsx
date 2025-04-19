import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Icons } from "@/components/ui-icons"
import { cn } from "@/lib/utils"

// Alışveriş listesi için özel ikon ekleyelim
import { ShoppingBasket } from "lucide-react"

// Props tipini güncelle
interface FeatureCardProps {
  icon: string
  title: string
  description: string
  href: string
  buttonText: string
  featured?: boolean
}

// Bileşeni güncelle
export default function FeatureCard({ icon, title, description, href, buttonText, featured }: FeatureCardProps) {
  // Alışveriş listesi için özel ikon kontrolü
  let IconComponent
  if (icon === "shoppingList" || title.includes("Alışveriş")) {
    IconComponent = ShoppingBasket
  } else {
    IconComponent = Icons[icon as keyof typeof Icons]
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-6 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md",
        featured
          ? "bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-2 border-red-200 dark:border-red-800 transform hover:-translate-y-1"
          : "bg-white dark:bg-gray-800",
      )}
    >
      <div
        className={cn(
          "p-3 rounded-full mb-4",
          featured ? "bg-red-100 dark:bg-red-900/30" : "bg-pink-100 dark:bg-pink-900/30",
        )}
      >
        {IconComponent && (
          <IconComponent className={cn("h-8 w-8", featured ? "text-red-500" : "text-pink-500")} aria-hidden="true" />
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{description}</p>
      <Button
        asChild
        variant={featured ? "default" : "outline"}
        className={cn("mt-auto w-full", featured && "bg-red-500 hover:bg-red-600 text-white")}
      >
        <Link href={href}>{buttonText}</Link>
      </Button>
      {featured && (
        <span className="inline-block mt-2 text-xs font-semibold text-red-500 dark:text-red-400">Yeni Özellik!</span>
      )}
    </div>
  )
}
