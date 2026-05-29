import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../components/common/TextInput';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { validateEmail } from '../utils/validators';

const LoginPage = () => {
  const { login, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const email = form.email.trim();

    if (!email) errors.email = 'Email is required';
    else if (!validateEmail(email)) errors.email = 'Please enter a valid email';

    if (!form.password) errors.password = 'Password is required';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!validateForm()) return;

    try {
      await login({
        email: form.email.trim(),
        password: form.password
      });
      showToast('Welcome back!', 'success');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const message = err?.message || 'Login failed. Please try again.';
      setError(message);
      showToast(message, 'error');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-blob left-[-10%] top-[-10%] h-72 w-72 bg-indigo-400/30 animate-float" />
      <div className="auth-blob bottom-[-15%] right-[-5%] h-80 w-80 bg-violet-400/25" style={{ animationDelay: '1s' }} />
      <div className="auth-blob left-[30%] bottom-[10%] h-56 w-56 bg-sky-400/20" />

      <div className="relative z-10 grid w-full max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
        <div className="hidden px-4 lg:block">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/60 px-4 py-1.5 text-sm font-medium text-indigo-700 backdrop-blur dark:border-indigo-800/60 dark:bg-slate-900/60 dark:text-indigo-300">
            <Sparkles className="h-4 w-4" /> Premium task workspace
          </div>
          <h1 className="page-title text-4xl leading-tight md:text-5xl">Organize work beautifully.</h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Track priorities, deadlines, and progress in one sleek dashboard built for modern teams.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-card space-y-5" noValidate>
          <div className="text-center lg:text-left">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow lg:mx-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome back</h2>
            <p className="mt-1 text-sm text-slate-500">Sign in to continue to TaskFlow</p>
          </div>

          <TextInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            error={fieldErrors.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Password</label>
            <div className="relative">
              <input
                className="input pr-10"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-slate-400 hover:text-indigo-600"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {fieldErrors.password ? (
              <p className="mt-1.5 text-xs font-medium text-rose-500">{fieldErrors.password}</p>
            ) : null}
          </div>

          {error ? (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:bg-rose-950/40" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className="btn btn-primary w-full py-3" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{' '}
            <Link className="font-bold text-indigo-600 hover:text-violet-600 dark:text-indigo-400" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
