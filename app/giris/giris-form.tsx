"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import Logo from "@/components/logo"

// Giriş formu şeması
const loginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  password: z.string().min(1, { message: "Şifre gereklidir" }),
  rememberMe: z.boolean().default(false),
})

export default function GirisForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Form tanımı
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // Form gönderme
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setIsLoading(true)
      console.log("Giriş yapılıyor...", values.email)

      // Basitleştirilmiş giriş işlemi - localStorage'dan kullanıcıyı kontrol et
      const userStr = localStorage.getItem("bebekplan_user")
      const user = userStr ? JSON.parse(userStr) : null

      if (user && user.email === values.email) {
        // Gerçek uygulamada şifre kontrolü yapılmalı
        console.log("Giriş başarılı")

        // Oturum açık olarak işaretle
        localStorage.setItem("bebekplan_auth", "true")

        toast({
          title: "Giriş başarılı!",
          description: "BebekPlan'a hoş geldiniz.",
        })

        // Ana sayfaya yönlendirme
        setTimeout(() => {
          router.push("/")
        }, 1500)
      } else {
        console.log("Giriş başarısız")
        toast({
          title: "Giriş başarısız",
          description: "E-posta veya şifre hatalı.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Giriş hatası:", error)
      toast({
        title: "Giriş başarısız",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <div className="mb-8">
        <Logo size="large" />
      </div>

      <Card className="w-full max-w-md shadow-lg border-pink-100 dark:border-pink-900/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Giriş Yap</CardTitle>
          <CardDescription>BebekPlan hesabınıza giriş yapın</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta</FormLabel>
                    <FormControl>
                      <Input placeholder="ornek@mail.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Şifre</FormLabel>
                      <Link href="/sifremi-unuttum" className="text-sm text-pink-500 hover:underline">
                        Şifremi Unuttum
                      </Link>
                    </div>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş Yapılıyor...
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Hesabınız yok mu?{" "}
            <Link href="/kayit" className="text-pink-500 hover:underline">
              Hesap Oluştur
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
