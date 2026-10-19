import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { writings, formatDate } from '../lib/writings'
import personalInterestsData from '../data/interest.json'
import keywordsData from '../data/keywords.json'
import othersData from '../data/others.json'

interface OtherWork {
  title: string
  description: string
  period: string
}

const latest = writings.slice(0, 3)

export default function PersonalPage() {
  return (
    <div className="space-y-16">
      {/* Other Works Section */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Projects</h2>
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

      {/* Writing Section */}
      {latest.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Writing</h2>
            {writings.length > 3 && (
              <Link
                to="/writing"
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                All writing →
              </Link>
            )}
          </div>
          <div className="border-t border-gray-100 pt-4 space-y-3">
            {latest.map((post) => {
              const row = (
                <>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {post.title}
                    {post.url && <span className="ml-1 text-gray-400">↗</span>}
                  </span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {formatDate(post.date, { month: 'short', year: 'numeric' })}
                  </span>
                </>
              )
              const rowClass = 'group flex justify-between items-baseline gap-4'
              return post.url ? (
                <a
                  key={post.slug}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                >
                  {row}
                </a>
              ) : (
                <Link key={post.slug} to={`/writing/${post.slug}`} className={rowClass}>
                  {row}
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Interests Section */}
      <section>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Interests</h2>
        <div className="border-t border-gray-100 pt-4 grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-3 items-baseline">
          <span className="text-xs text-gray-400">Now</span>
          <p className="text-sm text-gray-900">
            {(keywordsData as string[]).map((keyword, index, all) => (
              <Fragment key={index}>
                <span className="whitespace-nowrap">
                  {keyword}
                  {index < all.length - 1 && <span className="mx-2 text-gray-300">·</span>}
                </span>
                <wbr />
              </Fragment>
            ))}
          </p>
          <span className="text-xs text-gray-400">Life</span>
          <div className="flex flex-wrap gap-3 text-xl">
            {(personalInterestsData as string[]).map((interest, index) => (
              <span key={index}>{interest}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
