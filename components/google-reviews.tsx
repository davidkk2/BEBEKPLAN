import { Star } from "lucide-react"

interface GoogleReview {
  name: string
  rating: number
  text: string
  date: string
}

const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    name: "Ayşe K.",
    rating: 5,
    text: "BebekPlan sayesinde bebeğim için tüm ihtiyaçları organize edebildim. Harika bir uygulama!",
    date: "2 hafta önce",
  },
  {
    name: "Zeynep M.",
    rating: 5,
    text: "Alışveriş listesi özelliği çok kullanışlı. Artık hiçbir şeyi unutmuyorum.",
    date: "1 ay önce",
  },
  {
    name: "Elif B.",
    rating: 4,
    text: "Doğum sayacı ve gelişim takibi özellikleri çok faydalı. Sadece arayüz biraz daha sade olabilirdi.",
    date: "3 hafta önce",
  },
  {
    name: "Merve T.",
    rating: 5,
    text: "Hamilelik sürecimde en büyük yardımcım oldu. Kesinlikle tavsiye ediyorum!",
    date: "1 hafta önce",
  },
]

export default function GoogleReviews() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 mr-2">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z"
              fill="#4285F4"
            />
            <path
              d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
              fill="#EA4335"
            />
          </svg>
        </div>
        <span className="font-semibold text-lg">Google Yorumları</span>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex mr-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">4.8 / 5 · 128 yorum</span>
      </div>

      <div className="space-y-4">
        {GOOGLE_REVIEWS.map((review, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{review.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
            </div>
            <div className="flex mb-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                  />
                ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <a
          href="https://g.page/r/BebekPlan/review"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Google'da yorum yazın
        </a>
      </div>
    </div>
  )
}
