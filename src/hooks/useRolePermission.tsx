import { useSelector } from 'react-redux';
import { selectCurrentId } from '../redux-store/auth/authSlice';
import { applicationUserAccess } from '../constants/data';
import { Roles } from '../constants/Enums';
import { useGetUserRoleMutation } from '../redux-store/api/injectedApis';
import { useEffect, useState } from 'react';

export const useRolePermissions = () => {
    const id = useSelector(selectCurrentId);
    const [getUserRole, { data: userRoleData, isLoading, error }] = useGetUserRoleMutation();
    const [userRole, setUserRole] = useState<Roles | undefined>(undefined);

    // Trigger the API to fetch user role if needed
    useEffect(() => {
        if (id) {
            getUserRole(id); // Assuming `id` is the user identifier
        }
    }, [id, getUserRole]);

    useEffect(() => {
        if (userRoleData) {
            console.log("Fetched User Role Data:", userRoleData);
            setUserRole(userRoleData.userRole); // Access 'userRole' instead of 'role'
        }
    }, [userRoleData]);

    // Log error if any
    useEffect(() => {
        if (error) {
            console.error("Error fetching user role:", error);
        }
    }, [error]);

    console.log("USER ROLEEE", userRole);

    // Ensure userRole is always a valid key for applicationUserAccess
    const finalUserRole = userRole ?? Roles.GUEST; // Use Roles.GUEST if userRole is undefined
    console.log("Final User Role:", finalUserRole);

    // Fetch role permissions from the applicationUserAccess
    const rolePermissions = applicationUserAccess[finalUserRole] || {};

    return rolePermissions;
};
