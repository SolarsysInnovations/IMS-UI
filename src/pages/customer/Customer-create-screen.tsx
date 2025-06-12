import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerFields } from '../../constants/form-data/form-data-json';
import { customerInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { DyCreateCustomerProps } from '../../types/types';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomer, editCustomerDetails } from '../../api/services';

interface CustomerValueProps {
  customerEditInitialValues: any;
}

const CustomerCreate = ({ customerEditInitialValues }: CustomerValueProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createCustomerMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCustomerList'] });
      navigate(-1);
    },
  });

  const updateCustomerMutation = useMutation({
    mutationFn: editCustomerDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCustomerList'] });
      navigate(-1);
    },
  });

  const isSuccess =
    updateCustomerMutation.isSuccess || createCustomerMutation.isSuccess;

  const initialValues = customerEditInitialValues ?? customerInitialValues;

  const onSubmit = useMemo(
    () => async (values: DyCreateCustomerProps, actions: any) => {
      try {
        if (customerEditInitialValues) {
          const id: string = values?.id;
          updateCustomerMutation.mutate({ id, data: values });
        } else {
          createCustomerMutation.mutate(values);
        }
        if (isSuccess) {
          actions.resetForm();
        }
      } catch (error) {
        console.error('Error during submission:', error);
      } finally {
        actions.setSubmitting(false);
      }
    },
    [
      customerEditInitialValues,
      updateCustomerMutation,
      createCustomerMutation,
      isSuccess,
    ],
  );

  return (
    <DynamicFormCreate
      showTable={true}
      fields={customerFields}
      initialValues={initialValues}
      validationSchema={customerValidationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default CustomerCreate;
