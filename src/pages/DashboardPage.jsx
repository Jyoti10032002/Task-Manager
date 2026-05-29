import { useMemo } from 'react';
import { ArrowRight, CheckCheck, Clock3, ListTodo, Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Spinner from '../components/common/Spinner';
import { useTasks } from '../context/TaskContext';

const statStyles = [
  { iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300' },
  { iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-300' },
  { iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300' },
  { iconBg: 'bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-300' }
];

const DashboardPage = () => {
  const { tasks, loading } = useTasks();

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'Completed').length;
    const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
    const pending = tasks.filter((task) => task.status === 'Pending').length;
    return [
      { label: 'Total Tasks', value: tasks.length, icon: ListTodo },
      { label: 'Completed', value: completed, icon: CheckCheck },
      { label: 'In Progress', value: inProgress, icon: TrendingUp },
      { label: 'Pending', value: pending, icon: Clock3 }
    ];
  }, [tasks]);

  const recentTasks = useMemo(() => tasks.slice(0, 5), [tasks]);
  const completionRate = tasks.length ? Math.round((stats[1].value / tasks.length) * 100) : 0;

  if (loading) return <Spinner fullScreen />;

  return (
    <section>
      <PageHeader
        title="Dashboard"
        subtitle="Your productivity snapshot at a glance"
        action={
          <Link to="/tasks" className="btn btn-primary">
            <Plus className="h-4 w-4" /> Add Task
          </Link>
        }
      />

      <div className="mb-6 overflow-hidden rounded-2xl border border-indigo-200/50 bg-brand-gradient p-6 text-white shadow-glow dark:border-indigo-800/40">
        <p className="text-sm font-medium text-indigo-100">Completion rate</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h2 className="text-4xl font-extrabold">{completionRate}%</h2>
          <p className="max-w-xs text-sm text-indigo-100">
            {stats[1].value} of {tasks.length} tasks completed.
          </p>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${completionRate}%` }} />
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }, index) => (
          <div className="stat-card" key={label}>
            <div className={`mb-4 inline-flex rounded-xl p-3 ${statStyles[index].iconBg}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight">{value}</h2>
          </div>
        ))}
      </div>

      <div className="card-static">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Recent Tasks</h3>
          <Link to="/tasks" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-violet-600">
            Manage tasks <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {recentTasks.length === 0 ? (
          <p className="text-sm text-slate-500">No tasks yet. Click Add Task to create your first one.</p>
        ) : (
          <ul className="space-y-3">
            {recentTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 dark:border-slate-800"
              >
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{task.title}</p>
                  <p className="text-xs text-slate-500">{task.status} · {task.priority} priority</p>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
