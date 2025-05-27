import React, { useMemo } from 'react';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { AdminCompanyUsersInitialValueProps } from '../../types/types';
import {
  EditRoleValidationSchema,
  RoleValidationSchema,
} from '../../constants/forms/validations/validationSchema';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import {
  RolesEditFields,
  RolesFields,
} from '../../constants/form-data/form-data-json';
import { RoleInitialValue } from '../../constants/forms/formikInitialValues';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, updateUser } from '../../api/services';

interface UserValueProps {
  userEditValue?: any;
  mode: 'create' | 'edit';
  onClose: () => void;
}

const UserForm = ({ userEditValue, mode, onClose }: UserValueProps) => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ['usersList'] });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ['usersList'] });
    },
  });

  const isSuccess = createUserMutation.isSuccess;
  const isError = createUserMutation.isError;

  // Setting initial values
  const initialValues =
    mode === 'edit' && userEditValue ? userEditValue : RoleInitialValue;

  // Snackbar Notifications
  useSnackbarNotifications({
    error: isError,
    errorMessage: 'Error creating user',
    success: isSuccess,
    successMessage:
      mode === 'edit'
        ? 'User updated successfully'
        : 'User created successfully',
  });

  // Form submission handler
  const onSubmit = useMemo(() => {
    return async (values: AdminCompanyUsersInitialValueProps, actions: any) => {
      console.log('Form submitted with values:', values);
      try {
        if (mode === 'edit' && userEditValue) {
          console.log(values.id);
          if (values.id) {
            updateUserMutation.mutate({
              id: values.id,
              data: { userDetails: values },
            });
          }
        } else {
          createUserMutation.mutate({ userDetails: values });
        }
        actions.resetForm();
      } catch (error) {
        console.error('Error during form submission:', error);
      } finally {
        actions.setSubmitting(false);
      }
    };
  }, [userEditValue, mode]);

  return (
    <DynamicFormCreate
      showTable={true}
      headerName={mode === 'create' ? 'User Create' : 'User Edit'}
      fields={mode === 'create' ? RolesFields : RolesEditFields}
      initialValues={initialValues}
      validationSchema={
        mode === 'edit' ? EditRoleValidationSchema : RoleValidationSchema
      }
      onSubmit={onSubmit}
    />
  );
};

export default UserForm;
