import { Eye, EyeOff, Rocket, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../components/common/TextInput';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { validateEmail, validatePassword } from '../utils/validators';

const RegisterPage = () => {
  const { register, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validateEmail(form.email)) {
      setError('Please enter a valid email address');
      return;
    }

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (!form.name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password
      });
      showToast('Account created successfully', 'success');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-blob right-[-10%] top-[-10%] h-72 w-72 bg-violet-400/30 animate-float" />
      <div className="auth-blob bottom-[-10%] left-[-5%] h-80 w-80 bg-indigo-400/25" />

      <div className="relative z-10 grid w-full max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
        <div className="hidden px-4 lg:block">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-white/60 px-4 py-1.5 text-sm font-medium text-violet-700 backdrop-blur dark:border-violet-800/60 dark:bg-slate-900/60 dark:text-violet-300">
            <Rocket className="h-4 w-4" /> Get started in minutes
          </div>
          <h1 className="page-title text-4xl leading-tight md:text-5xl">Build your productivity hub.</h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Create an account and start managing tasks with a clean, modern dashboard experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-card space-y-5">
          <div className="text-center lg:text-left">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow lg:mx-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Create account</h2>
            <p className="mt-1 text-sm text-slate-500">Join TaskFlow today</p>
          </div>

          <TextInput
            label="Name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
          <TextInput
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
          />

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700 dark:text-slate-200">Password</label>
            <div className="relative">
              <input
                className="input pr-10"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-slate-400 hover:text-indigo-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error ? (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:bg-rose-950/40">{error}</p>
          ) : null}

          <button className="btn btn-primary w-full py-3" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link className="font-bold text-indigo-600 hover:text-violet-600 dark:text-indigo-400" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
