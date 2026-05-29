import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/** Redirects logged-in users away from login/register pages. */
const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default GuestRoute;
