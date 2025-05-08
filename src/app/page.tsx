'use client'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">📌 Link Saver + Auto‑Summary</h1>
        <p className="mb-6 text-gray-700">
          Save, summarize, and organize your favorite links with ease.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => router.push('/signup')}
          >
            Sign Up
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
