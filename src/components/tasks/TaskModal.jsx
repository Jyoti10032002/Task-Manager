import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import { TASK_PRIORITIES, TASK_STATUSES } from '../../utils/constants';
import { validateTask } from '../../utils/validators';

const defaultForm = {
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: '',
  status: 'Pending'
};

const TaskModal = ({ open, initialTask, onClose, onSubmit, isSubmitting = false }) => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(initialTask ? { ...initialTask } : defaultForm);
      setErrors({});
    }
  }, [initialTask, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateTask(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const { id, userId, createdAt, ...payload } = form;
    onSubmit(payload);
  };

  return (
    <Modal isOpen={open} title={initialTask ? 'Edit Task' : 'Create Task'} onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-semibold">Title</label>
          <input className="input" name="title" value={form.title} onChange={handleChange} placeholder="Enter task title" />
          {errors.title ? <p className="mt-1 text-xs text-rose-500">{errors.title}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Description</label>
          <textarea
            className="input min-h-24"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe what needs to be done"
          />
          {errors.description ? <p className="mt-1 text-xs text-rose-500">{errors.description}</p> : null}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label>
            <span className="mb-1 block text-sm font-semibold">Priority</span>
            <select className="input" name="priority" value={form.priority} onChange={handleChange}>
              {TASK_PRIORITIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">Due Date</span>
            <input className="input" type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
            {errors.dueDate ? <p className="mt-1 text-xs text-rose-500">{errors.dueDate}</p> : null}
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">Status</span>
            <select className="input" name="status" value={form.status} onChange={handleChange}>
              {TASK_STATUSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : initialTask ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
