import { NavLink } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

export default function Sidebar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block py-1 text-sm transition-colors ${
      isActive
        ? 'text-gray-900 font-medium'
        : 'text-gray-400 hover:text-gray-600'
    }`

  return (
    <aside className="hidden lg:block fixed top-0 left-[calc(50%-21rem-12rem)] w-48">
      <div className="flex flex-col h-screen px-6 py-24">
        {/* Name */}
        <div className="mb-3">
          <NavLink to="/" className="text-2xl text-gray-900">
            <span className="italic font-light">Uhyun Park</span>
          </NavLink>
        </div>

        {/* Contact Links */}
        <div className="flex items-center gap-3 text-gray-500 mb-8">
          <a
            href="mailto:pibrizo@gmail.com"
            className="hover:text-gray-700 transition-colors"
            aria-label="Email"
          >
            <HiOutlineMail className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/uhyunpark"
            className="hover:text-gray-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="w-4.5 h-4.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/uhyun-park-353248ab/"
            className="hover:text-gray-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-4.5 h-4.5" />
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/resume" className={navLinkClass}>
            Experience
          </NavLink>
        </nav>
      </div>
    </aside>
  )
}
