import React, { useEffect, useMemo } from 'react';
import * as Yup from 'yup'; 
import { RolesEditFields, RolesFields } from '../../constants/form-data/form-data-json';
import { RoleInitialValue } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { clearData } from '../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { useCreateUserMutation, useGetUsersListQuery, useUpdateUserMutation } from '../../redux-store/api/injectedApis';
import { AdminCompanyUsersInitialValueProps } from '../../types/types';

interface UserValueProps {
    userEditValue: any;
    mode: 'create' | 'edit';
};

const UserForm = ({ userEditValue, mode }: UserValueProps) => {

    const [addUser, { isSuccess: userAddSuccess, isError: userAddError, error: userAddErrorObject }] = useCreateUserMutation();

    const [updateUser, { isSuccess: userUpdateSuccess, isError: userUpdateError, error: userUpdateErrorObject }] = useUpdateUserMutation();

    const { data: userListData, refetch: userListRefetch } = useGetUsersListQuery();

    const dispatch = useDispatch<AppDispatch>();

    const initialValues = userEditValue || RoleInitialValue;
    const fields = mode === 'create' ? RolesFields : RolesEditFields;

    useSnackbarNotifications({
        error: userAddError,
        errorObject: userAddErrorObject,
        errorMessage: 'Error creating Company',
        success: userAddSuccess,
        successMessage: 'User created successfully',
    });

    useSnackbarNotifications({
        error: userUpdateError,
        errorObject: userUpdateErrorObject,
        errorMessage: 'Error updating Company',
        success: userUpdateSuccess,
        successMessage: 'User updated successfully',
    });

    useEffect(() => {
        userListRefetch();
    }, [userAddSuccess, userUpdateSuccess, userListRefetch]);

    const onSubmit = useMemo(() => async (values: AdminCompanyUsersInitialValueProps, actions: any) => {
        try {
            const id = values.id;
            if (mode === 'edit' && userEditValue) {
                const userPayload = {
                    userDetails: {
                        userName: values.userName,
                        userEmail: values.userEmail,
                        userRole: values.userRole,
                        userMobile: values.userMobile,
                        description: values.description,
                    }
                };
                await updateUser({ id: id, data: userPayload });
            } else {
                const userPayload = {
                    userDetails: {
                        userName: values.userName,
                        userEmail: values.userEmail,
                        password: values.password,
                        userRole: values.userRole,
                        userMobile: values.userMobile,
                        description: values.description,
                    }
                };
                await addUser(userPayload);
            }
            dispatch(clearData());
            actions.resetForm();
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [updateUser, dispatch, addUser, userEditValue, mode]);
    const RoleValidationSchema = Yup.object().shape({
        userName: Yup.string().required('Username is required'),
        userEmail: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        userRole: Yup.string().required('User role is required'),
        userMobile: Yup.string().required('Mobile number is required'),
        description: Yup.string().required('Description is required'),
    });
    return (
        <>
           <DynamicFormCreate
                showTable={true}
                fields={fields}
                initialValues={initialValues}
                validationSchema={RoleValidationSchema}
                onSubmit={onSubmit}
            />
        </>
    );
};

export default UserForm;
