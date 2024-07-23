import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// components
import ProgressBar from "../components/ProgressBar";

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (isAuthenticated) {
    return <Navigate to='/app/myprofile' />;
  }

  if (!isInitialized) {
    return <ProgressBar />;
  }

  return <>{children}</>;
}