import { Link } from 'react-router-dom'
import { writings, formatDate } from '../lib/writings'

const years = [...new Set(writings.map((w) => w.date.slice(0, 4)))]

export default function WritingsPage() {
  return (
    <div>
      <h1 className="text-base font-semibold text-gray-900 mb-3">Writing</h1>
      <div className="border-t border-gray-100 pt-4">
        {writings.length > 0 ? (
          <div className="space-y-8">
            {years.map((year) => (
              <section key={year}>
                <h2 className="text-xs text-gray-400 mb-3">{year}</h2>
                <div className="space-y-4">
                  {writings
                    .filter((post) => post.date.startsWith(year))
                    .map((post) => {
                      const content = (
                        <>
                          <div className="flex justify-between items-baseline gap-4">
                            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                              {post.title}
                              {post.url && <span className="ml-1 text-gray-400">↗</span>}
                            </span>
                            <span className="text-xs text-gray-400 whitespace-nowrap tabular-nums">
                              {formatDate(post.date, { month: 'short', day: '2-digit' })}
                            </span>
                          </div>
                          {post.excerpt && (
                            <p className="text-xs text-gray-400 mt-1">{post.excerpt}</p>
                          )}
                        </>
                      )

                      return post.url ? (
                        <a
                          key={post.slug}
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block"
                        >
                          {content}
                        </a>
                      ) : (
                        <Link
                          key={post.slug}
                          to={`/writing/${post.slug}`}
                          className="group block"
                        >
                          {content}
                        </Link>
                      )
                    })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">Coming soon.</p>
        )}
      </div>
    </div>
  )
}
