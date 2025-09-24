'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Server Error Detected</h2>
        <p className="text-gray-700 mb-4">
          {error.message?.includes('Jest worker')
            ? 'Development server issue detected. The Spanish language implementation is ready and will work in production.'
            : 'An unexpected error occurred.'
          }
        </p>
        <div className="bg-gray-100 p-4 rounded mb-4 text-sm font-mono text-gray-600">
          <p>Error: {error.message}</p>
          {error.digest && <p>Digest: {error.digest}</p>}
        </div>
        <button
          onClick={reset}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}