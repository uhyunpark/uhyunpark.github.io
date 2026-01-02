import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
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
      <div className="min-h-screen bg-white">
        <div className="container max-w-2xl mx-auto px-6 py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-light text-gray-900 mb-4">Post not found</h1>
            <p className="text-gray-600">The writing you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

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

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-4">{post.title}</h1>
            <time className="text-sm text-gray-400">{post.date}</time>
          </header>

          <div className="w-full h-px bg-gray-200 mb-8"></div>

          <div className="prose prose-gray max-w-none">
            <ReactMarkdown>{content || post.excerpt}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  )
}
