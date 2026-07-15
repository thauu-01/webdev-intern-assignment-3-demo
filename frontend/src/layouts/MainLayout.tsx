import { Outlet, NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Search Scores', icon: '🔍', end: true },
  { to: '/statistics', label: 'Reports', icon: '📊' },
  { to: '/ranking', label: 'Top 10 Khối A', icon: '🏆' },
];

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* ── Header (Blue Navy) ── */}
      <header className="h-16 flex items-center justify-center bg-blue-900 border-b border-blue-950 shadow-md">
        <h1 className="text-2xl font-bold tracking-wider text-white flex items-center gap-2">
          <span className="bg-white/10 px-2 py-0.5 rounded text-amber-400">G</span>
          <span>Scores</span>
        </h1>
      </header>

      <div className="flex flex-1">
        {/* ── Sidebar (Yellow to Green gradient) ── */}
        <aside className="w-64 bg-gradient-to-b from-amber-400 via-emerald-500 to-teal-700 text-slate-900 flex flex-col p-6 shadow-xl">
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-800/80 mb-4">Menu</h2>
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ to, label, icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-lg scale-[1.02]'
                        : 'text-slate-800 hover:bg-slate-900/10 hover:text-slate-950'
                    }`
                  }
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto border-t border-slate-900/10 pt-4 text-xs text-slate-800 font-medium">
            G-Scores © {new Date().getFullYear()}
            <br />
            THPT 2024 Exam Lookup
          </div>
        </aside>

        {/* ── Content Area ── */}
        <main className="flex-1 p-8 bg-slate-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
