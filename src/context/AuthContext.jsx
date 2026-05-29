import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AUTH_KEY = 'taskflow_auth';

const readStoredUser = () => {
  try {
    const saved = localStorage.getItem(AUTH_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (!parsed?.id || !parsed?.email) return null;
    return parsed;
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(false);

  const persistUser = (profile) => {
    setUser(profile);
    localStorage.setItem(AUTH_KEY, JSON.stringify(profile));
  };

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const profile = await loginUser({
        email: credentials.email?.trim(),
        password: credentials.password
      });
      persistUser(profile);
      return profile;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    try {
      const profile = await registerUser({
        name: payload.name?.trim(),
        email: payload.email?.trim(),
        password: payload.password
      });
      persistUser(profile);
      return profile;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: Boolean(user?.id)
    }),
    [user, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
