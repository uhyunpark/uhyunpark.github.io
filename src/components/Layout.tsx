import { Outlet, NavLink } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex-1 py-3 text-center text-sm transition-colors ${
      isActive
        ? 'text-gray-900 font-medium'
        : 'text-gray-400'
    }`

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar (desktop) - fixed to left of centered content */}
      <Sidebar />

      {/* Main content - centered */}
      <main className="max-w-2xl mx-auto pb-16 md:pb-0">
        <div className="px-8 py-16 md:py-24">
          <Outlet />
        </div>
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100">
        <div className="flex">
          <NavLink to="/" end className={mobileNavLinkClass}>
            Personal
          </NavLink>
          <NavLink to="/resume" className={mobileNavLinkClass}>
            Experience
          </NavLink>
          <NavLink to="/writings" className={mobileNavLinkClass}>
            Writings
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
