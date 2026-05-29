import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as taskService from '../services/taskService';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [usingLocal, setUsingLocal] = useState(false);

  const fetchTasks = useCallback(async (userId) => {
    if (!userId) return;
    setLoading(true);
    setError('');
    try {
      taskService.refreshApiConnection();
      const data = await taskService.getTasks(userId);
      setTasks(data);
      const localOnly = await taskService.isUsingLocalFallback();
      setUsingLocal(localOnly);
    } catch {
      setError('Unable to load tasks. Please refresh the page.');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (task) => {
    setSaving(true);
    try {
      const created = await taskService.createTask(task);
      setTasks((prev) => [created, ...prev.filter((item) => item.id !== created.id)]);
      return created;
    } finally {
      setSaving(false);
    }
  }, []);

  const editTask = useCallback(async (userId, id, updates) => {
    setSaving(true);
    try {
      const updated = await taskService.updateTask(userId, id, updates);
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updated } : task)));
      return updated;
    } finally {
      setSaving(false);
    }
  }, []);

  const removeTask = useCallback(async (userId, id) => {
    setSaving(true);
    try {
      await taskService.deleteTask(userId, id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } finally {
      setSaving(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      loading,
      saving,
      error,
      usingLocal,
      fetchTasks,
      addTask,
      editTask,
      removeTask
    }),
    [tasks, loading, saving, error, usingLocal, fetchTasks, addTask, editTask, removeTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used inside TaskProvider');
  return context;
};
