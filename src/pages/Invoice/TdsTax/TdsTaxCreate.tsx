import React, { useEffect, useMemo } from 'react';
import { tdsTaxInitialValue } from '../../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { tdsTaxValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { TdsTaxFields } from '../../../constants/form-data/form-data-json';
import { TdsTaxFormProps, TdsTaxProps } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { Save } from '@mui/icons-material';
import { useSnackbarNotifications } from '../../../hooks/useSnackbarNotification';
import {
  useCreateTdsTaxMutation,
  useGetTdsTaxListQuery,
  useUpdateTdsTaxMutation,
} from '../../../redux-store/api/injectedApis';
import { clearTdsTaxData } from '../../../redux-store/slices/tdsSlice';

interface TdsTaxCreateProps extends TdsTaxFormProps {
  onClose: () => void;
}

const TdsTaxCreate = ({ tdsTaxValue, onClose }: TdsTaxCreateProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [
    addTdsTax,
    {
      isSuccess: tdsTaxAddSuccess,
      isError: tdsTaxAddError,
      error: tdsTaxAddErrorObject,
    },
  ] = useCreateTdsTaxMutation();

  const [
    updateTdsTax,
    {
      isSuccess: tdsTaxUpdateSuccess,
      isError: tdsTaxUpdateError,
      error: tdsTaxUpdateErrorObject,
    },
  ] = useUpdateTdsTaxMutation();

  const { refetch } = useGetTdsTaxListQuery();

  const initialValue = tdsTaxValue || tdsTaxInitialValue;

  useEffect(() => {
    refetch();
  }, [tdsTaxUpdateSuccess]);

  const onSubmit = useMemo(
    () => async (values: TdsTaxProps, actions: any) => {
      try {
        if (tdsTaxValue) {
          await updateTdsTax({ id: tdsTaxValue.id, data: values });
        } else {
          await addTdsTax(values);
        }
        actions.resetForm();
        refetch();
        dispatch(clearTdsTaxData());
        onClose(); // Call onClose to close the dialog
      } catch (error) {
        console.error('An error occurred during form submission:', error);
      } finally {
        actions.setSubmitting(false);
      }
    },
    [
      addTdsTax,
      updateTdsTax,
      tdsTaxValue,
      refetch,
      dispatch,
      tdsTaxAddSuccess,
      onClose,
    ],
  );

  // * ------ adding tds tax -------------------------
  useSnackbarNotifications({
    error: tdsTaxAddError,
    errorObject: tdsTaxAddErrorObject,
    errorMessage: 'Error creating Tds Tax',
    success: tdsTaxAddSuccess,
    successMessage: 'Tds Tax created successfully',
  });

  // * ------ updating tds tax ------------------------
  useSnackbarNotifications({
    error: tdsTaxUpdateError,
    errorObject: tdsTaxUpdateErrorObject,
    errorMessage: 'Error updating Tds Tax',
    success: tdsTaxUpdateSuccess,
    successMessage: 'Tds Tax update successfully',
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
