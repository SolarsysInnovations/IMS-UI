import React, { useEffect } from 'react';
import { serviceFields } from '../../constants/form-data/form-data-json';
import { serviceInitialValues as defaultServiceInitialValues } from '../../constants/forms/formikInitialValues'; // Rename to avoid conflict
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import {
  useCreateServiceMutation,
  useGetServiceListQuery,
  useUpdateServiceMutation,
} from '../../redux-store/api/injectedApis';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { clearServiceData } from '../../redux-store/slices/serviceSlice';
import { serviceCreationProps } from '../../types/types';

const ServiceCreate = ({ setOpenDialogBox }: any) => {
  const { refetch } = useGetServiceListQuery();
  const [
    addService,
    {
      isSuccess: serviceAddSuccess,
      isError: serviceAddError,
      error: serviceAddErrorObject,
    },
  ] = useCreateServiceMutation();
  const [
    updateService,
    {
      isSuccess: serviceUpdateSuccess,
      isError: serviceUpdateError,
      error: serviceUpdateErrorObject,
    },
  ] = useUpdateServiceMutation();

  const dispatch = useDispatch<AppDispatch>();

  const serviceEditInitialValues = useSelector(
    (state: any) => state.serviceState.data,
  );

  useSnackbarNotifications({
    error: serviceAddError || serviceUpdateError,
    errorObject: serviceAddErrorObject ?? serviceUpdateErrorObject,
    errorMessage: 'Error creating or updating Service',
    success: serviceAddSuccess || serviceUpdateSuccess,
    successMessage: serviceAddSuccess
      ? 'Service created successfully'
      : 'Service updated successfully',
  });

  useEffect(() => {
    refetch();
  }, [serviceUpdateSuccess, serviceAddSuccess, refetch]);

  const initialValues = serviceEditInitialValues ?? defaultServiceInitialValues;

  const onSubmit = async (values: serviceCreationProps, actions: any) => {
    try {
      if (serviceEditInitialValues) {
        const id = serviceEditInitialValues.id;
        if (!id) {
          alert('id not specified');
          return;
        }
        await updateService({ id, data: values }).unwrap();
        dispatch(clearServiceData());
        setOpenDialogBox(false);
        actions.resetForm();
      } else {
        await addService(values).unwrap();
        setOpenDialogBox(false);
        actions.resetForm();
      }
    } catch (error: any) {
      console.error('An error occurred during form submission:', error);
      if (error.data && error.data.message) {
        alert(`Error: ${error.data.message}`);
      } else if (error.message) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred');
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <DynamicFormCreate
      headerName="Create Service"
      showTable={true}
      fields={serviceFields}
      initialValues={initialValues}
      validationSchema={serviceValidationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default ServiceCreate;
