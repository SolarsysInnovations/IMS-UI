import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { settingsCompanyeditValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { CompanyFormProps } from '../../../types/types';
import { CompanyDetailsFields } from '../../../constants/form-data/form-data-json';
import { useSnackbarNotifications } from '../../../hooks/useSnackbarNotification';
import { superAdminCompanyUsersInitialValues } from '../../../constants/forms/formikInitialValues';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCompanyData, updateCompanyData } from '../../../api/services';

interface SettingsCompanyFormProps extends CompanyFormProps {
  handleCloseDialog: () => void;
}

const SettingsCompanyForm = ({
  companyValue,
  mode,
  handleCloseDialog,
}: SettingsCompanyFormProps) => {
  const queryClient = useQueryClient();

  const addCompanyMutation = useMutation({
    mutationFn: addCompanyData,
    onSuccess: () => {
      handleCloseDialog();
      queryClient.invalidateQueries({ queryKey: ['getCompanyData'] });
    },
  });

  const updateCompanyMutation = useMutation({
    mutationFn: updateCompanyData,
    onSuccess: () => {
      handleCloseDialog();
      queryClient.invalidateQueries({ queryKey: ['getCompanyData'] });
    },
  });

  const initialValue = companyValue || superAdminCompanyUsersInitialValues;
  const isError = updateCompanyMutation.isError || addCompanyMutation.isError;
  const isSuccess =
    updateCompanyMutation.isSuccess || addCompanyMutation.isSuccess;
  const fields = CompanyDetailsFields;

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

  const onSubmit = async (values: CompanyFormProps, actions: any) => {
    try {
      if (mode === 'edit' && companyValue.id) {
        updateCompanyMutation.mutate({ id: companyValue.id, data: values });
      } else {
        addCompanyMutation.mutate(values);
      }
      actions.resetForm();
    } catch (error) {
      console.error('An error occurred during form submission:', error);
      toast.error('Error occurred while saving fields.');
    }
  };

  const updateFormValue = (setFieldValue: Function) => {};

  return (
    <>
      <ToastContainer />

      <DynamicFormCreate
        showTable={true}
        headerName="Update your Company Information"
        updateFormValue={updateFormValue}
        fields={fields}
        initialValues={initialValue || []}
        validationSchema={settingsCompanyeditValidationSchema}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default SettingsCompanyForm;
