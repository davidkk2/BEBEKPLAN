import {
  Calendar,
  ShoppingCart,
  Heart,
  Star,
  Check,
  ArrowRight,
  Baby,
  Sparkles,
  Clock,
  List,
  Gift,
  MessageSquare,
  User,
  BookOpen,
  Apple,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Search,
  Share2,
  Copy,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  LogOut,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Trash,
  Edit,
  Save,
  Download,
  Upload,
  RefreshCw,
  Home,
  FileText,
  Users,
  Bell,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  MoreHorizontal,
  MoreVertical,
  Send,
  ImageIcon,
  Paperclip,
  Smile,
  CalendarIcon,
  type LucideIcon,
} from "lucide-react"

export type IconName =
  | "Calendar"
  | "ShoppingCart"
  | "Heart"
  | "Star"
  | "Check"
  | "ArrowRight"
  | "Baby"
  | "Sparkles"
  | "Clock"
  | "List"
  | "Gift"
  | "MessageSquare"
  | "User"
  | "BookOpen"
  | "Apple"
  | "Menu"
  | "X"
  | "Moon"
  | "Sun"
  | "ChevronDown"
  | "ChevronRight"
  | "ChevronUp"
  | "Search"
  | "Share2"
  | "Copy"
  | "CheckCircle"
  | "AlertCircle"
  | "Info"
  | "Settings"
  | "LogOut"
  | "Mail"
  | "Lock"
  | "Eye"
  | "EyeOff"
  | "Plus"
  | "Minus"
  | "Trash"
  | "Edit"
  | "Save"
  | "Download"
  | "Upload"
  | "RefreshCw"
  | "Home"
  | "FileText"
  | "Users"
  | "Bell"
  | "HelpCircle"
  | "ExternalLink"
  | "ChevronLeft"
  | "MoreHorizontal"
  | "MoreVertical"
  | "Send"
  | "Image"
  | "Paperclip"
  | "Smile"
  | "CalendarIcon"

export const Icons: Record<IconName, LucideIcon> = {
  Calendar,
  ShoppingCart,
  Heart,
  Star,
  Check,
  ArrowRight,
  Baby,
  Sparkles,
  Clock,
  List,
  Gift,
  MessageSquare,
  User,
  BookOpen,
  Apple,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Search,
  Share2,
  Copy,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  LogOut,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Minus,
  Trash,
  Edit,
  Save,
  Download,
  Upload,
  RefreshCw,
  Home,
  FileText,
  Users,
  Bell,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  MoreHorizontal,
  MoreVertical,
  Send,
  ImageIcon,
  Paperclip,
  Smile,
  CalendarIcon,
}

export function getIcon(name: IconName) {
  return Icons[name]
}
