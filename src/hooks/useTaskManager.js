import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { useToast } from '../context/ToastContext';
import { PAGE_SIZE } from '../utils/constants';
import { matchesTitlePartial } from '../utils/search';
import { useDebounce } from './useDebounce';

/**
 * Shared task management logic for Tasks and Completed pages.
 */
export const useTaskManager = ({ mode = 'active' } = {}) => {
  const { user } = useAuth();
  const { tasks, loading, saving, error, usingLocal, fetchTasks, addTask, editTask, removeTask } =
    useTasks();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (user?.id) fetchTasks(user.id);
  }, [user?.id, fetchTasks]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, priority, statusFilter, mode]);

  const scopedTasks = useMemo(() => {
    if (mode === 'completed') {
      return tasks.filter((task) => task.status === 'Completed');
    }
    if (mode === 'active') {
      return tasks.filter((task) => task.status !== 'Completed');
    }
    return tasks;
  }, [tasks, mode]);

  const filteredTasks = useMemo(() => {
    return scopedTasks.filter((task) => {
      const matchesHeading = matchesTitlePartial(task.title, debouncedQuery);
      const matchesPriority = priority ? task.priority === priority : true;
      const matchesStatus = statusFilter ? task.status === statusFilter : true;
      return matchesHeading && matchesPriority && matchesStatus;
    });
  }, [scopedTasks, debouncedQuery, priority, statusFilter]);

  const paginatedTasks = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredTasks.slice(start, start + PAGE_SIZE);
  }, [filteredTasks, page]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE));

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = async (taskPayload) => {
    try {
      if (editingTask) {
        await editTask(user.id, editingTask.id, taskPayload);
        showToast('Task updated successfully', 'success');
      } else {
        await addTask({
          ...taskPayload,
          userId: user.id,
          createdAt: new Date().toISOString()
        });
        showToast('Task created successfully', 'success');
      }
      closeModal();
    } catch {
      showToast('Failed to save task', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await removeTask(user.id, deleteTarget.id);
      showToast('Task deleted', 'success');
      setDeleteTarget(null);
    } catch {
      showToast('Failed to delete task', 'error');
    }
  };

  const handleToggleComplete = async (task) => {
    const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      await editTask(user.id, task.id, { status: nextStatus });
      showToast(nextStatus === 'Completed' ? 'Task marked complete' : 'Task reopened', 'success');
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const handleStatusChange = async (task, status) => {
    if (task.status === status) return;
    try {
      await editTask(user.id, task.id, { status });
      showToast(`Status changed to ${status}`, 'info');
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDragDrop = async (targetTaskId) => {
    if (!draggedTaskId || draggedTaskId === targetTaskId) return;
    const draggedTask = tasks.find((task) => task.id === draggedTaskId);
    const targetTask = tasks.find((task) => task.id === targetTaskId);
    if (!draggedTask || !targetTask) return;

    try {
      await editTask(user.id, draggedTask.id, { status: targetTask.status });
      setDraggedTaskId(null);
      showToast('Task moved successfully', 'info');
    } catch {
      showToast('Failed to move task', 'error');
    }
  };

  return {
    user,
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
    draggedTaskId,
    setDraggedTaskId,
    titleSearch: debouncedQuery,
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
  };
};
