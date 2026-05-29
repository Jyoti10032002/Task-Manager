export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return '';
};

export const validateTask = (task) => {
  const errors = {};
  if (!task.title?.trim()) errors.title = 'Title is required';
  if (!task.description?.trim()) errors.description = 'Description is required';
  if (!task.dueDate) errors.dueDate = 'Due date is required';
  if (!task.priority) errors.priority = 'Priority is required';
  return errors;
};
