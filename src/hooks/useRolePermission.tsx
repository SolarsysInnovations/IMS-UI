import { useSelector } from 'react-redux';
import { selectUserRole } from '../redux-store/auth/authSlice';
import { applicationUserAccess } from '../constants/data';
import { Roles } from '../constants/Enums';

export const useRolePermissions = () => {
    const userRole = useSelector(selectUserRole) as Roles;

    // Fetch role permissions from the applicationUserAccess
    const rolePermissions = applicationUserAccess[userRole] || {};

    return rolePermissions;
};
