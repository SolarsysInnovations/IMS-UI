import React from 'react';
import { linkFields } from '../../../constants/form-data/form-data-json';
import { linkInitialValues } from '../../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { linkValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { LinkFormProps } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { useSnackbarNotifications } from '../../../hooks/useSnackbarNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPortalLink, updatePortalLink } from '../../../api/services';

const PortalLinkCreate = ({ linkValue, handleClose }: LinkFormProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addLinkMutation = useMutation({
    mutationFn: addPortalLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPortalList'] });
      handleClose();
    },
  });

  const updateLinkMutation = useMutation({
    mutationFn: updatePortalLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPortalList'] });
      handleClose();
    },
  });

  const isSuccess = addLinkMutation.isSuccess;
  const isError = addLinkMutation.isError;

  const initialValue = linkValue || linkInitialValues;

  const handleBackClick = () => {
    handleClose();
    navigate(0);
  };

  const updateFormValue = (setFieldValue: Function) => {};

  useSnackbarNotifications({
    error: isError,
    errorMessage: 'Error creating Link',
    success: isSuccess,
    successMessage: linkValue
      ? 'Link updated successfully'
      : 'Link created successfully',
  });

  const onSubmit = async (values: LinkFormProps, actions: any) => {
    try {
      if (linkValue) {
        updateLinkMutation.mutate({ id: linkValue.id, data: values });
      } else {
        addLinkMutation.mutate(values);
      }
      if (isSuccess) {
        actions.resetForm();
      }
    } catch (error) {
      console.error('An error occurred during form submission:', error);
    }
  };

  return (
    <DynamicFormCreate
      headerName="New Link"
      updateFormValue={updateFormValue}
      showTable={true}
      fields={linkFields}
      initialValues={initialValue || []}
      validationSchema={linkValidationSchema}
      onSubmit={onSubmit}
      buttons={[
        { label: 'Back', onClick: handleBackClick },
        { label: 'Save', onClick: onSubmit },
      ]}
    />
  );
};

export default PortalLinkCreate;
