import React, { useMemo } from 'react';
import { paymentTermsFields } from '../../../constants/form-data/form-data-json';
import { paymentTermsInitialValue } from '../../../constants/forms/formikInitialValues';
import { paymentTermsValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { PaymentTermsFormProps, PaymentTermsProps } from '../../../types/types';
import { Save } from '@mui/icons-material';
import { useSnackbarNotifications } from '../../../hooks/useSnackbarNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPaymentTerms, updatePaymentTerms } from '../../../api/services';
import { useTaxConfigContext } from '../../../context/taxConfigContext';

// create and edit
const PaymentTermsForm = ({
  paymentTermsValue,
  mode,
}: PaymentTermsFormProps) => {
  const context = useTaxConfigContext();
  const queryClient = useQueryClient();

  const createPaymentTermsMutation = useMutation({
    mutationFn: createPaymentTerms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPaymentTerms'] });
      context.paymentTermsConfig.setPaymentTermsData(paymentTermsInitialValue);
    },
  });

  const updatePaymentTermsMutation = useMutation({
    mutationFn: updatePaymentTerms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPaymentTerms'] });
      context.paymentTermsConfig.setPaymentTermsData(paymentTermsInitialValue);
      context.setMode('create');
    },
  });

  const isSuccess =
    createPaymentTermsMutation.isSuccess ||
    updatePaymentTermsMutation.isSuccess;
  const isError =
    createPaymentTermsMutation.isError || updatePaymentTermsMutation.isError;

  const initialValues =
    mode === 'edit' ? paymentTermsValue : paymentTermsInitialValue;

  const onSubmit = useMemo(
    () => async (values: PaymentTermsProps, actions: any) => {
      try {
        if (mode === 'edit' && paymentTermsValue) {
          if (paymentTermsValue.id) {
            updatePaymentTermsMutation.mutate({
              id: paymentTermsValue.id,
              payload: values,
            });
          }
        } else {
          createPaymentTermsMutation.mutate({
            termName: values.termName,
            totalDays: values.totalDays,
          });
        }
        if (isSuccess) {
          actions.resetForm();
        }
      } catch (error) {
        console.error('An error occurred during form submission:', error);
      } finally {
        actions.setSubmitting(false);
      }
    },
    [paymentTermsValue, isSuccess, mode],
  );

  // * --------- add paymentTerms ------------
  useSnackbarNotifications({
    error: isError,
    errorMessage:
      mode === 'edit'
        ? 'Error updating Payment Terms'
        : 'Error creating Payment Terms',
    success: isSuccess,
    successMessage:
      mode === 'edit'
        ? 'Payment Terms updated successfully'
        : 'Payment Terms created successfully',
  });

  return (
    <div>
      <DynamicFormCreate
        headerName={
          mode === 'edit' ? 'Edit Payment Terms' : 'Create Payment Terms'
        }
        showTable={true}
        fields={paymentTermsFields}
        initialValues={initialValues}
        validationSchema={paymentTermsValidationSchema}
        onSubmit={onSubmit}
        buttons={[{ label: 'Save', icon: Save, onClick: onSubmit }]}
      />
    </div>
  );
};

export default PaymentTermsForm;
