import './App.css'
import { ArrowUpRight, Mail, Copy, Check } from "lucide-react"
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { useState } from "react"
import ReactMarkdown from 'react-markdown'
import workExperienceData from './data/exp.json'
import writingsData from './data/writings.json'
import personalInterestsData from './data/interest.json'
import otherWorksData from './data/otherworks.json'
import educationData from './data/education.json'

interface WorkExperience {
  company: string;
  position: string;
  period: string;
  description: string;
}

interface Writing {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
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
  const [isPersonal, setIsPersonal] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleToggle = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsPersonal(!isPersonal)
      setIsTransitioning(false)
    }, 200)
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
            Hello, I'm <em>Uhyun Park</em>
          </h1>

          <p className="text-gray-600 leading-relaxed text-lg max-w-lg mx-auto mb-6">
          I'm a full stack engineer and data specialist passionate about building great products.
          I turn early-stage ideas to life and strive to be a supportive teammate and a leader who drives meaningful impact.
          </p>

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
        <div className="flex justify-end items-center gap-3 mb-12 relative">
          <img 
            src="/personal_indicator.png" 
            alt="Personal mode indicator" 
            className="absolute -right-10 md:-right-12 top-5 transform -translate-y-1/2 w-80 h-80 opacity-70 hover:opacity-100 transition-opacity cursor-pointer z-0 pointer-events-auto"
            onClick={handleToggle}
          />
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10 ${
              isPersonal ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                isPersonal ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Writings Section */}
        {isPersonal && (
          <div className={`mb-20 transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-light text-gray-900">Recent Writings</h2>
              <a
                href="/writings"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
              >
                View all <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <div className="w-full h-px bg-gray-200 mb-4"></div>

            <div className="space-y-6">
              {writingsData.length > 0 ? (
                (writingsData as Writing[]).map((post, index) => (
                  <a key={index} href={`/writings/${post.slug}`} className="block group">
                    <article className="py-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                            {post.title}
                          </h3>
                          <div className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none">
                            <ReactMarkdown>{post.excerpt}</ReactMarkdown>
                          </div>
                        </div>
                        <time className="text-sm text-gray-400 whitespace-nowrap">{post.date}</time>
                      </div>
                    </article>
                  </a>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">✍️</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ooh... seems he's writing something.. maybe nothing</h3>
                  <p className="text-gray-600 text-sm">New articles are coming soon. Stay tuned!</p>
                </div>
              )}
            </div>

            {/* Personal Interests Section */}
            <div className="mt-16">
              <h3 className="text-xl font-light text-gray-900 mb-4">Personal Interests</h3>
              <div className="w-full h-px bg-gray-200 mb-6"></div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                {(personalInterestsData as string[]).map((interest, index) => (
                  <div key={index}>{interest}</div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="mt-16">
              <h3 className="text-xl font-light text-gray-900 mb-4">Education</h3>
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

        {/* Work Experience Section */}
        {!isPersonal && (
          <div className={`mb-16 transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
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

            {/* Other Works Section */}
            <div className="mt-16">
              <h3 className="text-xl font-light text-gray-900 mb-4">Something More</h3>
              <div className="w-full h-px bg-gray-200 mb-6"></div>
              <div className="space-y-4">
                {(otherWorksData as OtherWork[]).map((work, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-medium text-gray-900">{work.title}</h4>
                        <span className="text-sm text-gray-400">{work.period}</span>
                      </div>
                      <div className="prose prose-sm max-w-none text-gray-600 text-sm">
                        <ReactMarkdown>{work.description}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
