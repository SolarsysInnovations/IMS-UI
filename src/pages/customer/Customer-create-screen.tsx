import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { customerFields } from '../../constants/form-data/form-data-json';
import { customerInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { DyCreateCustomerProps } from '../../types/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import {
  useCreateCustomerMutation,
  useGetCustomersListQuery,
  useUpdateCustomerMutation,
} from '../../redux-store/api/injectedApis';
import { clearCustomerData } from '../../redux-store/slices/customerSlice';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';

interface CustomerValueProps {
  customerEditInitialValues: any;
}

const CustomerCreate = ({ customerEditInitialValues }: CustomerValueProps) => {
  const navigate = useNavigate();
  const [
    addCustomer,
    {
      isLoading: customerAddLoading,
      isSuccess: customerAddSuccess,
      isError: customerAddError,
      error: customerAddErrorObject,
    },
  ] = useCreateCustomerMutation();
  const [
    updateCustomer,
    {
      isLoading: customerUpdateLoading,
      isSuccess: customerUpdateSuccess,
      isError: customerUpdateError,
      error: customerUpdateErrorObject,
    },
  ] = useUpdateCustomerMutation();
  const { refetch } = useGetCustomersListQuery();
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<any>();

  useSnackbarNotifications({
    error: customerAddError,
    errorObject: customerAddErrorObject,
    errorMessage: 'Error creating Customer',
    success: customerAddSuccess,
    successMessage: 'Customer created successfully',
  });

  useSnackbarNotifications({
    error: customerUpdateError,
    errorObject: customerUpdateErrorObject,
    errorMessage: 'Error updating Customer',
    success: customerUpdateSuccess,
    successMessage: 'Customer updated successfully',
  });

  useEffect(() => {
    if (customerAddSuccess || customerUpdateSuccess) {
      refetch();
      navigate(-1); // Navigate back to the previous page
    }
  }, [customerAddSuccess, customerUpdateSuccess, refetch, navigate]);

  const initialValues = customerEditInitialValues ?? customerInitialValues;

  const onSubmit = useMemo(
    () => async (values: DyCreateCustomerProps, actions: any) => {
      try {
        if (customerEditInitialValues) {
          const id: number = values?.id;
          await updateCustomer({ id: id, data: values }).unwrap();
          dispatch(clearCustomerData());
        } else {
          await addCustomer(values).unwrap();
          dispatch(clearCustomerData());
        }
        actions.resetForm();
      } catch (error) {
        console.error('Error during submission:', error);
      } finally {
        actions.setSubmitting(false);
      }
    },
    [addCustomer, updateCustomer, customerEditInitialValues, dispatch],
  );

  return (
    <DynamicFormCreate
      setData={setData}
      showTable={true}
      fields={customerFields}
      initialValues={initialValues}
      validationSchema={customerValidationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default CustomerCreate;
