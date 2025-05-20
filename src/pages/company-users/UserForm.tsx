import React, { useEffect, useMemo } from 'react';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { clearData } from '../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '../../redux-store/api/injectedApis';
import { AdminCompanyUsersInitialValueProps } from '../../types/types';
import { RoleValidationSchema } from '../../constants/forms/validations/validationSchema';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import {
  RolesEditFields,
  RolesFields,
} from '../../constants/form-data/form-data-json';
import { RoleInitialValue } from '../../constants/forms/formikInitialValues';

interface UserValueProps {
  userEditValue: any;
  mode: 'create' | 'edit';
  onClose: () => void;
  refetchUserList: () => void;
}

const UserForm = ({
  userEditValue,
  mode,
  onClose,
  refetchUserList,
}: UserValueProps) => {
  const [
    addUser,
    {
      isSuccess: userAddSuccess,
      isError: userAddError,
      error: userAddErrorObject,
    },
  ] = useCreateUserMutation();
  const [
    updateUser,
    {
      isSuccess: userUpdateSuccess,
      isError: userUpdateError,
      error: userUpdateErrorObject,
    },
  ] = useUpdateUserMutation();
  const dispatch = useDispatch<AppDispatch>();

  // Setting initial values
  const initialValues =
    mode === 'edit' && userEditValue ? userEditValue : RoleInitialValue;

  // Snackbar Notifications
  useSnackbarNotifications({
    error: userAddError,
    errorObject: userAddErrorObject,
    errorMessage: 'Error creating user',
    success: userAddSuccess,
    successMessage: 'User created successfully',
  });

  useSnackbarNotifications({
    error: userUpdateError,
    errorObject: userUpdateErrorObject,
    errorMessage: 'Error updating user',
    success: userUpdateSuccess,
    successMessage: 'User updated successfully',
  });

  // Refetch data and close dialog on success
  useEffect(() => {
    if (userAddSuccess || userUpdateSuccess) {
      refetchUserList();
      onClose();
    }
  }, [userAddSuccess, userUpdateSuccess, refetchUserList, onClose]);

  // Form submission handler
  const onSubmit = useMemo(() => {
    return async (values: AdminCompanyUsersInitialValueProps, actions: any) => {
      try {
        if (mode === 'edit' && userEditValue) {
          await updateUser({ id: values.id, data: { userDetails: values } });
        } else {
          await addUser({ userDetails: values });
        }
        dispatch(clearData());
        actions.resetForm();
      } catch (error) {
        console.error('Error during form submission:', error);
      } finally {
        actions.setSubmitting(false);
      }
    };
  }, [updateUser, addUser, userEditValue, mode, dispatch]);

  return (
    <DynamicFormCreate
      showTable={true}
      headerName={mode === 'create' ? 'User Create' : 'User Edit'}
      fields={mode === 'create' ? RolesFields : RolesEditFields}
      initialValues={initialValues}
      validationSchema={RoleValidationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default UserForm;
