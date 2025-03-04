'use client'
import { Card, CardContent } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-24" aria-label="Loading content">
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="text-center space-y-4">
          <div className="h-8 w-64 bg-accent animate-pulse rounded-lg mx-auto" />
          <div className="h-4 w-96 bg-accent animate-pulse rounded-lg mx-auto" />
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-4">
                <div className="h-48 bg-accent animate-pulse rounded-lg" />
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-accent animate-pulse rounded-lg" />
                  <div className="h-4 w-1/2 bg-accent animate-pulse rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}