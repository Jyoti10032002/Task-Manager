export const formatDate = (dateString) => {
  if (!dateString) return '--';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const isOverdue = (dateString) => {
  if (!dateString) return false;
  const now = new Date();
  const due = new Date(dateString);
  return due < now;
};
