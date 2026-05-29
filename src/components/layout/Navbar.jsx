import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ onMenuClick, userName }) => {
  const { theme, toggleTheme } = useTheme();
  const initial = userName?.charAt(0)?.toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/70 lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <button className="btn btn-ghost !p-2.5 lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-1 items-center gap-3">
          <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white shadow-md shadow-indigo-500/30 sm:flex">
            {initial}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
              Welcome back
            </p>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">{userName}</h2>
          </div>
        </div>

        <button
          className="btn btn-ghost !rounded-full !p-2.5"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
