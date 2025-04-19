import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// OpenAI istemcisini oluştur
const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY ||
    "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",
})

// Sistem mesajı
const systemMessage = {
  role: "system",
  content: `Sen BebekPlan uygulamasının yapay zeka asistanısın. Görevin hamilelik, doğum, bebek bakımı ve gelişimi konularında kullanıcılara yardımcı olmak.

Yanıtlarını şu kurallara göre oluştur:
1. Sadece hamilelik, doğum, bebek bakımı ve gelişimi konularında sorulara yanıt ver.
2. Konu dışı sorulara "Üzgünüm, ben sadece hamilelik ve bebek bakımı konularında yardımcı olabiliyorum." şeklinde yanıt ver.
3. Tıbbi tavsiye gerektiren sorularda mutlaka bir doktora danışılması gerektiğini belirt.
4. Yanıtlarını Türkçe olarak ver.
5. Bilimsel ve güncel bilgilere dayalı yanıtlar ver.
6. Yanıtlarını düzenli ve okunaklı formatla. Başlıklar için # veya ## kullanabilirsin.
7. Önemli noktaları vurgulamak için ** ** işaretlerini kullanabilirsin.
8. Madde işaretleri için - veya * kullanabilirsin.
9. Yanıtların kısa ve öz olsun, gereksiz detaylara girme.
10. Asla * işaretini tek başına kullanma, her zaman çift kullan (**metin**).
11. Asla tıbbi teşhis koyma veya ilaç önerme.
12. Kullanıcıya her zaman nazik ve destekleyici bir tonda yanıt ver.
13. Yanıtlarında kültürel hassasiyetlere dikkat et.
14. Yanıtların maksimum 300 kelime ile sınırlı olsun.`,
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Kullanıcı mesajlarını kontrol et
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Geçersiz istek formatı" }, { status: 400 })
    }

    // OpenAI API'ye istek gönder
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    // Yanıtı döndür
    return NextResponse.json({
      content: response.choices[0].message.content,
    })
  } catch (error) {
    console.error("OpenAI API hatası:", error)
    return NextResponse.json({ error: "Asistan yanıt verirken bir hata oluştu" }, { status: 500 })
  }
}
