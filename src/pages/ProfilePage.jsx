import { Mail, User } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const initial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <section>
      <PageHeader title="Profile" subtitle="Your account details" />

      <div className="card-static max-w-xl overflow-hidden p-0">
        <div className="h-28 bg-brand-gradient" />
        <div className="relative px-6 pb-6">
          <div className="-mt-12 mb-4 flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-brand-gradient text-3xl font-extrabold text-white shadow-glow dark:border-slate-900">
            {initial}
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
              <User className="mt-0.5 h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</p>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{user?.name}</h2>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
              <Mail className="mt-0.5 h-5 w-5 text-violet-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{user?.email}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
