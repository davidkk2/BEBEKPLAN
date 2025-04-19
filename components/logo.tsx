import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export default function Logo({ size = "medium", className }: LogoProps) {
  const sizeClasses = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-4xl md:text-5xl",
  }

  return (
    <div className={cn("font-bold flex items-center", sizeClasses[size], className)}>
      <span className="text-pink-400">Bebek</span>
      <span className="text-gray-800 dark:text-gray-200">Plan</span>
    </div>
  )
}
