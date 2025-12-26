import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import writingsData from '../data/writings.json'

interface Writing {
  title: string
  excerpt: string
  date: string
  slug: string
}

export default function WritingsPage() {
  const writings = writingsData as Writing[]

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-2xl mx-auto px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="text-3xl font-light text-gray-900 mb-8">Writings</h1>
        <div className="w-full h-px bg-gray-200 mb-8"></div>

        {writings.length > 0 ? (
          <div className="space-y-6">
            {writings.map((post, index) => (
              <Link key={index} to={`/writings/${post.slug}`} className="block group">
                <article className="py-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-light italic text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <time className="text-sm text-gray-400 whitespace-nowrap">{post.date}</time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No writings yet</h3>
            <p className="text-gray-600 text-sm">New articles are coming soon. Stay tuned!</p>
          </div>
        )}
      </div>
    </div>
  )
}
