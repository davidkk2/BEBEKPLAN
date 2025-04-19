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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Calendar } from "lucide-react"
import Logo from "@/components/logo"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn, calculatePregnancyWeek } from "@/lib/utils"
import { useAuth } from "@/lib/context/auth-context"

// Adım 1 şeması - Temel Bilgiler
const step1Schema = z
  .object({
    firstName: z.string().min(2, { message: "Ad en az 2 karakter olmalıdır" }),
    lastName: z.string().min(2, { message: "Soyad en az 2 karakter olmalıdır" }),
    email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
    password: z
      .string()
      .min(8, { message: "Şifre en az 8 karakter olmalıdır" })
      .regex(/[A-Z]/, { message: "Şifre en az bir büyük harf içermelidir" })
      .regex(/[a-z]/, { message: "Şifre en az bir küçük harf içermelidir" })
      .regex(/[0-9]/, { message: "Şifre en az bir rakam içermelidir" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  })

// Adım 2 şeması - Kullanıcı Tipi
const step2Schema = z.object({
  userRole: z.enum(["mother", "father", "relative", "professional", "other"], {
    required_error: "Lütfen bir kullanıcı rolü seçin",
  }),
  userStatus: z.enum(["pregnant", "planning", "newborn", "toddler", "multiple", "other"], {
    required_error: "Lütfen durumunuzu seçin",
  }),
})

// Adım 3 şeması - Detaylı Bilgiler
const step3Schema = z.object({
  dueDate: z.date().optional(),
  babyBirthDate: z.date().optional(),
  babyCount: z.string().optional(),
  babyGender: z.enum(["unknown", "boy", "girl", "twins_mixed", "twins_boys", "twins_girls"]).optional(),
  notificationPreference: z.boolean().default(true),
})

// Adım 4 şeması - Kullanım Koşulları
const step4Schema = z.object({
  termsAndConditions: z.boolean().refine((val) => val === true, {
    message: "Kullanım koşullarını kabul etmelisiniz",
  }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "Gizlilik politikasını kabul etmelisiniz",
  }),
  marketingEmails: z.boolean().default(false),
})

export default function KayitForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const { register } = useAuth()

  // Adım 1 formu
  const step1Form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // Adım 2 formu
  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      userRole: "mother",
      userStatus: "pregnant",
    },
  })

  // Adım 3 formu
  const step3Form = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      notificationPreference: true,
    },
  })

  // Adım 4 formu
  const step4Form = useForm<z.infer<typeof step4Schema>>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      termsAndConditions: false,
      privacyPolicy: false,
      marketingEmails: false,
    },
  })

  // Adım 1 gönderme
  function onSubmitStep1(values: z.infer<typeof step1Schema>) {
    setFormData({ ...formData, ...values })
    setStep(2)
  }

  // Adım 2 gönderme
  function onSubmitStep2(values: z.infer<typeof step2Schema>) {
    setFormData({ ...formData, ...values })
    setStep(3)
  }

  // Adım 3 gönderme
  function onSubmitStep3(values: z.infer<typeof step3Schema>) {
    // Hamilelik haftasını otomatik hesapla
    const updatedValues = { ...values }
    if (values.dueDate) {
      // Tahmini doğum tarihinden son adet tarihini hesapla (geriye 280 gün)
      const lastPeriodDate = new Date(values.dueDate)
      lastPeriodDate.setDate(lastPeriodDate.getDate() - 280)

      // Hamilelik haftasını hesapla
      const pregnancyWeek = calculatePregnancyWeek(lastPeriodDate)
      updatedValues.pregnancyWeek = pregnancyWeek.toString()
    }

    setFormData({ ...formData, ...updatedValues })
    setStep(4)
  }

  // Adım 4 gönderme (final)
  async function onSubmitStep4(values: z.infer<typeof step4Schema>) {
    try {
      console.log("Form gönderiliyor...", values)
      setIsLoading(true)
      const finalFormData = { ...formData, ...values }

      // Kullanıcı verilerini hazırla
      const userData = {
        firstName: finalFormData.firstName,
        lastName: finalFormData.lastName,
        email: finalFormData.email,
        password: finalFormData.password,
        role: finalFormData.userRole,
        status: finalFormData.userStatus,
        profile: {
          dueDate: finalFormData.dueDate,
          pregnancyWeek: finalFormData.pregnancyWeek,
          babyBirthDate: finalFormData.babyBirthDate,
          babyGender: finalFormData.babyGender,
          babyCount: finalFormData.babyCount,
          notificationPreference: finalFormData.notificationPreference,
          marketingEmails: finalFormData.marketingEmails,
        },
      }

      console.log("Kullanıcı verileri:", userData)

      // Basitleştirilmiş kayıt işlemi - localStorage'a kaydet
      localStorage.setItem(
        "bebekplan_user",
        JSON.stringify({
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }),
      )

      // Oturum açık olarak işaretle
      localStorage.setItem("bebekplan_auth", "true")

      toast({
        title: "Kayıt başarılı!",
        description: "BebekPlan'a hoş geldiniz. Profiliniz oluşturuldu.",
      })

      // Ana sayfaya yönlendirme
      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (error) {
      console.error("Kayıt hatası:", error)
      toast({
        title: "Kayıt başarısız",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Önceki adıma dönme
  function goToPreviousStep() {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // İlerleme çubuğu yüzdesi
  const progressPercentage = (step / 4) * 100

  // Kullanıcı durumuna göre ek alanları gösterme
  const userStatus = step2Form.watch("userStatus")

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12">
      <div className="mb-8">
        <Logo size="large" />
      </div>

      <Card className="w-full max-w-lg shadow-lg border-pink-100 dark:border-pink-900/20">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Hesap Oluştur</CardTitle>
            <span className="text-sm text-muted-foreground">Adım {step}/4</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <CardDescription>
            {step === 1 && "Temel bilgilerinizi girerek başlayalım"}
            {step === 2 && "Sizin ve ailenizin durumunu öğrenelim"}
            {step === 3 && "Bebeğiniz hakkında biraz daha bilgi alabilir miyiz?"}
            {step === 4 && "Son adım! Kullanım koşullarını kabul edin"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <Form {...step1Form}>
              <form onSubmit={step1Form.handleSubmit(onSubmitStep1)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={step1Form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad</FormLabel>
                        <FormControl>
                          <Input placeholder="Adınız" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={step1Form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soyad</FormLabel>
                        <FormControl>
                          <Input placeholder="Soyadınız" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={step1Form.control}
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
                  control={step1Form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifre</FormLabel>
                      <FormControl>
                        <Input placeholder="********" type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        En az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step1Form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifre Tekrarı</FormLabel>
                      <FormControl>
                        <Input placeholder="********" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                    Devam Et
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...step2Form}>
              <form onSubmit={step2Form.handleSubmit(onSubmitStep2)} className="space-y-6">
                <FormField
                  control={step2Form.control}
                  name="userRole"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Siz kimsiniz?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="mother" />
                            </FormControl>
                            <FormLabel className="font-normal">Anneyim</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="father" />
                            </FormControl>
                            <FormLabel className="font-normal">Babayım</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="relative" />
                            </FormControl>
                            <FormLabel className="font-normal">Aile üyesiyim (Anneanne, Dede, vb.)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="professional" />
                            </FormControl>
                            <FormLabel className="font-normal">Sağlık profesyoneliyim</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">Diğer</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step2Form.control}
                  name="userStatus"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Şu anki durumunuz nedir?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="pregnant" />
                            </FormControl>
                            <FormLabel className="font-normal">Hamileyim</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="planning" />
                            </FormControl>
                            <FormLabel className="font-normal">Bebek planlıyoruz</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="newborn" />
                            </FormControl>
                            <FormLabel className="font-normal">Yeni doğan bebeğimiz var (0-12 ay)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="toddler" />
                            </FormControl>
                            <FormLabel className="font-normal">Bebeğimiz var (1-3 yaş)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="multiple" />
                            </FormControl>
                            <FormLabel className="font-normal">Birden fazla çocuğumuz var</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="other" />
                            </FormControl>
                            <FormLabel className="font-normal">Diğer</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPreviousStep}>
                    Geri
                  </Button>
                  <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                    Devam Et
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 3 && (
            <Form {...step3Form}>
              <form onSubmit={step3Form.handleSubmit(onSubmitStep3)} className="space-y-4">
                {/* Hamile ise */}
                {userStatus === "pregnant" && (
                  <>
                    <FormField
                      control={step3Form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Tahmini Doğum Tarihi</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP", { locale: tr }) : <span>Tarih seçin</span>}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                locale={tr}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>Doktorunuzun belirttiği tahmini doğum tarihini seçin</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step3Form.control}
                      name="babyGender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bebeğinizin Cinsiyeti</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Bebeğinizin cinsiyetini seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="unknown">Henüz bilinmiyor</SelectItem>
                              <SelectItem value="boy">Erkek</SelectItem>
                              <SelectItem value="girl">Kız</SelectItem>
                              <SelectItem value="twins_mixed">İkiz (Kız ve Erkek)</SelectItem>
                              <SelectItem value="twins_boys">İkiz (İki Erkek)</SelectItem>
                              <SelectItem value="twins_girls">İkiz (İki Kız)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Bebek planlıyorsa */}
                {userStatus === "planning" && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Bebek Planlama</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      BebekPlan, bebek planlama sürecinizde size yardımcı olacak bilgiler ve araçlar sunacak. Ovülasyon
                      takibi, beslenme önerileri ve daha fazlası için profilinizi tamamlayın.
                    </p>
                  </div>
                )}

                {/* Yeni doğan bebeği varsa */}
                {userStatus === "newborn" && (
                  <>
                    <FormField
                      control={step3Form.control}
                      name="babyBirthDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Bebeğinizin Doğum Tarihi</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP", { locale: tr }) : <span>Tarih seçin</span>}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date()}
                                initialFocus
                                locale={tr}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step3Form.control}
                      name="babyGender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bebeğinizin Cinsiyeti</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Bebeğinizin cinsiyetini seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="boy">Erkek</SelectItem>
                              <SelectItem value="girl">Kız</SelectItem>
                              <SelectItem value="twins_mixed">İkiz (Kız ve Erkek)</SelectItem>
                              <SelectItem value="twins_boys">İkiz (İki Erkek)</SelectItem>
                              <SelectItem value="twins_girls">İkiz (İki Kız)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Küçük çocuğu varsa */}
                {userStatus === "toddler" && (
                  <>
                    <FormField
                      control={step3Form.control}
                      name="babyBirthDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Çocuğunuzun Doğum Tarihi</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? format(field.value, "PPP", { locale: tr }) : <span>Tarih seçin</span>}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date()}
                                initialFocus
                                locale={tr}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={step3Form.control}
                      name="babyGender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Çocuğunuzun Cinsiyeti</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Çocuğunuzun cinsiyetini seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="boy">Erkek</SelectItem>
                              <SelectItem value="girl">Kız</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Birden fazla çocuğu varsa */}
                {userStatus === "multiple" && (
                  <>
                    <FormField
                      control={step3Form.control}
                      name="babyCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kaç Çocuğunuz Var?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Çocuk sayısını seçin" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                              <SelectItem value="4">4</SelectItem>
                              <SelectItem value="5+">5 veya daha fazla</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Daha sonra her çocuğunuz için ayrı profil oluşturabilirsiniz
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Tüm kullanıcılar için bildirim tercihi */}
                <FormField
                  control={step3Form.control}
                  name="notificationPreference"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Gelişim hatırlatıcıları ve önemli bilgilendirmeler almak istiyorum</FormLabel>
                        <FormDescription>
                          Bebeğinizin gelişim aşamaları, aşı takvimleri ve önemli ipuçları hakkında bildirimler alın
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPreviousStep}>
                    Geri
                  </Button>
                  <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                    Devam Et
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 4 && (
            <Form {...step4Form}>
              <form onSubmit={step4Form.handleSubmit(onSubmitStep4)} className="space-y-6">
                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-pink-700 dark:text-pink-300 mb-2">Neredeyse Tamamlandı!</h3>
                  <p className="text-sm text-pink-600 dark:text-pink-400">
                    BebekPlan ailesine katılmak için son bir adım kaldı. Kullanım koşullarımızı ve gizlilik politikamızı
                    kabul ederek kaydınızı tamamlayabilirsiniz.
                  </p>
                </div>

                <FormField
                  control={step4Form.control}
                  name="termsAndConditions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="terms" />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="terms">
                          <span>
                            <Link href="/kullanim-kosullari" className="text-pink-500 hover:underline">
                              Kullanım koşullarını
                            </Link>{" "}
                            okudum ve kabul ediyorum
                          </span>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={step4Form.control}
                  name="privacyPolicy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="privacy" />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="privacy">
                          <span>
                            <Link href="/gizlilik-politikasi" className="text-pink-500 hover:underline">
                              Gizlilik politikasını
                            </Link>{" "}
                            okudum ve kabul ediyorum
                          </span>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={step4Form.control}
                  name="marketingEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          BebekPlan'dan özel teklifler, yenilikler ve kampanyalar hakkında e-posta almak istiyorum
                        </FormLabel>
                        <FormDescription>İstediğiniz zaman abonelikten çıkabilirsiniz</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPreviousStep}>
                    Geri
                  </Button>
                  <Button
                    type="submit"
                    className="bg-pink-500 hover:bg-pink-600"
                    disabled={isLoading || !step4Form.formState.isValid}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Kaydediliyor...
                      </>
                    ) : (
                      "Kaydı Tamamla"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Zaten hesabınız var mı?{" "}
            <Link href="/giris" className="text-pink-500 hover:underline">
              Giriş Yap
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
