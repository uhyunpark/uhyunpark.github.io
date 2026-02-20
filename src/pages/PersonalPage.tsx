import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { HiOutlineExternalLink } from 'react-icons/hi'
import writingsData from '../data/writings.json'
import personalInterestsData from '../data/interest.json'
import othersData from '../data/others.json'

interface Writing {
  title: string
  excerpt?: string
  date: string
  slug: string
  url?: string
}

interface OtherWork {
  title: string
  description: string
  period: string
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function PersonalPage() {
  return (
    <div className="space-y-16">
      {/* Writings Section */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">Recent Writings</h2>
          <Link
            to="/writings"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="border-t border-gray-100 pt-4">
          {writingsData.length > 0 ? (
            <div className="space-y-4">
              {(writingsData as Writing[]).slice(0, 5).map((post, index) => {
                const isExternal = !!post.url
                const content = (
                  <div className="flex justify-between items-center gap-4 group">
                    <span className="flex items-center gap-1.5 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      <HiOutlineExternalLink className="w-3.5 h-3.5 text-gray-400" />
                      {post.title}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(post.date)}</span>
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
      </section>

      {/* Other Works Section */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Some Works</h2>
        <div className="border-t border-gray-100 pt-4 space-y-6">
          {(othersData as OtherWork[]).map((work, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-sm font-medium text-gray-900">{work.title}</h3>
                <span className="text-xs text-gray-400">{work.period}</span>
              </div>
              <div className="text-sm text-gray-600">
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 underline underline-offset-2 hover:text-gray-900"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {work.description}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interests Section */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Interests</h2>
        <div className="border-t border-gray-100 pt-4">
          <div className="flex flex-wrap gap-4 text-2xl">
            {(personalInterestsData as string[]).map((interest, index) => (
              <span key={index}>{interest}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
