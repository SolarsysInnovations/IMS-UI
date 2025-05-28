import React, { useMemo } from 'react';
import {
  CompanyEditFields,
  CompanyFields,
} from '../../constants/form-data/form-data-json';
import { setData } from '../../redux-store/global/globalState';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { useNavigate } from 'react-router-dom';
import { superAdminCompanyUsersInitialValues } from '../../constants/forms/formikInitialValues';
import {
  companyDetailsValidationSchema,
  editCompanyDetailsValidationSchema,
} from '../../constants/forms/validations/validationSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompany, updateCompany } from '../../api/services';

interface CompanyValueProps {
  companyEditInitialValues: any;
  mode: 'create' | 'edit';
}

const CompanyCreate = ({
  companyEditInitialValues,
  mode,
}: CompanyValueProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const initialValues =
    mode === 'edit'
      ? companyEditInitialValues
      : superAdminCompanyUsersInitialValues;

  const fields = useMemo(() => {
    if (mode === 'create') {
      return CompanyFields;
    } else {
      const editedFields = CompanyEditFields.map((section) => ({
        ...section,
        subFields:
          section.subFields?.filter((field) => field.name !== 'password') || [],
      }));
      return editedFields;
    }
  }, [mode]);

  const createCompanyMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCompanyList'] });
      navigate(-1);
    },
  });

  const updateCompanyMutation = useMutation({
    mutationFn: updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCompanyList'] });
      navigate(-1);
    },
  });

  const isSuccess =
    updateCompanyMutation.isSuccess || createCompanyMutation.isSuccess;
  const isError =
    updateCompanyMutation.isError || createCompanyMutation.isError;

  useSnackbarNotifications({
    error: isError,
    errorMessage:
      mode === 'edit' ? 'Error updating Company' : 'Error creating Company',
    success: isSuccess,
    successMessage:
      mode === 'edit'
        ? 'Company updated successfully'
        : 'Company created successfully',
  });

  const onSubmit = async (values: any, actions: any) => {
    try {
      const transformedData = {
        userDetails: {
          userName: values.userName,
          userEmail: values.userEmail,
          password: values.password,
          userRole: values.userRole,
          userMobile: values.userMobile,
          description: values.description,
        },
        companyDetails: {
          companyName: values.companyName,
          companyAddress: values.companyAddress,
          companyState: values.companyState,
          companyCity: values.companyCity,
          companyCountry: values.companyCountry,
          companyEmail: values.companyEmail,
          companyPhone: values.companyPhone,
          companyWebsite: values.companyWebsite,
          companyTaxNumber: values.companyTaxNumber,
          companyRegNumber: values.companyRegNumber,
          customerLimit: values.customerLimit,
          invoiceLimit: values.invoiceLimit,
          userLimit: values.userLimit,
          serviceLimit: values.serviceLimit,
        },
      };

      if (mode === 'edit' && companyEditInitialValues?.id) {
        updateCompanyMutation.mutate({
          id: companyEditInitialValues.id,
          data: transformedData,
        });
      } else {
        createCompanyMutation.mutate(transformedData);
      }
      if (isSuccess) {
        actions.resetForm();
      }
    } catch (error) {
      console.error('Error during form submission:', error); // Debugging
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div style={{ maxHeight: '90vh', overflowY: 'auto', paddingRight: '1rem' }}>
      <DynamicFormCreate
        setData={setData}
        headerName={mode === 'edit' ? 'Company Edit' : 'Company Create'}
        showTable={true}
        fields={fields}
        initialValues={initialValues}
        validationSchema={
          mode === 'edit'
            ? editCompanyDetailsValidationSchema
            : companyDetailsValidationSchema
        }
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default CompanyCreate;
