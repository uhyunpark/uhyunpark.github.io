import { Outlet, NavLink } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import Sidebar from './Sidebar'

export default function Layout() {
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex-1 py-1 text-center text-sm transition-colors ${
      isActive
        ? 'text-gray-900'
        : 'text-gray-500'
    }`

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Sidebar (desktop) - fixed to left of centered content */}
      <Sidebar />

      {/* Mobile top header + nav */}
      <header className="md:hidden sticky top-0 z-40 bg-stone-50/95 backdrop-blur border-b border-gray-100">
        <div className="px-6 py-4 flex items-center gap-4">
          <NavLink to="/" className="text-lg text-gray-900">
            <span className="italic font-light">Uhyun Park</span>
          </NavLink>
          <div className="flex items-center gap-3 text-gray-500">
            <a
              href="mailto:pibrizo@gmail.com"
              className="hover:text-gray-700 transition-colors"
              aria-label="Email"
            >
              <HiOutlineMail className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://github.com/uhyunpark"
              className="hover:text-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/uhyun-park-353248ab/"
              className="hover:text-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <nav className="px-4 pb-3">
          <div className="flex items-center">
            <NavLink to="/" end className={mobileNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/resume" className={mobileNavLinkClass}>
              Experience
            </NavLink>
          </div>
        </nav>
      </header>

      {/* Main content - centered */}
      <main className="max-w-2xl mx-auto">
        <div className="px-8 py-6 md:py-16">
          <Outlet />
        </div>
      </main>

    </div>
  )
}
