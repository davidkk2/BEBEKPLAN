"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { cn, calculatePregnancyWeek } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { User, Settings, Bell, Shield, CalendarIcon, Baby, Edit, Save, Upload, Download } from "lucide-react"
import { useUser } from "@/lib/context/user-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { UserProfile } from "@/lib/types"
import AdDisplay from "@/components/ad-display"

export default function ProfileClientPage() {
  // Profil sayfasındaki kontrolleri güncelle
  const { profile, updateProfile, hasProfile } = useUser()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(!hasProfile) // Profil yoksa düzenleme modunda başla

  // Profil bilgilerinin gerçekten dolu olup olmadığını kontrol et
  const isProfileComplete = hasProfile && profile?.firstName && profile?.lastName
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    email: profile?.email || "",
    role: profile?.role || "mother",
    status: profile?.status || "pregnant",
    dueDate: profile?.dueDate,
    babyBirthDate: profile?.babyBirthDate,
    babyGender: profile?.babyGender || "",
    babyCount: profile?.babyCount || "",
    notificationPreferences: {
      emailNotifications: true,
      appNotifications: true,
      weeklyUpdates: true,
      developmentReminders: true,
      specialOffers: false,
    },
  })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(profile?.dueDate)
  const [selectedBabyBirthDate, setSelectedBabyBirthDate] = useState<Date | undefined>(profile?.babyBirthDate)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  // Form değişikliklerini işle
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Select değişikliklerini işle
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Bildirim tercihlerini işle
  const handleNotificationChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [name]: checked,
      },
    }))
  }

  // Profil düzenlemeyi başlat
  const startEditing = () => {
    setIsEditing(true)
  }

  // Profil düzenlemeyi kaydet
  const saveProfile = () => {
    setIsEditing(false)

    // Tarih değerlerini kontrol et
    const profileData: Partial<UserProfile> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      babyGender: formData.babyGender,
      babyCount: formData.babyCount,
    }

    // Sadece geçerli tarih değerlerini ekle
    if (selectedDate) {
      profileData.dueDate = selectedDate
    }

    if (selectedBabyBirthDate) {
      profileData.babyBirthDate = selectedBabyBirthDate
    }

    // UserContext'e profil bilgilerini kaydet
    updateProfile(profileData)

    // Konsola kayıt bilgilerini yazdır (hata ayıklama için)
    console.log("Profil kaydedildi:", profileData)
    console.log("localStorage kontrol:", localStorage.getItem("bebekplan_profile"))

    toast({
      title: "Profil güncellendi",
      description: "Profil bilgileriniz başarıyla kaydedildi.",
    })
  }

  // Profil düzenlemeyi iptal et
  const cancelEditing = () => {
    if (!isProfileComplete) {
      // Eğer profil yoksa, iptal etmeye izin verme
      toast({
        title: "Profil bilgilerinizi doldurmalısınız",
        description: "Uygulamayı kullanabilmek için temel bilgilerinizi girmelisiniz.",
        variant: "destructive",
      })
      return
    }

    setIsEditing(false)
    // Mevcut profil bilgilerini geri yükle
    setFormData({
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      email: profile?.email || "",
      role: profile?.role || "mother",
      status: profile?.status || "pregnant",
      babyGender: profile?.babyGender || "",
      babyCount: profile?.babyCount || "",
      notificationPreferences: {
        emailNotifications: true,
        appNotifications: true,
        weeklyUpdates: true,
        developmentReminders: true,
        specialOffers: false,
      },
    })
    setSelectedDate(profile?.dueDate)
    setSelectedBabyBirthDate(profile?.babyBirthDate)

    toast({
      title: "Düzenleme iptal edildi",
      description: "Yaptığınız değişiklikler kaydedilmedi.",
      variant: "destructive",
    })
  }

  // Profil resmi yükleme
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Profil değiştiğinde form verilerini güncelle
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        role: profile.role || "mother",
        status: profile.status || "pregnant",
        babyGender: profile.babyGender || "",
        babyCount: profile.babyCount || "",
        notificationPreferences: {
          emailNotifications: true,
          appNotifications: true,
          weeklyUpdates: true,
          developmentReminders: true,
          specialOffers: false,
        },
      })

      setSelectedDate(profile.dueDate)
      setSelectedBabyBirthDate(profile.babyBirthDate)

      console.log("Profil yüklendi:", profile)
    }
  }, [profile])

  // Tahmini doğum tarihinden hamilelik haftasını hesapla
  useEffect(() => {
    if (selectedDate && formData.status === "pregnant") {
      // Doğum tarihinden geriye doğru 40 hafta (280 gün) hesapla
      const lastPeriodDate = new Date(selectedDate)
      lastPeriodDate.setDate(lastPeriodDate.getDate() - 280)

      // Hamilelik haftasını hesapla
      const pregnancyWeek = calculatePregnancyWeek(lastPeriodDate)

      console.log("Hesaplanan hamilelik haftası:", pregnancyWeek)
    }
  }, [selectedDate, formData.status])

  return (
    <div className="container max-w-5xl mx-auto py-8 sm:py-12 px-4">
      {" "}
      {/* Mobil için daha az padding */}
      {!isProfileComplete && (
        <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <User className="h-4 w-4 text-blue-500" />
          <AlertTitle>Profilinizi Tamamlayın</AlertTitle>
          <AlertDescription>
            BebekPlan'ı kişiselleştirmek ve tüm özelliklerinden yararlanmak için lütfen profil bilgilerinizi doldurun.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sol Sidebar - Mobilde tam genişlik */}
        <div className="w-full md:w-1/4">
          <Card className="mb-6">
            <CardContent className="p-4 sm:p-6 flex flex-col items-center">
              {" "}
              {/* Mobil için daha az padding */}
              <div className="relative mb-4">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-pink-100 dark:border-pink-900">
                  {" "}
                  {/* Mobil için daha küçük avatar */}
                  {profileImage ? (
                    <AvatarImage src={profileImage} alt={`${formData.firstName} ${formData.lastName}`} />
                  ) : (
                    <AvatarFallback className="text-xl sm:text-2xl bg-pink-100 text-pink-500">
                      {" "}
                      {/* Mobil için daha küçük font */}
                      {isProfileComplete ? `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}` : "BP"}
                    </AvatarFallback>
                  )}
                </Avatar>
                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <label htmlFor="profile-image" className="cursor-pointer">
                      <div className="bg-pink-500 text-white p-1.5 rounded-full hover:bg-pink-600 transition-colors">
                        <Upload className="h-4 w-4" />
                      </div>
                      <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileImageUpload}
                      />
                    </label>
                  </div>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-center">
                {" "}
                {/* Mobil için daha küçük font ve ortalama */}
                {isProfileComplete ? `${formData.firstName} ${formData.lastName}` : "Profil Bilgilerinizi Doldurun"}
              </h2>
              {hasProfile && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 text-center">{formData.email}</p>
              )}{" "}
              {/* Mobil için ortalama */}
              {hasProfile && (
                <div className="w-full mt-4">
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Kullanıcı Rolü:</span>
                      <span className="font-medium">
                        {formData.role === "mother"
                          ? "Anne"
                          : formData.role === "father"
                            ? "Baba"
                            : formData.role === "relative"
                              ? "Aile Üyesi"
                              : formData.role === "professional"
                                ? "Sağlık Profesyoneli"
                                : "Diğer"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Durum:</span>
                      <span className="font-medium">
                        {formData.status === "pregnant"
                          ? "Hamile"
                          : formData.status === "planning"
                            ? "Bebek Planlıyor"
                            : formData.status === "newborn"
                              ? "Yeni Doğan Bebek"
                              : formData.status === "toddler"
                                ? "1-3 Yaş Bebek"
                                : formData.status === "multiple"
                                  ? "Birden Fazla Çocuk"
                                  : "Diğer"}
                      </span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Hızlı Erişim</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dogum-sayaci">
                  <CalendarIcon className="mr-2 h-4 w-4 text-pink-500" />
                  Doğum Sayacı
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/gelisim-takibi">
                  <Baby className="mr-2 h-4 w-4 text-pink-500" />
                  Gelişim Takibi
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/beslenme">
                  <User className="mr-2 h-4 w-4 text-pink-500" />
                  Beslenme
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/blog">
                  <User className="mr-2 h-4 w-4 text-pink-500" />
                  Blog
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Ana İçerik - Mobilde tam genişlik */}
        <div className="w-full md:w-3/4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6 sm:mb-8">
              {" "}
              {/* Mobil için daha az margin */}
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="mr-2 h-4 w-4" />
                Bildirimler
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="mr-2 h-4 w-4" />
                Güvenlik
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Ayarlar
              </TabsTrigger>
            </TabsList>

            {/* Profil Sekmesi */}
            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {" "}
                  {/* Mobil için flex-col ve gap */}
                  <div>
                    <CardTitle>Profil Bilgileri</CardTitle>
                    <CardDescription>Kişisel bilgilerinizi görüntüleyin ve düzenleyin</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button onClick={startEditing}>
                      <Edit className="mr-2 h-4 w-4" />
                      Düzenle
                    </Button>
                  ) : (
                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                      {" "}
                      {/* Mobil için tam genişlik ve sağa hizalama */}
                      <Button variant="outline" onClick={cancelEditing}>
                        İptal
                      </Button>
                      <Button onClick={saveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Kaydet
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {" "}
                  {/* Mobil için daha az boşluk */}
                  {/* Form alanları için mobil iyileştirmeler */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {" "}
                    {/* Mobil için daha az gap */}
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ad</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Soyad</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="role">Kullanıcı Rolü</Label>
                      <Select
                        disabled={!isEditing}
                        value={formData.role}
                        onValueChange={(value) => handleSelectChange("role", value)}
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Rol seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mother">Anne</SelectItem>
                          <SelectItem value="father">Baba</SelectItem>
                          <SelectItem value="relative">Aile Üyesi</SelectItem>
                          <SelectItem value="professional">Sağlık Profesyoneli</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Durum</Label>
                      <Select
                        disabled={!isEditing}
                        value={formData.status}
                        onValueChange={(value) => handleSelectChange("status", value)}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Durum seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pregnant">Hamile</SelectItem>
                          <SelectItem value="planning">Bebek Planlıyoruz</SelectItem>
                          <SelectItem value="newborn">Yeni Doğan Bebek (0-12 ay)</SelectItem>
                          <SelectItem value="toddler">1-3 Yaş Bebek</SelectItem>
                          <SelectItem value="multiple">Birden Fazla Çocuk</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {formData.status === "pregnant" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="dueDate">Tahmini Doğum Tarihi</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground",
                              )}
                              disabled={!isEditing}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP", { locale: tr }) : <span>Tarih seçin</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                              locale={tr}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Hamilelik Haftası</Label>
                        <div className="p-2 border rounded-md bg-muted/20">
                          {selectedDate ? (
                            <>
                              {(() => {
                                // Doğum tarihinden geriye doğru 40 hafta (280 gün) hesapla
                                const lastPeriodDate = new Date(selectedDate)
                                lastPeriodDate.setDate(lastPeriodDate.getDate() - 280)

                                // Hamilelik haftasını hesapla
                                const pregnancyWeek = calculatePregnancyWeek(lastPeriodDate)
                                return `${pregnancyWeek}. Hafta`
                              })()}
                            </>
                          ) : (
                            <span className="text-muted-foreground">
                              Doğum tarihi seçildiğinde otomatik hesaplanacak
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {(formData.status === "newborn" || formData.status === "toddler") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="babyBirthDate">Bebeğin Doğum Tarihi</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedBabyBirthDate && "text-muted-foreground",
                              )}
                              disabled={!isEditing}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedBabyBirthDate ? (
                                format(selectedBabyBirthDate, "PPP", { locale: tr })
                              ) : (
                                <span>Tarih seçin</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedBabyBirthDate}
                              onSelect={setSelectedBabyBirthDate}
                              initialFocus
                              locale={tr}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  )}
                  {(formData.status === "pregnant" ||
                    formData.status === "newborn" ||
                    formData.status === "toddler") && (
                    <div className="space-y-2">
                      <Label htmlFor="babyGender">Bebeğin Cinsiyeti</Label>
                      <Select
                        disabled={!isEditing}
                        value={formData.babyGender}
                        onValueChange={(value) => handleSelectChange("babyGender", value)}
                      >
                        <SelectTrigger id="babyGender">
                          <SelectValue placeholder="Cinsiyet seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unknown">Henüz bilinmiyor</SelectItem>
                          <SelectItem value="boy">Erkek</SelectItem>
                          <SelectItem value="girl">Kız</SelectItem>
                          <SelectItem value="twins_mixed">İkiz (Kız ve Erkek)</SelectItem>
                          <SelectItem value="twins_boys">İkiz (İki Erkek)</SelectItem>
                          <SelectItem value="twins_girls">İkiz (İki Kız)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {formData.status === "multiple" && (
                    <div className="space-y-2">
                      <Label htmlFor="babyCount">Kaç Çocuğunuz Var?</Label>
                      <Select
                        disabled={!isEditing}
                        value={formData.babyCount}
                        onValueChange={(value) => handleSelectChange("babyCount", value)}
                      >
                        <SelectTrigger id="babyCount">
                          <SelectValue placeholder="Çocuk sayısını seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5+">5 veya daha fazla</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bildirimler Sekmesi */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Bildirim Tercihleri</CardTitle>
                  <CardDescription>Hangi bildirimler almak istediğinizi seçin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailNotifications">E-posta Bildirimleri</Label>
                        <p className="text-sm text-muted-foreground">
                          Önemli güncellemeler ve bilgilendirmeler için e-posta alın
                        </p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={formData.notificationPreferences.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="appNotifications">Uygulama Bildirimleri</Label>
                        <p className="text-sm text-muted-foreground">Uygulama içi bildirimler ve uyarılar alın</p>
                      </div>
                      <Switch
                        id="appNotifications"
                        checked={formData.notificationPreferences.appNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("appNotifications", checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="weeklyUpdates">Haftalık Güncellemeler</Label>
                        <p className="text-sm text-muted-foreground">
                          Hamilelik veya bebek gelişimi hakkında haftalık bilgilendirmeler alın
                        </p>
                      </div>
                      <Switch
                        id="weeklyUpdates"
                        checked={formData.notificationPreferences.weeklyUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("weeklyUpdates", checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="developmentReminders">Gelişim Hatırlatıcıları</Label>
                        <p className="text-sm text-muted-foreground">
                          Önemli gelişim aşamaları ve kontroller için hatırlatıcılar alın
                        </p>
                      </div>
                      <Switch
                        id="developmentReminders"
                        checked={formData.notificationPreferences.developmentReminders}
                        onCheckedChange={(checked) => handleNotificationChange("developmentReminders", checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="specialOffers">Özel Teklifler</Label>
                        <p className="text-sm text-muted-foreground">
                          Özel teklifler, kampanyalar ve yenilikler hakkında bildirimler alın
                        </p>
                      </div>
                      <Switch
                        id="specialOffers"
                        checked={formData.notificationPreferences.specialOffers}
                        onCheckedChange={(checked) => handleNotificationChange("specialOffers", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Bildirim tercihleri güncellendi",
                        description: "Bildirim tercihleriniz başarıyla kaydedildi.",
                      })
                    }}
                  >
                    Değişiklikleri Kaydet
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Güvenlik Sekmesi */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Güvenlik Ayarları</CardTitle>
                  <CardDescription>Hesap güvenliğinizi yönetin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Veri Gizliliği</h3>
                    <p className="text-sm text-muted-foreground">
                      BebekPlan, verilerinizi yerel olarak tarayıcınızda saklar ve hiçbir sunucuya göndermez. Tüm
                      bilgileriniz cihazınızda güvenle saklanır.
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Verilerinizi Yönetin</h3>
                    <p className="text-sm text-muted-foreground">
                      Verilerinizi istediğiniz zaman indirebilir veya silebilirsiniz.
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Download className="mr-2 h-4 w-4" />
                        Verilerimi İndir
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left text-red-500"
                        onClick={() => {
                          const confirmed = window.confirm(
                            "Tüm verilerinizi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.",
                          )
                          if (confirmed) {
                            localStorage.removeItem("bebekplan_profile")
                            window.location.reload()
                          }
                        }}
                      >
                        Tüm Verilerimi Sil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ayarlar Sekmesi */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Uygulama Ayarları</CardTitle>
                  <CardDescription>Uygulama tercihlerinizi yönetin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Dil Tercihi</h3>
                    <Select defaultValue="tr">
                      <SelectTrigger>
                        <SelectValue placeholder="Dil seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tr">Türkçe</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tema</h3>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="theme-auto">
                        <input type="radio" id="theme-auto" name="theme" value="auto" className="mr-2" defaultChecked />
                        Sistem Teması
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="theme-light">
                        <input type="radio" id="theme-light" name="theme" value="light" className="mr-2" />
                        Aydınlık Tema
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="theme-dark">
                        <input type="radio" id="theme-dark" name="theme" value="dark" className="mr-2" />
                        Karanlık Tema
                      </Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Ayarlar güncellendi",
                        description: "Uygulama ayarlarınız başarıyla kaydedildi.",
                      })
                    }}
                  >
                    Değişiklikleri Kaydet
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Alt reklam */}
      <div className="mt-8">
        <AdDisplay adSlot="7340816851" />
      </div>
    </div>
  )
}
