'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)

  }, [error])

  return (
    <div className="container mx-auto px-4 py-24 text-center" role="alert" aria-label="Error page">
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8">
        Error: {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <Button onClick={reset} aria-label="Try again">Try again</Button>
    </div>
  )
}