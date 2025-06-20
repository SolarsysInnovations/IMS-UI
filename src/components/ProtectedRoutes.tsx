import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useInVoiceContext } from '../context/invoiceContext';
import { Roles } from '../constants/Enums';
import { ACCESS_TOKEN } from '../constants/data';

interface ProtectedRoutesProps {
  children: ReactElement;
  requiredRole: Roles[];
}

const ProtectedRoutes = ({ children, requiredRole }: ProtectedRoutesProps) => {
  const context = useInVoiceContext();
  const userRole = context.userDetails.userRole;
  let token = sessionStorage.getItem(ACCESS_TOKEN);

  if (!token) return <Navigate to="/" replace />;
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
