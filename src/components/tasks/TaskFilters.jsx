import { Filter, Search } from 'lucide-react';
import { TASK_PRIORITIES, TASK_STATUSES } from '../../utils/constants';

const TaskFilters = ({ query, setQuery, priority, setPriority, statusFilter, setStatusFilter, showStatus = false }) => {
  return (
    <div className="card-static mb-5 flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          className="input pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Partial search by task heading (title)..."
        />
      </div>
      <div className="relative lg:max-w-[200px] lg:flex-1">
        <Filter className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <select className="input appearance-none pl-10" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">All Priorities</option>
          {TASK_PRIORITIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {showStatus ? (
        <div className="relative lg:max-w-[200px] lg:flex-1">
          <select className="input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            {TASK_STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </div>
  );
};

export default TaskFilters;
