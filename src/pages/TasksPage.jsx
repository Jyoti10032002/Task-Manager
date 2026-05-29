import { Plus } from 'lucide-react';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import PageHeader from '../components/common/PageHeader';
import Spinner from '../components/common/Spinner';
import StorageNotice from '../components/common/StorageNotice';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskList from '../components/tasks/TaskList';
import TaskModal from '../components/tasks/TaskModal';
import { useTaskManager } from '../hooks/useTaskManager';

const TasksPage = () => {
  const {
    loading,
    saving,
    error,
    usingLocal,
    modalOpen,
    editingTask,
    deleteTarget,
    setDeleteTarget,
    query,
    setQuery,
    priority,
    setPriority,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    setDraggedTaskId,
    titleSearch,
    paginatedTasks,
    filteredTasks,
    totalPages,
    openCreateModal,
    openEditModal,
    closeModal,
    handleSaveTask,
    handleDelete,
    handleToggleComplete,
    handleStatusChange,
    handleDragDrop
  } = useTaskManager({ mode: 'active' });

  if (loading) return <Spinner fullScreen />;

  return (
    <section>
      <PageHeader
        title="Tasks"
        subtitle={`${filteredTasks.length} active task${filteredTasks.length === 1 ? '' : 's'} to manage`}
        action={
          <button className="btn btn-primary" onClick={openCreateModal}>
            <Plus className="h-4 w-4" /> Add Task
          </button>
        }
      />

      <StorageNotice usingLocal={usingLocal} />

      <TaskFilters
        query={query}
        setQuery={setQuery}
        priority={priority}
        setPriority={setPriority}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        showStatus
      />

      {error ? <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:bg-rose-950/40">{error}</p> : null}

      {query.trim() && filteredTasks.length === 0 ? (
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          No tasks match heading &quot;{query.trim()}&quot;. Try a different partial search.
        </p>
      ) : null}

      {paginatedTasks.length === 0 ? (
        <EmptyState
          title={query.trim() ? 'No matching tasks' : 'No active tasks'}
          description={
            query.trim()
              ? `No task headings contain "${query.trim()}".`
              : 'Create a new task to get started, or check the Completed page.'
          }
          action={
            <button className="btn btn-primary" onClick={openCreateModal}>
              <Plus className="h-4 w-4" /> Create Task
            </button>
          }
        />
      ) : (
        <TaskList
          tasks={paginatedTasks}
          searchQuery={titleSearch}
          onEdit={openEditModal}
          onDelete={setDeleteTarget}
          onToggleComplete={handleToggleComplete}
          onStatusChange={handleStatusChange}
          onDragStart={setDraggedTaskId}
          onDrop={handleDragDrop}
        />
      )}

      {filteredTasks.length > 0 ? (
        <div className="mt-6 flex items-center justify-end gap-2 rounded-xl border border-slate-200/60 bg-white/60 p-2 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/60">
          <button className="btn btn-ghost !py-2" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Prev
          </button>
          <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-ghost !py-2"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      ) : null}

      <TaskModal
        open={modalOpen}
        initialTask={editingTask}
        onClose={closeModal}
        onSubmit={handleSaveTask}
        isSubmitting={saving}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete task?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={saving}
      />
    </section>
  );
};

export default TasksPage;
