import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TESTIMONIALS } from "@/lib/constants"

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {TESTIMONIALS.map((testimonial, index) => (
        <Card key={index} className="bg-white dark:bg-gray-800 border-none shadow-md h-full flex flex-col">
          <CardContent className="pt-6 flex-grow">
            <div className="flex items-center gap-2 mb-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#FFC107"
                    stroke="#FFC107"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300">{testimonial.content}</p>
          </CardContent>
          <CardFooter className="pt-4 pb-6 border-t">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className="bg-pink-100 text-pink-500">{testimonial.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
