import type React from "react"
import Schema from "./schema"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Schema />
      {children}
    </>
  )
}
