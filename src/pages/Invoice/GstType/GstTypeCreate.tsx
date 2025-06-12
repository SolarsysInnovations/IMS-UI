import React, { useMemo } from 'react';
import { GstTypeFields } from '../../../constants/form-data/form-data-json';
import { gstTypeInitialValue } from '../../../constants/forms/formikInitialValues';
import { gstTypeValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { GstTypeFormProps, GstTypeProps } from '../../../types/types';
import { Save } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGstType, updateGstType } from '../../../api/services';
import { useTaxConfigContext } from '../../../context/taxConfigContext';

const GstTypeForm = ({ gstTypeValue, mode }: GstTypeFormProps) => {
  const queryClient = useQueryClient();
  const context = useTaxConfigContext();

  const createGstTypeMutation = useMutation({
    mutationFn: createGstType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getGstTypeList'] });
      context.gstTypeConfig.setGstTypeData(gstTypeInitialValue);
    },
  });

  const updateGstTypeMutation = useMutation({
    mutationFn: updateGstType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getGstTypeList'] });
      context.gstTypeConfig.setGstTypeData(gstTypeInitialValue);
      context.setMode('create');
    },
  });

  const isSuccess =
    createGstTypeMutation.isSuccess || updateGstTypeMutation.isSuccess;

  const initialValues = mode === 'edit' ? gstTypeValue : gstTypeInitialValue;

  const onSubmit = useMemo(
    () => async (values: GstTypeProps, actions: any) => {
      try {
        if (mode === 'edit' && gstTypeValue) {
          if (gstTypeValue.id) {
            updateGstTypeMutation.mutate({ id: gstTypeValue.id, data: values });
          }
        } else {
          createGstTypeMutation.mutate({
            gstName: values.gstName,
            gstPercentage: values.gstPercentage,
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
    [gstTypeValue, isSuccess, mode],
  );

  return (
    <div>
      <DynamicFormCreate
        headerName={mode === 'edit' ? 'Edit GST Type' : 'Create GST Type'}
        showTable={true}
        fields={GstTypeFields}
        initialValues={initialValues}
        validationSchema={gstTypeValidationSchema}
        onSubmit={onSubmit}
        buttons={[{ label: 'Save', icon: Save, onClick: onSubmit }]}
      />
    </div>
  );
};

export default GstTypeForm;
