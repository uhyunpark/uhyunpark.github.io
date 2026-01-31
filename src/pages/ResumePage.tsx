import { FaLinkedin } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import workExperienceData from '../data/exp.json'
import educationData from '../data/education.json'

interface WorkExperience {
  company: string
  position: string
  period: string
  description: string
}

interface Education {
  institution: string
  degree: string
  period: string
}

export default function ResumePage() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-base font-semibold text-gray-900">Work Experience</h2>
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

      {/* Education Section */}
      <h2 className="text-base font-semibold text-gray-900 mt-12 mb-3">Education</h2>
      <div className="border-t border-gray-100 pt-4 space-y-6">
        {(educationData as Education[]).map((edu, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-sm font-medium text-gray-900">{edu.institution}</h3>
              <span className="text-xs text-gray-400">{edu.period}</span>
            </div>
            <p className="text-sm text-gray-500">{edu.degree}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
