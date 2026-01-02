import './App.css'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Copy, Check } from "lucide-react"
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import workExperienceData from './data/exp.json'
import writingsData from './data/writings.json'
import personalInterestsData from './data/interest.json'
import othersData from './data/others.json'
import educationData from './data/education.json'

interface WorkExperience {
  company: string;
  position: string;
  period: string;
  description: string;
}

interface Writing {
  title: string;
  excerpt?: string;
  date: string;
  slug: string;
  url?: string;
}

interface OtherWork {
  title: string;
  description: string;
  period: string;
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

function App() {
  const [isResume, setIsResume] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleToggle = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsResume(!isResume)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 400)
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('pibrizo@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full blur-sm"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f4f6f8 5%, #e2e8f0 8%, #d1d9e0 12%, #cbd5e1 15%, #d4d8dd 20%, #f0f9ff 25%, #e8f4fd 30%, #f1f5f9 35%, #f6f8fa 40%, #faf9f7 45%, #fef7cd 50%, #fef9d3 55%, #fef3c7 60%, #fef6ce 65%, #fefcf0 70%, #fefefe 75%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0.5) 85%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.1) 95%, transparent 100%)',
            opacity: 0.6
          }}
        />
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 70%, rgba(255,255,255,0.9) 85%, white 100%)'
          }}
        />
      </div>

      <div className="container max-w-2xl mx-auto px-6 py-16 relative z-10">
        {/* Profile Section */}
        <div className="text-center mb-24">
          <div className="relative w-40 h-40 mx-auto mb-6">
            <img
              src="https://lh3.googleusercontent.com/d/1FSarnewF6oPWgbEsW9FtA5ttPnoQeoTo?height=256&width=256"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <h1 className="text-4xl font-light leading-tight mb-4 text-gray-900">
            <em>Uhyun Park</em>
          </h1>

          {/* <p className="text-gray-600 leading-relaxed text-lg max-w-lg mx-auto mb-6">
          Full stack engineer and data specialist passionate about building great products.
          </p> */}

          {/* Contact Links */}
          <div className="flex justify-center gap-4 relative z-10">
            <div className="flex items-center gap-2">
              <a
                href="mailto:pibrizo@gmail.com"
                className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2 text-sm"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <button
                onClick={handleCopyEmail}
                className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1 text-sm"
                title="Copy Email"
              >
                {copied ? <Check className="w-2 h-2" /> : <Copy className="w-2 h-2" />}
              </button>
            </div>
            <a
              href="https://github.com/uhyunpark"
              className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2 text-sm"
              target="_blank"
              rel="noopener noreferrer"
              title="View GitHub Profile"
            >
              <FaGithub className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-end items-center gap-3 mb-20 relative">
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 z-10 ${
              isResume ? 'bg-lime-300' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                isResume ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Default Page - Writings, Other Works, Interests, Education */}
        {!isResume && (
          <div className={`mb-20 transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {/* Writings Section */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-light text-gray-900">Recent Writings</h2>
              <Link
                to="/writings"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1 z-10"
              >
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="w-full h-px bg-gray-200 mb-4"></div>

            <div className="space-y-6">
              {writingsData.length > 0 ? (
                (writingsData as Writing[]).map((post, index) => {
                  const isExternal = !!post.url;
                  const content = (
                    <article className="py-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-light italic text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                            {post.title}
                            {isExternal && <ArrowUpRight className="inline-block w-3 h-3 ml-1 opacity-50" />}
                          </h3>
                          <div className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none">
                            <ReactMarkdown>{post.excerpt || ''}</ReactMarkdown>
                          </div>
                        </div>
                        <time className="text-sm text-gray-400 whitespace-nowrap">{post.date}</time>
                      </div>
                    </article>
                  );

                  return isExternal ? (
                    <a 
                      key={index} 
                      href={post.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block group"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link key={index} to={`/writings/${post.slug}`} className="block group">
                      {content}
                    </Link>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">✍️</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ooh... seems he's writing something.. maybe nothing</h3>
                  <p className="text-gray-600 text-sm">New articles are coming soon. Stay tuned!</p>
                </div>
              )}
            </div>

            {/* Interests Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-light text-gray-900 mb-4">Interests</h2>
              <div className="w-full h-px bg-gray-200 mb-6"></div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                {(personalInterestsData as string[]).map((interest, index) => (
                  <div key={index}>{interest}</div>
                ))}
              </div>
            </div>

            {/* Other Works Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-light text-gray-900 mb-4">Some Works</h2>
              <div className="w-full h-px bg-gray-200 mb-6"></div>
              <div className="flex flex-col gap-4">
                {(othersData as OtherWork[]).map((work, index) => (
                  <div key={index} className="flex flex-col justify-between items-start gap-3 pb-4">
                      <div className="flex flex-row w-full justify-between items-start">
                        <h4 className="text-lg font-medium text-gray-900">{work.title}</h4>
                        <span className="mt-1 text-sm text-gray-400">{work.period}</span>
                      </div>
                      <div className="prose prose-sm max-w-none text-gray-600 text-sm">
                      <ReactMarkdown>{work.description}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-light text-gray-900 mb-4">Education</h2>
              <div className="w-full h-px bg-gray-200 mb-6"></div>
              <div className="space-y-6">
                {(educationData as Education[]).map((edu, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{edu.institution}</h4>
                        <p className="text-gray-600">{edu.degree}</p>
                      </div>
                      <span className="text-sm text-gray-400">{edu.period}</span>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-600 text-sm">
                      <ReactMarkdown>{edu.description}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resume Page - Work Experience */}
        {isResume && (
          <div className={`mb-16 transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-light text-gray-900">Work Experience</h2>
              <a
                href="https://www.linkedin.com/in/uhyun-park-353248ab/"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                title="View LinkedIn Profile"
              >
                <FaLinkedin className="w-5 h-5 mt-1" />
              </a>
            </div>
            <div className="w-full h-px bg-gray-200 mb-8"></div>

            <div className="space-y-8">
              {(workExperienceData as WorkExperience[]).map((job, index) => (
                <div key={index} className="pb-6 border-b border-gray-100 last:border-b-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{job.company}</h3>
                      <p className="text-gray-600">{job.position}</p>
                    </div>
                    <span className="text-sm text-gray-400">{job.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none">
                    <ReactMarkdown>{job.description}</ReactMarkdown>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="text-center pt-8 border-t border-gray-100">
          <div className="flex justify-center gap-6 text-sm">
            {/* <a href="mailto:hello@example.com" className="text-gray-600 hover:text-gray-900 transition-colors">
              Email
            </a> */}
            {/* <a
              href="https://twitter.com"
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              Twitter <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/uhyun-park-353248ab/"
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              LinkedIn <ExternalLink className="w-3 h-3" />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
