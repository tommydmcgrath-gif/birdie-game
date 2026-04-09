import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Leaderboard', icon: '🏆' },
  { to: '/course', label: 'Course', icon: '⛳' },
  { to: '/rules', label: 'Rules', icon: '📋' },
];

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      {/* Header */}
      <header className="bg-green-900 text-white px-4 py-3 shadow-md">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-xl">🐦</span>
            <div>
              <h1 className="text-base font-bold leading-tight tracking-tight">Birdie Game</h1>
              <p className="text-[10px] text-green-300 leading-tight tracking-wide uppercase">
                CC of Fairfield
              </p>
            </div>
          </NavLink>
          <NavLink
            to="/join"
            className="bg-gold-500 hover:bg-gold-400 text-green-950 text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            + Join
          </NavLink>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4 pb-20">
        <Outlet />
      </main>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb z-50">
        <div className="max-w-lg mx-auto flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-2 text-xs transition-colors ${
                  isActive
                    ? 'text-green-700 font-semibold'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <span className="text-lg mb-0.5">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
