import { FaLinkedin } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import workExperienceData from '../data/exp.json'

interface WorkExperience {
  company: string
  position: string
  period: string
  description: string
}

export default function ResumePage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-sm font-medium text-gray-900">Work Experience</h2>
        <a
          href="https://www.linkedin.com/in/uhyun-park-353248ab/"
          className="text-gray-400 hover:text-gray-600 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="w-4 h-4" />
        </a>
      </div>
      <div className="border-t border-gray-100 pt-4 space-y-8">
        {(workExperienceData as WorkExperience[]).map((job, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-sm font-medium text-gray-900">{job.company}</h3>
              <span className="text-xs text-gray-400">{job.period}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{job.position}</p>
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
                {job.description}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
