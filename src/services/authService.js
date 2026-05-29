import { validateEmail, validatePassword } from '../utils/validators';

const USERS_KEY = 'taskflow_users';

const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

const getUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(USERS_KEY);
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const normalizeEmail = (email) => email?.trim().toLowerCase() || '';

export const registerUser = async ({ name, email, password }) => {
  const trimmedName = name?.trim();
  const normalizedEmail = normalizeEmail(email);
  const pwd = password ?? '';

  if (!trimmedName) throw new Error('Name is required');
  if (!normalizedEmail) throw new Error('Email is required');
  if (!validateEmail(normalizedEmail)) throw new Error('Please enter a valid email');

  const passwordError = validatePassword(pwd);
  if (passwordError) throw new Error(passwordError);

  const users = getUsers();
  const exists = users.find((user) => normalizeEmail(user.email) === normalizedEmail);
  if (exists) throw new Error('Account already exists for this email');

  const user = {
    id: generateId(),
    name: trimmedName,
    email: normalizedEmail,
    password: pwd
  };

  saveUsers([...users, user]);
  return { id: user.id, name: user.name, email: user.email };
};

export const loginUser = async ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const pwd = password ?? '';

  if (!normalizedEmail) throw new Error('Email is required');
  if (!pwd) throw new Error('Password is required');
  if (!validateEmail(normalizedEmail)) throw new Error('Please enter a valid email');

  const users = getUsers();
  const user = users.find(
    (item) => normalizeEmail(item.email) === normalizedEmail && item.password === pwd
  );

  if (!user) {
    throw new Error('Invalid email or password. Please register if you do not have an account.');
  }

  return { id: user.id, name: user.name, email: user.email };
};
