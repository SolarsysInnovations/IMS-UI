import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { useInVoiceContext } from '../context/invoiceContext';
import { Roles } from '../constants/Enums';

interface ProtectedRoutesProps {
  children: ReactElement;
  requiredRole: Roles[];
}

const ProtectedRoutes = ({ children, requiredRole }: ProtectedRoutesProps) => {
  const context = useInVoiceContext();
  const { isAuthenticated } = useAuthContext();
  const userRole = context.userDetails.userRole;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userRole !== Roles.GUEST) {
    if (
      requiredRole.length &&
      !requiredRole.includes(context.userDetails.userRole)
    ) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  return children;
};

export default ProtectedRoutes;
