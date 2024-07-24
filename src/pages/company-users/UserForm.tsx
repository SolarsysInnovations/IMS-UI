import React, { useEffect, useMemo, useState } from 'react';
import { useGetCompanyQuery, useAddCompanyMutation, useUpdateCompanyMutation } from '../../redux-store/company/companiesApi';
import { CompanyEditFields, CompanyFields, RolesEditFields, RolesFields } from '../../constants/form-data/form-data-json';
import { companyInitialValues, RoleInitialValue } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { companyValidationSchema, RoleValidationSchema } from '../../constants/forms/validations/validationSchema';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { clearData } from '../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { CompanyInitialValueProps } from '../../types/types';
import { useAddRoleMutation, useGetRoleQuery, useUpdateRoleMutation } from '../../redux-store/role/roleApi';

interface UserValueProps {
    userEditValue: any;
    mode: 'create' | 'edit';
};

const UserForm = ({ userEditValue, mode }: UserValueProps) => {

    const [addUser, { isSuccess: userAddSuccess, isError: userAddError, error: userAddErrorObject }] = useAddRoleMutation();

    const [updateUser, { isSuccess: userUpdateSuccess, isError: userUpdateError, error: userUpdateErrorObject }] = useUpdateRoleMutation();

    const { data: userListData, refetch: userListRefetch } = useGetRoleQuery();

    const dispatch = useDispatch<AppDispatch>();

    const initialValues = userEditValue || RoleInitialValue;
    const fields = mode === 'create' ? RolesFields : RolesEditFields;

    useSnackbarNotifications({
        error: userAddError,
        errorObject: userAddErrorObject,
        errorMessage: 'Error creating Company',
        success: userAddSuccess,
        successMessage: 'Company created successfully',
    });

    useSnackbarNotifications({
        error: userUpdateError,
        errorObject: userUpdateErrorObject,
        errorMessage: 'Error updating Company',
        success: userUpdateSuccess,
        successMessage: 'Company updated successfully',
    });

    useEffect(() => {
        userListRefetch();
    }, [userAddSuccess, userUpdateSuccess, userListRefetch]);

    const onSubmit = useMemo(() => async (values: CompanyInitialValueProps, actions: any) => {
        try {
            const id = values.id;
            if (mode === 'edit' && userEditValue) {
                await updateUser({ id: id, data: values });
            } else {
                const userPayload = {
                    userName: values.userName,
                    userEmail: values.userEmail,
                    password: values.password,
                    userRole: values.userRole,
                    userMobile: values.userMobile,
                    description: values.description,
                    companyName: values.companyName,
                }
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
