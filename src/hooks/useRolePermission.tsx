import { applicationUserAccess } from '../constants/data';
import { Roles } from '../constants/Enums';
import { useInVoiceContext } from '../invoiceContext/invoiceContext';

export const useRolePermissions = () => {
  const context = useInVoiceContext();
  const userRole = context.userDetails.userRole;

  const finalUserRole = Roles[userRole] ?? Roles.GUEST;

  const rolePermissions = applicationUserAccess[finalUserRole] ?? {};

  return rolePermissions;
};
