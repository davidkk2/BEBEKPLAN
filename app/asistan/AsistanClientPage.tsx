"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { BABY_TIPS } from "@/lib/constants"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/lib/context/user-context"
import AdDisplay from "@/components/adsense-display"
import { Icons } from "@/components/ui-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Send } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function AsistanClientPage() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Merhaba! Ben BebekPlan'ın yapay zeka asistanıyım. Hamilelik, bebek bakımı ve gelişimi hakkında sorularınızı yanıtlamaktan memnuniyet duyarım. Size nasıl yardımcı olabilirim?",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Merhaba! Ben BebekPlan'ın yapay zeka asistanıyım. Hamilelik ve bebek bakımı ile ilgili sorularınızı yanıtlamaktan memnuniyet duyarım.",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { profile } = useUser()
  const inputRef = useRef<HTMLInputElement>(null)

  // Mesajlar güncellendiğinde otomatik olarak en alta kaydır
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages])

  // Sayfa yüklendiğinde rastgele önerilen sorular göster
  useEffect(() => {
    generateSuggestedQuestions()
  }, [])

  // Önerilen soruları oluştur
  const generateSuggestedQuestions = () => {
    // Profil bilgilerine göre özelleştirilmiş sorular
    const profileBasedQuestions: string[] = []

    if (profile) {
      if (profile.status === "pregnant" && profile.dueDate) {
        const dueDate = new Date(profile.dueDate)
        const today = new Date()
        const diffTime = dueDate.getTime() - today.getTime()
        const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))

        if (diffWeeks > 0 && diffWeeks <= 40) {
          profileBasedQuestions.push(`${diffWeeks}. hamilelik haftasında neler oluyor?`)
          profileBasedQuestions.push(`Hamileliğin ${diffWeeks}. haftasında hangi testler yapılmalı?`)
        }
      } else if (profile.status === "newborn" && profile.babyBirthDate) {
        const birthDate = new Date(profile.babyBirthDate)
        const today = new Date()
        const diffTime = today.getTime() - birthDate.getTime()
        const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30))

        if (diffMonths >= 0 && diffMonths <= 12) {
          profileBasedQuestions.push(`${diffMonths} aylık bebeğin gelişim özellikleri nelerdir?`)
          profileBasedQuestions.push(`${diffMonths} aylık bebek için beslenme önerileri nelerdir?`)
        }
      }
    }

    // Rastgele ipuçları
    const randomTips = BABY_TIPS.sort(() => 0.5 - Math.random()).slice(0, 3)

    // Tüm soruları birleştir ve karıştır
    const allQuestions = [...profileBasedQuestions, ...randomTips].sort(() => 0.5 - Math.random()).slice(0, 4)

    setSuggestedQuestions(allQuestions)
  }

  const handleSubmit = async (e: React.FormEvent, submittedQuestion?: string) => {
    e.preventDefault()
    const question = submittedQuestion || input

    if (!question.trim()) return

    // Kullanıcı mesajını ekle
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // OpenAI API'ye istek gönder
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("API yanıt vermedi")
      }

      const data = await response.json()

      // Asistan yanıtını ekle
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Yeni önerilen sorular oluştur
      generateSuggestedQuestions()
    } catch (error) {
      console.error("Asistan hatası:", error)
      toast({
        title: "Hata oluştu",
        description: "Yanıt alınamadı. Lütfen daha sonra tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      // Input alanına odaklan
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  // Önerilen soruyu seç
  const handleSuggestedQuestion = (question: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    handleSubmit(e as unknown as React.FormEvent, question)
  }

  // Mesaj içeriğini formatla (markdown benzeri)
  const formatMessageContent = (content: string) => {
    // Başlıkları formatla
    let formattedContent = content
      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold my-2">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-lg font-bold my-2">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-base font-bold my-2">$1</h3>')

    // Madde işaretlerini formatla
    formattedContent = formattedContent.replace(/^\* (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
    formattedContent = formattedContent.replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')

    // Paragrafları formatla
    formattedContent = formattedContent.replace(/\n\n/g, '</p><p class="my-2">')

    // Kalın metinleri formatla (** ** veya __ __)
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    formattedContent = formattedContent.replace(/__(.*?)__/g, "<strong>$1</strong>")

    // İtalik metinleri formatla (* * veya _ _)
    formattedContent = formattedContent.replace(/\*(.*?)\*/g, "<em>$1</em>")
    formattedContent = formattedContent.replace(/_(.*?)_/g, "<em>$1</em>")

    return `<p class="my-2">${formattedContent}</p>`
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Kullanıcı mesajını ekle
    const userMessage = { role: "user" as const, content: message }
    setChatHistory((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    try {
      // API'ye istek gönder
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error("API yanıt vermedi")
      }

      const data = await response.json()

      // Asistan yanıtını ekle
      setChatHistory((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Hata:", error)
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 dark:from-pink-950/40 dark:to-purple-950/40 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section with Fun Illustrations */}
        <div className="relative mb-8 text-center">
          <div className="absolute -top-10 -left-6 md:left-0 transform -rotate-12 opacity-70">
            <span className="text-5xl">👶</span>
          </div>
          <div className="absolute -top-8 -right-4 md:right-10 transform rotate-12 opacity-70">
            <span className="text-5xl">🍼</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 dark:text-pink-400 mb-4 pt-4">
            BebekPlan Asistanı
          </h1>

          <div className="max-w-2xl mx-auto relative">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 px-8">
              Hamilelik ve bebek bakımı hakkında tüm sorularınızı yanıtlayan yapay zeka asistanınız!
            </p>
            <div className="hidden md:block absolute -bottom-1 right-5 transform rotate-12 opacity-80">
              <span className="text-4xl">🤱</span>
            </div>
          </div>
        </div>

        {/* Üst reklam */}
        <div className="mb-8">
          <AdDisplay adSlot="7340816851" />
        </div>

        {/* Main Chat Area with Fun Design */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-pink-500" />
                BebekPlan Asistanı
              </CardTitle>
              <CardDescription>
                Hamilelik ve bebek bakımı hakkında sorularınızı yanıtlayan yapay zeka asistanı
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4 h-[400px] overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        chat.role === "user"
                          ? "bg-pink-500 text-white"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {chat.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Sorunuzu yazın..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !message.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Gönder
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Suggested Questions in Fun Cards */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-4 text-center text-pink-600 dark:text-pink-400 flex items-center justify-center">
            <Icons.MessageSquare className="mr-2 h-5 w-5" />
            Önerilen Sorular
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={handleSuggestedQuestion(question)}
                disabled={isLoading}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-pink-200 dark:border-pink-900 hover:scale-105 transition-all shadow-md hover:shadow-lg transform-gpu text-left h-full flex items-center"
              >
                <div className="pr-2 text-2xl">{["🤰", "👶", "🍼", "📝"][index % 4]}</div>
                <div>{question}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Information Boxes with Fun Illustrations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 p-6 rounded-2xl shadow-md border-2 border-yellow-200 dark:border-yellow-900 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">👶</div>
            <h3 className="text-xl font-bold mb-3 text-yellow-600 dark:text-yellow-400">Bebek Gelişimi</h3>
            <p className="relative z-10">
              Bebeğinizin aylarına göre gelişim aşamaları, dönüm noktaları ve önemli ipuçları hakkında sorular
              sorabilirsiniz.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-2xl shadow-md border-2 border-green-200 dark:border-green-900 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">🥗</div>
            <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">Beslenme Önerileri</h3>
            <p className="relative z-10">
              Hamilelik sürecinde ve bebeklik döneminde sağlıklı beslenme, vitamin ihtiyaçları ve diyet önerileri
              alabilirsiniz.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-2xl shadow-md border-2 border-blue-200 dark:border-blue-900 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">📅</div>
            <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">Hamilelik Takibi</h3>
            <p className="relative z-10">
              Hamileliğin her haftası için özel bilgiler, yapılması gereken kontroller ve hazırlıklar hakkında sorular
              sorabilirsiniz.
            </p>
          </div>
        </div>

        {/* Fun Tips Footer */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border-4 border-purple-200 dark:border-purple-900 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center text-purple-600 dark:text-purple-400">
            Asistanınızdan En İyi Şekilde Yararlanın
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">✨</div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">Spesifik Sorular Sorun</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  "8. ayda bebek ne yer?" gibi belirli sorular daha detaylı cevaplar almanızı sağlar.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-2xl">🔍</div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">Takip Soruları Sorun</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Aldığınız cevaplar hakkında daha fazla bilgi için ek sorular sorabilirsiniz.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-2xl">📝</div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">Listeler İsteyin</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  "Hamileler için önerilen yiyecekler listesi" gibi pratik listeler isteyin.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-2xl">🗓️</div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">Hafta/Ay Bazlı Bilgiler</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  "28. hafta hamilelik belirtileri" gibi dönem bazlı bilgiler alabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alt reklam */}
        <div className="mt-8">
          <AdDisplay adSlot="7340816851" />
        </div>
      </div>
    </div>
  )
}
