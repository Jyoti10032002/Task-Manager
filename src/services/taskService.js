import apiClient from './apiClient';
import * as localStore from './taskLocalStorage';

let apiAvailable = null;

const checkApi = async () => {
  if (apiAvailable !== null) return apiAvailable;
  try {
    await apiClient.get('/tasks', { params: { _limit: 1 }, timeout: 2500 });
    apiAvailable = true;
  } catch {
    apiAvailable = false;
  }
  return apiAvailable;
};

const resetApiCheck = () => {
  apiAvailable = null;
};

export const getTasks = async (userId) => {
  const localTasks = localStore.getLocalTasks(userId);

  if (await checkApi()) {
    try {
      const response = await apiClient.get('/tasks', {
        params: { userId, _sort: 'createdAt', _order: 'desc' }
      });
      const remoteTasks = response.data || [];
      const merged = mergeTasks(localTasks, remoteTasks);
      localStore.setLocalTasks(userId, merged);
      return merged;
    } catch {
      apiAvailable = false;
    }
  }

  return localTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// Prefer newest version when IDs collide (local edits vs remote).
const mergeTasks = (localTasks, remoteTasks) => {
  const map = new Map();
  [...remoteTasks, ...localTasks].forEach((task) => map.set(task.id, task));
  return Array.from(map.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const createTask = async (task) => {
  const payload = {
    ...task,
    id: task.id || crypto.randomUUID(),
    createdAt: task.createdAt || new Date().toISOString()
  };

  localStore.addLocalTask(task.userId, payload);

  if (await checkApi()) {
    try {
      const response = await apiClient.post('/tasks', payload);
      localStore.updateLocalTask(task.userId, payload.id, response.data);
      return response.data;
    } catch {
      apiAvailable = false;
    }
  }

  return payload;
};

export const updateTask = async (userId, id, updates) => {
  const updated = localStore.updateLocalTask(userId, id, updates);

  if (await checkApi()) {
    try {
      const response = await apiClient.patch(`/tasks/${id}`, updates);
      localStore.updateLocalTask(userId, id, response.data);
      return response.data;
    } catch {
      apiAvailable = false;
      return updated;
    }
  }

  return updated;
};

export const deleteTask = async (userId, id) => {
  localStore.deleteLocalTask(userId, id);

  if (await checkApi()) {
    try {
      await apiClient.delete(`/tasks/${id}`);
    } catch {
      apiAvailable = false;
    }
  }

  return id;
};

export const isUsingLocalFallback = async () => !(await checkApi());

export const refreshApiConnection = () => {
  resetApiCheck();
};
