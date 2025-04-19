import AdSenseAd from "./adsense-ad"

interface AdContainerProps {
  position: "top" | "bottom" | "sidebar" | "content"
  className?: string
}

export default function AdContainer({ position, className = "" }: AdContainerProps) {
  // Define different ad slots based on position
  const getSlotForPosition = () => {
    switch (position) {
      case "top":
        return "1234567890" // Replace with your actual top ad slot
      case "bottom":
        return "0987654321" // Replace with your actual bottom ad slot
      case "sidebar":
        return "5678901234" // Replace with your actual sidebar ad slot
      case "content":
        return "3456789012" // Replace with your actual in-content ad slot
      default:
        return "1234567890"
    }
  }

  return (
    <div className={`ad-container ad-${position} ${className}`}>
      <AdSenseAd slot={getSlotForPosition()} format="auto" />
    </div>
  )
}
