import { useMemo } from 'react';
import { Calendar, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { TASK_STATUSES } from '../../utils/constants';
import { formatDate, isOverdue } from '../../utils/date';
import { getTitleHighlightParts } from '../../utils/search';

const badgeTone = {
  Low: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:ring-emerald-800',
  Medium: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-800',
  High: 'bg-rose-100 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:ring-rose-800'
};

const statusTone = {
  Pending: 'border-l-slate-400',
  'In Progress': 'border-l-amber-500',
  Completed: 'border-l-emerald-500'
};

const TaskTitle = ({ title, searchQuery }) => {
  const parts = useMemo(() => getTitleHighlightParts(title, searchQuery), [title, searchQuery]);

  return (
    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
      {parts.map((part, index) =>
        part.highlight ? (
          <mark
            key={index}
            className="rounded bg-indigo-200 px-0.5 text-indigo-900 dark:bg-indigo-500/40 dark:text-indigo-100"
          >
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </h3>
  );
};

const TaskCard = ({
  task,
  searchQuery = '',
  onEdit,
  onDelete,
  onToggleComplete,
  onStatusChange,
  onDragStart,
  onDrop,
  showManageActions = true
}) => {
  const overdue = isOverdue(task.dueDate) && task.status !== 'Completed';
  const isFiltered = searchQuery.trim().length > 0;

  return (
    <article
      draggable
      onDragStart={() => onDragStart(task.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(task.id)}
      className={`card group cursor-grab border-l-4 active:cursor-grabbing ${statusTone[task.status] || 'border-l-indigo-500'} ${
        isFiltered ? 'ring-2 ring-indigo-200/80 dark:ring-indigo-800/60' : ''
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <GripVertical className="mt-1 h-4 w-4 shrink-0 text-slate-300 opacity-0 transition group-hover:opacity-100 dark:text-slate-600" />
          <div>
            <TaskTitle title={task.title} searchQuery={searchQuery} />
            {showManageActions ? (
              <select
                className="mt-2 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                value={task.status}
                onChange={(e) => onStatusChange(task, e.target.value)}
              >
                {TASK_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : (
              <span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {task.status}
              </span>
            )}
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${badgeTone[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {task.description}
      </p>

      <div
        className={`mb-4 inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
          overdue ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40' : 'bg-slate-50 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400'
        }`}
      >
        <Calendar className="h-3.5 w-3.5" />
        Due: {formatDate(task.dueDate)}
      </div>

      {showManageActions ? (
        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button className="btn btn-primary !py-2 text-xs" onClick={() => onToggleComplete(task)}>
            {task.status === 'Completed' ? 'Reopen' : 'Complete'}
          </button>
          <button className="btn btn-ghost !py-2 text-xs" onClick={() => onEdit(task)}>
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button
            className="btn btn-ghost !py-2 text-xs text-rose-500 hover:border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/30"
            onClick={() => onDelete(task)}
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      ) : null}
    </article>
  );
};

export default TaskCard;
