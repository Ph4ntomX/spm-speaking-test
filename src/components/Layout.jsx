import { NavLink, Outlet } from 'react-router-dom'
import { Home, MessageCircle, Presentation, Users, PlayCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/part-1', icon: MessageCircle, label: 'Part 1' },
  { to: '/part-2', icon: Presentation, label: 'Part 2' },
  { to: '/part-3', icon: Users, label: 'Part 3' },
  { to: '/full', icon: PlayCircle, label: 'Full' },
]

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
      <header className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <span className="text-xl group-hover:scale-110 transition-transform">🎤</span>
              <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg tracking-tight">SPM Speaking</span>
            </NavLink>

            <div className="flex items-center gap-1">
              <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
                {navItems.map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 shadow-sm'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-stone-200'
                      }`
                    }
                  >
                    <Icon size={15} />
                    {label}
                  </NavLink>
                ))}
              </nav>

              <button
                className="md:hidden p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-400 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 animate-fade-in">
            <div className="px-4 py-2 space-y-0.5">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                    }`
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
