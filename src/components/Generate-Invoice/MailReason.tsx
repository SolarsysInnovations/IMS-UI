import React, { useEffect, useMemo } from 'react';
import { Add } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useAddGstTypeMutation, useGetGstTypeQuery, useUpdateGstTypeMutation } from '../../redux-store/invoice/gstTypeApi';
import { GstTypeFormProps, GstTypeProps, InvoiceMailReasonProps } from '../../types/types';
import { AppDispatch } from '../../redux-store/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearData } from '../../redux-store/global/globalState';
import { DynamicFormCreate } from '../Form-renderer/Dynamic-form';
import { GstTypeFields, InvoiceMailReasonFields } from '../../constants/form-data/form-data-json';
import { InvoiceEmailReasonValidationSchemas, gstTypeValidationSchema } from '../../constants/forms/validations/validationSchema';
import { invoiceMailReasonInitialValue } from '../../constants/forms/formikInitialValues';
import { useGetInvoiceQuery, useUpdateInvoiceMutation } from '../../redux-store/invoice/invcoiceApi';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';

// create and edit screen

const MailReason = ({ invoiceData }: any) => {

    const [updateInvoice, { isSuccess: invoiceUpdateSuccess, isError: invoiceUpdateError, error: invoiceUpdateErrorObject, isLoading: invoiceUpdateLoading }] = useUpdateInvoiceMutation();

    const navigate = useNavigate();

    const { data: invoiceList, error: errorInvoiceList, isLoading, refetch } = useGetInvoiceQuery();

    // const invoiceData = useSelector((state: any) => state.globalState.data);

    useSnackbarNotifications({
        error: invoiceUpdateError,
        errorObject: invoiceUpdateErrorObject,
        errorMessage: 'Error updating Invoice',
        success: invoiceUpdateSuccess,
        successMessage: 'Invoice update successfully',
    });

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = useMemo(() => async (values: InvoiceMailReasonProps, actions: any) => {
        try {
            if (invoiceData) {
                const updatedInvoice = {
                    ...invoiceData,
                    invoiceReason: values.reason,
                    mailTo: values.toMail,
                    // invoiceStatus: invoiceData.invoiceStatus
                }
                console.log("updatedInvoice", updatedInvoice);
                await updateInvoice({ id: invoiceData.id, invoiceData: updatedInvoice });
                dispatch(clearData());
            }
            actions.resetForm();
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [invoiceData, updateInvoice, dispatch]);

    return (
        <div>
            <DynamicFormCreate
                headerName="Send a Reason To Email"
                showTable={true}
                fields={InvoiceMailReasonFields}
                initialValues={invoiceMailReasonInitialValue || []}
                validationSchema={InvoiceEmailReasonValidationSchemas}
                onSubmit={onSubmit}
            // buttons={[
            //     { label: 'Back', onClick: () => navigate(-1) },
            //     { label: 'Send', onClick: () => { }, },
            // ]}
            />
        </div>
    );
};

export default MailReason;
