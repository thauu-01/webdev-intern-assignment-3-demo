import { Outlet, NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Tra cứu điểm', icon: '🔍', end: true },
  { to: '/statistics', label: 'Thống kê', icon: '📊' },
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
        <aside 
          style={{ background: 'linear-gradient(to bottom, #fbbf24, #10b981, #0f766e)' }}
          className="w-16 md:w-64 text-slate-900 flex flex-col p-3 md:p-6 shadow-xl transition-all duration-300"
        >
          <div className="mb-8">
            <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-800/80 mb-4 text-center md:text-left">Menu</h2>
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ to, label, icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex flex-col md:flex-row items-center gap-1 md:gap-3 px-2 md:px-4 py-3 rounded-lg text-[10px] md:text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-lg scale-[1.02]'
                        : 'text-slate-800 hover:bg-slate-900/10 hover:text-slate-950'
                    }`
                  }
                >
                  <span className="text-lg md:text-base">{icon}</span>
                  <span className="hidden md:inline">{label}</span>
                  <span className="inline md:hidden text-[9px] font-bold mt-0.5">{label.split(' ')[0]}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto border-t border-slate-900/10 pt-4 text-[9px] md:text-xs text-slate-800 font-medium text-center md:text-left">
            <span className="hidden md:inline">G-Scores © {new Date().getFullYear()}<br />Tra cứu điểm thi THPT 2024</span>
            <span className="inline md:hidden font-bold">G©24</span>
          </div>
        </aside>

        {/* ── Content Area ── */}
        <main className="flex-1 p-4 md:p-8 bg-slate-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
