import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { APP_NAME, APP_DESCRIPTION, APP_URL } from "@/lib/constants"
import { AppProvider } from "@/lib/context/app-context"
import { UserProvider } from "@/lib/context/user-context"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"
import ScrollToTop from "@/components/scroll-to-top"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

// Daha iyi SEO için ek meta etiketleri
export const metadata: Metadata = {
  title: `${APP_NAME} - Hamilelik ve Bebek Gelişimi Takip Uygulaması`,
  description: APP_DESCRIPTION,
  keywords: "hamilelik, bebek gelişimi, doğum sayacı, bebek takibi, anne, hamile, bebek bakımı",
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  publisher: APP_NAME,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: APP_URL,
    title: `${APP_NAME} - Hamilelik ve Bebek Gelişimi Takip Uygulaması`,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - Hamilelik ve Bebek Gelişimi Takip Uygulaması`,
    description: APP_DESCRIPTION,
  },
  alternates: {
    canonical: APP_URL,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-icon.png",
  },
  themeColor: "#ec4899",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-K6FGGBVD');
  `,
          }}
        />

        {/* Google Analytics 4 (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FC37YK9MTK"
          strategy="afterInteractive"
          id="ga4-script"
        />
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FC37YK9MTK');
          `,
          }}
        />

        {/* Google AdSense - doğrudan HTML script etiketi olarak eklendi */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1849993013741154"
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K6FGGBVD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          storageKey="bebekplan-theme"
          disableTransitionOnChange
        >
          <UserProvider>
            <AppProvider>
              <ScrollToTop />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <Toaster />
            </AppProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
