import Link from "next/link"
import Logo from "@/components/logo"

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {" "}
        {/* Mobil için daha az padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Hamilelikten bebeklik dönemine kadar gelişim sürecini kolayca takip etmenizi sağlayan kapsamlı uygulama
            </p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Özellikler</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 gap-x-4">
              {" "}
              {/* Mobil için 2 sütun */}
              <li>
                <Link
                  href="/gelisim-takibi"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 text-sm"
                >
                  Gelişim Takibi
                </Link>
              </li>
              <li>
                <Link
                  href="/dogum-sayaci"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 text-sm"
                >
                  Doğum Sayacı
                </Link>
              </li>
              <li>
                <Link
                  href="/beslenme"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 text-sm"
                >
                  Beslenme
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/asistan"
                  className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 text-sm"
                >
                  Yapay Zeka Asistanı
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          {" "}
          {/* Mobil için daha az margin/padding */}
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
            {" "}
            {/* Mobil için ortalama ve margin */}
            &copy; {new Date().getFullYear()} BebekPlan. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://twitter.com"
              className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
            <Link
              href="https://facebook.com"
              className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link
              href="https://instagram.com"
              className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
