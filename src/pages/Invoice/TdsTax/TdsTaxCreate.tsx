import React, { useMemo } from 'react';
import { tdsTaxInitialValue } from '../../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { tdsTaxValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { TdsTaxFields } from '../../../constants/form-data/form-data-json';
import { TdsTaxFormProps, TdsTaxProps } from '../../../types/types';
import { Save } from '@mui/icons-material';
import { useSnackbarNotifications } from '../../../hooks/useSnackbarNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTdsTax, updateTdsTax } from '../../../api/services';
import { useTaxConfigContext } from '../../../context/taxConfigContext';

interface TdsTaxCreateProps extends TdsTaxFormProps {
  mode: string;
  onClose: () => void;
}

const TdsTaxCreate = ({ tdsTaxValue, onClose, mode }: TdsTaxCreateProps) => {
  const queryClient = useQueryClient();
  const context = useTaxConfigContext();

  const createTdsTaxMutation = useMutation({
    mutationFn: createTdsTax,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTdsTaxList'] });
      context.tdsTaxConfig.setTdsTaxData(tdsTaxInitialValue);
    },
  });

  const updateTdsTaxMutation = useMutation({
    mutationFn: updateTdsTax,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTdsTaxList'] });
      context.tdsTaxConfig.setTdsTaxData(tdsTaxInitialValue);
      context.setMode('create');
    },
  });

  const isSuccess =
    updateTdsTaxMutation.isSuccess || createTdsTaxMutation.isSuccess;
  const isError = updateTdsTaxMutation.isError || createTdsTaxMutation.isError;

  const initialValue = mode === 'edit' ? tdsTaxValue : tdsTaxInitialValue;

  const onSubmit = useMemo(
    () => async (values: TdsTaxProps, actions: any) => {
      try {
        if (mode === 'edit' && tdsTaxValue) {
          if (tdsTaxValue.id) {
            updateTdsTaxMutation.mutate({
              id: tdsTaxValue.id,
              payload: values,
            });
          }
        } else {
          createTdsTaxMutation.mutate({
            taxName: values.taxName,
            taxPercentage: values.taxPercentage,
          });
        }
        if (isSuccess) {
          actions.resetForm();
        }
        onClose();
      } catch (error) {
        console.error('An error occurred during form submission:', error);
      } finally {
        actions.setSubmitting(false);
      }
    },
    [tdsTaxValue, isSuccess, mode],
  );

  useSnackbarNotifications({
    error: isError,
    errorMessage:
      mode === 'edit' ? 'Error updating Tds Tax' : 'Error creating Tds Tax',
    success: isSuccess,
    successMessage:
      mode === 'edit'
        ? 'Tds Tax update successfully'
        : 'Tds Tax created successfully',
  });

  return (
    <div>
      <DynamicFormCreate
        headerName={tdsTaxValue ? 'Edit Tds Tax ' : 'Create Tds Tax'}
        showTable={true}
        fields={TdsTaxFields}
        initialValues={initialValue}
        validationSchema={tdsTaxValidationSchema}
        onSubmit={onSubmit}
        buttons={[{ label: 'Save', icon: Save, onClick: onSubmit }]}
      />
    </div>
  );
};

export default TdsTaxCreate;
