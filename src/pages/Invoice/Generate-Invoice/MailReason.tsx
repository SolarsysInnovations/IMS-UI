import React, { useMemo } from 'react';
import { InvoiceMailReasonProps } from '../../../types/types';
import { AppDispatch } from '../../../redux-store/store';
import { useDispatch } from 'react-redux';
import { clearData } from '../../../redux-store/global/globalState';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { InvoiceMailReasonFields } from '../../../constants/form-data/form-data-json';
import { InvoiceEmailReasonValidationSchemas } from '../../../constants/forms/validations/validationSchema';
import { invoiceMailReasonInitialValue } from '../../../constants/forms/formikInitialValues';
import { useSnackbarNotifications } from '../../../hooks/useSnackbarNotification';
import {
  useGetInvoiceListQuery,
  useUpdateInvoiceMutation,
} from '../../../redux-store/api/injectedApis';

// create and edit screen

const MailReason = ({ invoiceData, setNestedOpen }: any) => {
  const [
    updateInvoice,
    {
      isSuccess: invoiceUpdateSuccess,
      isError: invoiceUpdateError,
      error: invoiceUpdateErrorObject,
    },
  ] = useUpdateInvoiceMutation();

  const { refetch: getInvoiceList } = useGetInvoiceListQuery();

  useSnackbarNotifications({
    error: invoiceUpdateError,
    errorObject: invoiceUpdateErrorObject,
    errorMessage: 'Error updating Invoice',
    success: invoiceUpdateSuccess,
    successMessage: 'Invoice update successfully',
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = useMemo(
    () => async (values: InvoiceMailReasonProps, actions: any) => {
      try {
        if (invoiceData) {
          const updatedInvoice = {
            ...invoiceData,
            invoiceReason: values.reason,
            mailTo: values.toMail,
          };
          await updateInvoice({ id: invoiceData.id, data: updatedInvoice });
          setNestedOpen(false);
          dispatch(clearData());
          getInvoiceList();
        }
        actions.resetForm();
      } catch (error) {
        console.error('An error occurred during form submission:', error);
      } finally {
        actions.setSubmitting(false);
      }
    },
    [invoiceData, updateInvoice, dispatch],
  );

  return (
    <div>
      <DynamicFormCreate
        headerName="Send a Reason To Email"
        showTable={true}
        fields={InvoiceMailReasonFields}
        initialValues={invoiceMailReasonInitialValue}
        validationSchema={InvoiceEmailReasonValidationSchemas}
        onSubmit={onSubmit}
        buttons={[{ label: 'Send', onClick: onSubmit }]}
      />
    </div>
  );
};

export default MailReason;
