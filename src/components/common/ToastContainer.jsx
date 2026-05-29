import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const tone = {
  success: 'border-emerald-200 bg-white text-emerald-800 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-300',
  error: 'border-rose-200 bg-white text-rose-800 dark:border-rose-800 dark:bg-slate-900 dark:text-rose-300',
  info: 'border-indigo-200 bg-white text-indigo-800 dark:border-indigo-800 dark:bg-slate-900 dark:text-indigo-300'
};

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || Info;
        return (
          <div
            key={toast.id}
            className={`flex animate-fade-in items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur ${tone[toast.type] || tone.info}`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <p className="flex-1 text-sm font-semibold">{toast.message}</p>
            <button
              className="rounded-lg p-1 opacity-60 transition hover:opacity-100"
              onClick={() => removeToast(toast.id)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
