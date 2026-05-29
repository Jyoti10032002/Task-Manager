const storageKey = (userId) => `taskflow_tasks_${userId}`;

export const getLocalTasks = (userId) => {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const setLocalTasks = (userId, tasks) => {
  localStorage.setItem(storageKey(userId), JSON.stringify(tasks));
};

export const addLocalTask = (userId, task) => {
  const tasks = getLocalTasks(userId);
  const next = [task, ...tasks];
  setLocalTasks(userId, next);
  return task;
};

export const updateLocalTask = (userId, id, updates) => {
  const tasks = getLocalTasks(userId);
  const next = tasks.map((task) => (task.id === id ? { ...task, ...updates } : task));
  setLocalTasks(userId, next);
  return next.find((task) => task.id === id);
};

export const deleteLocalTask = (userId, id) => {
  const tasks = getLocalTasks(userId).filter((task) => task.id !== id);
  setLocalTasks(userId, tasks);
  return id;
};
