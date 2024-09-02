import React, { useEffect, useMemo, useState } from 'react';
import { GstTypeFields, paymentTermsFields } from '../../../constants/form-data/form-data-json';
import { gstTypeInitialValue, paymentTermsInitialValue } from '../../../constants/forms/formikInitialValues';
import { gstTypeValidationSchema, paymentTermsValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { GstTypeProps, PaymentTermsFormProps, PaymentTermsProps } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux-store/store';
import { Save } from '@mui/icons-material';
import { useSnackbarNotifications } from '../../../hooks/useSnackbarNotification';
import { useCreatePaymentTermsMutation, useGetPaymentTermsListQuery, useUpdatePaymentTermsMutation } from '../../../redux-store/api/injectedApis';
import { clearPaymentTermsData } from '../../../redux-store/slices/paymentTermsSlice';

// create and edit
const PaymentTermsForm = ({ paymentTermsValue }: PaymentTermsFormProps) => {

    const [addPaymentTerms, { isLoading: paymentTermsAddLoading, isSuccess: paymentTermsAddSuccess, isError: paymentTermsAddError, error: paymentTermsErrorObject }] = useCreatePaymentTermsMutation();

    const [updatePaymentTerms, { isLoading: paymentTermsLoading, isSuccess: paymentTermsUpdateSuccess, isError: paymentTermsUpdateError, error: paymentTermsUpdateErrorObject, }] = useUpdatePaymentTermsMutation();

    const dispatch = useDispatch<AppDispatch>();

    const { data: getPaymentTerms, refetch } = useGetPaymentTermsListQuery();

    const initialValues = paymentTermsValue || paymentTermsInitialValue;

    const onSubmit = useMemo(() => async (values: PaymentTermsProps, actions: any) => {
        try {
            if (paymentTermsValue) {
                await updatePaymentTerms({ id: paymentTermsValue.id, data: values });
            } else {
                await addPaymentTerms(values);
            }
            actions.resetForm();
            refetch();
            if (paymentTermsValue) {
                setTimeout(() => dispatch(clearPaymentTermsData()), 1000)
            }
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [addPaymentTerms, updatePaymentTerms, paymentTermsValue, refetch, dispatch]);

    // * --------- add paymentTerms ------------
    useSnackbarNotifications({
        error: paymentTermsAddError,
        errorObject: paymentTermsErrorObject,
        errorMessage: 'Error creating Payment Terms',
        success: paymentTermsAddSuccess,
        successMessage: 'Payment Terms created successfully',
    });

    // * --------- updating paymentTerms ------------
    useSnackbarNotifications({
        error: paymentTermsUpdateError,
        errorObject: paymentTermsUpdateErrorObject,
        errorMessage: 'Error updating Payment Terms',
        success: paymentTermsUpdateSuccess,
        successMessage: 'Payment Terms updated successfully',
    });

    return (
        <div>
            <DynamicFormCreate
                // toastMessage={isUpdateSuccess && paymentTermsValue ? 'Successfully Updated Payment Terms' : 'Successfully Created Payment Terms'}
                // isSuccessToast={isAddSuccess || isUpdateSuccess}
                headerName={paymentTermsValue ? 'Edit Payment Terms' : 'Create Payment Terms'}
                showTable={true}
                fields={paymentTermsFields}
                initialValues={initialValues}
                validationSchema={paymentTermsValidationSchema}
                onSubmit={onSubmit}
                buttons={[
                    { label: 'Save', icon: Save, onClick: onSubmit }
                ]}
            />
        </div>
    );
};

export default PaymentTermsForm;
