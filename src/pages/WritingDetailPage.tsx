import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import writingsData from '../data/writings.json'

interface Writing {
  title: string
  excerpt?: string
  date: string
  slug: string
  url?: string
}

// Import all markdown files from src/writings/
const markdownFiles = import.meta.glob('../writings/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

export default function WritingDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const writings = writingsData as Writing[]
  const post = writings.find((w) => w.slug === slug)

  // Get markdown content from file
  const markdownKey = `../writings/${slug}.md`
  const content = markdownFiles[markdownKey] || ''

  if (!post) {
    return (
      <div>
        <nav className="text-xs text-gray-400 mb-8">
          <Link to="/writings" className="hover:text-gray-600 transition-colors">
            Writings
          </Link>
          <span className="mx-2">/</span>
          <span>Not found</span>
        </nav>
        <p className="text-sm text-gray-600">The writing you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div>
      <nav className="text-xs text-gray-400 mb-8">
        <Link to="/writings" className="hover:text-gray-600 transition-colors">
          Writings
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{post.title}</span>
      </nav>

      <article>
        <header className="mb-8">
          <h1 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h1>
          <time className="text-xs text-gray-400">{post.date}</time>
        </header>

        <div className="border-t border-gray-100 pt-6">
          <div className="prose prose-sm prose-gray max-w-none">
            <ReactMarkdown>{content || post.excerpt}</ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  )
}
