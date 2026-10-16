import fm from 'front-matter'

export interface Writing {
  slug: string
  title: string
  date: string
  excerpt?: string
  url?: string
  body: string
}

interface Frontmatter {
  title: string
  date: string | Date
  excerpt?: string
  url?: string
}

const files = import.meta.glob('../writings/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function toDateString(value: string | Date): string {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value)
}

export const writings: Writing[] = Object.entries(files)
  .map(([path, raw]) => {
    const { attributes, body } = fm<Frontmatter>(raw)
    return {
      slug: path.split('/').pop()!.replace(/\.md$/, ''),
      title: attributes.title,
      date: toDateString(attributes.date),
      excerpt: attributes.excerpt,
      url: attributes.url,
      body,
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

export function getWriting(slug: string | undefined): Writing | undefined {
  return writings.find((w) => w.slug === slug)
}

// Dates are plain YYYY-MM-DD; format in UTC to avoid timezone shifts.
export function formatDate(
  dateStr: string,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Date(dateStr).toLocaleDateString('en-US', { ...options, timeZone: 'UTC' })
}
