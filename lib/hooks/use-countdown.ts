"use client"

import { useState, useEffect, useCallback } from "react"

interface CountdownState {
  days: number
  hours: number
  minutes: number
  seconds: number
  isActive: boolean
  isComplete: boolean
}

interface CountdownOptions {
  onComplete?: () => void
}

export function useCountdown(
  targetDate: Date | null | undefined,
  options?: CountdownOptions,
): [
  CountdownState,
  {
    start: () => void
    stop: () => void
    reset: () => void
  },
] {
  const [state, setState] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isActive: false,
    isComplete: false,
  })

  const calculateTimeLeft = useCallback(() => {
    if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }

    const now = new Date()
    const difference = targetDate.getTime() - now.getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isComplete: false,
    }
  }, [targetDate])

  const start = useCallback(() => {
    if (!targetDate) return
    setState((prev) => ({ ...prev, isActive: true }))
  }, [targetDate])

  const stop = useCallback(() => {
    setState((prev) => ({ ...prev, isActive: false }))
  }, [])

  const reset = useCallback(() => {
    const timeLeft = calculateTimeLeft()
    setState({
      ...timeLeft,
      isActive: false,
      isComplete: timeLeft.isComplete,
    })
  }, [calculateTimeLeft])

  useEffect(() => {
    if (!targetDate) {
      setState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isActive: false,
        isComplete: true,
      })
      return
    }

    reset()
  }, [targetDate, reset])

  useEffect(() => {
    if (!state.isActive || !targetDate) return

    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft()
      setState((prev) => ({
        ...timeLeft,
        isActive: prev.isActive,
        isComplete: timeLeft.isComplete,
      }))

      if (timeLeft.isComplete) {
        clearInterval(interval)
        options?.onComplete?.()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [state.isActive, targetDate, calculateTimeLeft, options])

  return [state, { start, stop, reset }]
}
