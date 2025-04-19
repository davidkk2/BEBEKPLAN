export type UserProfile = {
  firstName: string
  lastName: string
  email: string
  role: string
  status: string
  dueDate?: Date
  pregnancyWeek?: string
  babyBirthDate?: Date
  babyGender?: string
  babyCount?: string
  avatar?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    title: string
  }
  publishedAt: string
  readingTime: number
  category: string
  tags: string[]
  image: string
  featured?: boolean
  didYouKnow?: string[]
  factOrMyth?: Array<{
    statement: string
    isTrue: boolean
    explanation: string
  }>
  quiz?: {
    title: string
    questions: Array<{
      id: string
      question: string
      options: string[]
      correctAnswer: number
      explanation: string
    }>
  }
}
