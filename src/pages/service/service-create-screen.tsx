import React from 'react';
import { serviceFields } from '../../constants/form-data/form-data-json';
import { serviceInitialValues as defaultServiceInitialValues } from '../../constants/forms/formikInitialValues'; // Rename to avoid conflict
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import { serviceCreationProps } from '../../types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createService,
  getSingleService,
  updateService,
} from '../../api/services';

const ServiceCreate = ({ setOpenDialogBox, id }: any) => {
  const queryClient = useQueryClient();

  const { data: serviceData, isLoading: isServiceLoading } = useQuery({
    queryKey: ['getSingleService', id],
    queryFn: ({ queryKey }) => {
      const serviceId = queryKey[1];
      if (!serviceId) throw new Error('Service ID is undefined');
      return getSingleService(serviceId);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const createServiceMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      setOpenDialogBox(false);
      queryClient.invalidateQueries({ queryKey: ['getServiceList'] });
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      setOpenDialogBox(false);
      queryClient.invalidateQueries({ queryKey: ['getServiceList'] });
    },
  });
  const isSuccess = createServiceMutation.isSuccess;

  const initialValues = serviceData ?? defaultServiceInitialValues;

  const onSubmit = async (values: serviceCreationProps, actions: any) => {
    try {
      if (serviceData) {
        updateServiceMutation.mutate({ id, payload: values });
      } else {
        createServiceMutation.mutate(values);
      }
      if (isSuccess) {
        actions.resetForm();
      }
    } catch (error: any) {
      console.error('An error occurred during form submission:', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (isServiceLoading) return <div>Loading...</div>;

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
