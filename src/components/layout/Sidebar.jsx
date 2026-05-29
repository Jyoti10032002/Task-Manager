import { CheckSquare, LayoutDashboard, ListTodo, LogOut, Sparkles, UserCircle2, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/completed', label: 'Completed', icon: CheckSquare },
  { to: '/profile', label: 'Profile', icon: UserCircle2 }
];

const Sidebar = ({ open, onClose, onLogout }) => {
  return (
    <>
      {open ? (
        <button
          className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      ) : null}

      <aside
        className={`glass-sidebar fixed inset-y-0 left-0 z-30 flex h-screen min-h-screen w-72 flex-col p-5 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:min-h-screen lg:shrink-0 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-md shadow-indigo-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-800 dark:text-white">TaskFlow</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Manage smarter</p>
            </div>
          </div>
          <button className="btn btn-ghost !p-2 lg:hidden" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'nav-active'
                    : 'text-slate-600 hover:bg-indigo-50/80 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          className="btn btn-ghost mt-auto w-full justify-start gap-2 text-rose-600 hover:border-rose-200 hover:bg-rose-50 dark:text-rose-400 dark:hover:border-rose-900 dark:hover:bg-rose-950/40"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
