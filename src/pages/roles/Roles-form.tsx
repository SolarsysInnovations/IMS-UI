import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { RoleInitialValue } from '../../constants/forms/formikInitialValues';
import { RoleValidationSchema } from '../../constants/forms/validations/validationSchema';
import { useAddRoleMutation, useUpdateRoleMutation, useGetRoleByIdMutation } from '../../redux-store/role/roleApi';
import { RoleInitialValueProps } from '../../types/types';
import { useDispatch } from 'react-redux';
import { Add, KeyboardBackspaceTwoTone, Save, VisibilityOff, VisibilityOutlined } from '@mui/icons-material';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { AppDispatch } from '../../redux-store/store';
import { clearData } from '../../redux-store/global/globalState';

interface RoleFormProps {
    RolesEditInitialValues: any;
    onClose: () => void;
    RolesFields: any;
    HeaderName: any;
}

const RoleForm: React.FC<RoleFormProps> = ({ RolesEditInitialValues,RolesFields,onClose,HeaderName }) => {
    const [addRole,{ isSuccess: addRoleSuccess, isError: addRoleError, error: addRoleErrorObject }] = useAddRoleMutation();
    const [updateRole,{ isSuccess: roleUpdateSuccess, isError: roleUpdateError, error: roleUpdateErrorObject }] = useUpdateRoleMutation();
    const [GetRoleById] = useGetRoleByIdMutation();
    const dispatch = useDispatch<AppDispatch>();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState<any>();

    useSnackbarNotifications({
        error: addRoleError,
        errorMessage: 'Error adding role',
        success: addRoleSuccess,
        successMessage: 'Role added successfully',
        errorObject: addRoleErrorObject,
    })

    useSnackbarNotifications({
        error: roleUpdateError,
        errorMessage: 'Error updating role',
        success: roleUpdateSuccess,
        successMessage: 'Role updated successfully',
        errorObject: roleUpdateErrorObject,
    })

    const initialValues = RolesEditInitialValues || RoleInitialValue;

    const onSubmit = useMemo(() => async (values: RoleInitialValueProps, actions: any) => {
        try {
            if (RolesEditInitialValues) {
                await updateRole({ id: values.id, roles: values });
                dispatch(clearData());
                actions.resetForm();
                onClose();
            } else {
                await addRole(values);
                dispatch(clearData());
                actions.resetForm();
                onClose();
             }
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [addRole, updateRole, RolesEditInitialValues, dispatch]);

    return (
            <DynamicFormCreate
                headerName={HeaderName}
                setData={setData}
                showTable={true}
                fields={RolesFields}
                initialValues={initialValues}
                validationSchema={RoleValidationSchema}
                onSubmit={onSubmit}
            />
    );
};

export default RoleForm;