import { Link } from 'react-router-dom'
import writingsData from '../data/writings.json'

interface Writing {
  title: string
  excerpt?: string
  date: string
  slug: string
  url?: string
}

export default function WritingsPage() {
  const writings = writingsData as Writing[]

  return (
    <div>
      <h1 className="text-sm font-medium text-gray-900 mb-6">Writings</h1>
      <div className="border-t border-gray-100 pt-4">
        {writings.length > 0 ? (
          <div className="space-y-4">
            {writings.map((post, index) => {
              const isExternal = !!post.url
              const content = (
                <div className="group">
                  <div className="flex justify-between items-baseline gap-4 mb-1">
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      {post.title}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{post.date}</span>
                  </div>
                  {post.excerpt && (
                    <p className="text-xs text-gray-400">{post.excerpt}</p>
                  )}
                </div>
              )

              return isExternal ? (
                <a
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <Link key={index} to={`/writings/${post.slug}`} className="block">
                  {content}
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-400">Coming soon.</p>
        )}
      </div>
    </div>
  )
}
