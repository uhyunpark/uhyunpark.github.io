import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { writings, getWriting, formatDate } from '../lib/writings'

const backLink = (
  <Link
    to="/writing"
    className="inline-block text-xs text-gray-400 hover:text-gray-600 transition-colors mb-8"
  >
    ← Writing
  </Link>
)

export default function WritingDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = getWriting(slug)

  if (!post) {
    return (
      <div>
        {backLink}
        <p className="text-sm text-gray-600">The writing you're looking for doesn't exist.</p>
      </div>
    )
  }

  // Prev/next among internal posts only; external posts have no page here.
  const internal = writings.filter((w) => !w.url)
  const index = internal.findIndex((w) => w.slug === post.slug)
  const newer = index > 0 ? internal[index - 1] : undefined
  const older = index >= 0 ? internal[index + 1] : undefined

  return (
    <div>
      {backLink}

      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h1>
          <time className="text-xs text-gray-400">
            {formatDate(post.date, { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
        </header>

        {post.url ? (
          <p className="text-sm text-gray-600">
            This post is published elsewhere.{' '}
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-gray-900"
            >
              Read it here ↗
            </a>
          </p>
        ) : (
          <div className="writing-body prose prose-gray max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                a: ({ href, children }) =>
                  href && /^https?:\/\//.test(href) ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ) : (
                    <a href={href}>{children}</a>
                  ),
                img: ({ src, alt }) => <img src={src} alt={alt ?? ''} loading="lazy" />,
              }}
            >
              {post.body}
            </ReactMarkdown>
          </div>
        )}
      </article>

      {!post.url && (newer || older) && (
        <footer className="mt-16 border-t border-gray-100 pt-4 flex justify-between gap-4 text-sm">
          {older ? (
            <Link
              to={`/writing/${older.slug}`}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← {older.title}
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              to={`/writing/${newer.slug}`}
              className="text-gray-400 hover:text-gray-600 transition-colors text-right"
            >
              {newer.title} →
            </Link>
          )}
        </footer>
      )}
    </div>
  )
}
