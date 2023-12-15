import React from 'react'

export default function NotFound() {
  return (
    <div class="flex items-center justify-center bg-gray-100 grow">
        <div class="bg-white shadow-md rounded-lg p-6">
            <h1 class="text-4xl font-bold text-red-500 mb-4">404</h1>
            <p class="text-lg text-gray-700">Oops! Page not found.</p>
            <p class="text-sm text-gray-500">The page you are looking for might have been removed or doesn't exist.</p>
        </div>
    </div>

  )
}
