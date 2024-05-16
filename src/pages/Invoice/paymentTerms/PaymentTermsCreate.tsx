import React, { useEffect, useMemo, useState } from 'react';
import { GstTypeFields, paymentTermsFields } from '../../../constants/form-data/form-data-json';
import { gstTypeInitialValue, paymentTermsInitialValue } from '../../../constants/forms/formikInitialValues';
import { gstTypeValidationSchema, paymentTermsValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { GstTypeProps, PaymentTermsFormProps, PaymentTermsProps } from '../../../types/types';
import { clearData } from '../../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux-store/store';
import { useAddPaymentTermsMutation, useGetPaymentTermsQuery, useUpdatePaymentTermsMutation } from '../../../redux-store/invoice/paymentTerms';


// create and edit

const PaymentTermsForm = ({ paymentTermsValue }: PaymentTermsFormProps) => {

    const [addPaymentTerms, { isLoading: isAdding, isSuccess: isAddSuccess, isError: isAddError }] = useAddPaymentTermsMutation();

    const [updatePaymentTerms, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdatePaymentTermsMutation();

    const dispatch = useDispatch<AppDispatch>();

    const { data: getPaymentTerms, refetch } = useGetPaymentTermsQuery();

    const initialValues = paymentTermsValue || paymentTermsInitialValue;

    const onSubmit = useMemo(() => async (values: PaymentTermsProps, actions: any) => {
        try {
            if (paymentTermsValue) {
                await updatePaymentTerms({ id: paymentTermsValue.id, paymentTermsData: values });
                dispatch(clearData());
            } else {
                await addPaymentTerms(values);
            }
            actions.resetForm();
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [addPaymentTerms, updatePaymentTerms, paymentTermsValue]);

    useEffect(() => {
        if (isAddSuccess || isUpdateSuccess) {
            refetch();
        }
    }, [isAddSuccess, isUpdateSuccess]);

    return (
        <div>
            <DynamicFormCreate
                toastMessage={paymentTermsValue ? 'Successfully Updated Payment Terms' : 'Successfully Created Payment Terms'}
                isSuccessToast={isAddSuccess || isUpdateSuccess}
                headerName={paymentTermsValue ? 'Edit Payment Terms' : 'Create Payment Terms'}
                showTable={true}
                fields={paymentTermsFields}
                initialValues={initialValues}
                validationSchema={paymentTermsValidationSchema}
                onSubmit={onSubmit}
                buttons={[
                    { label: 'Save', onClick: onSubmit }
                ]}
            />
        </div>
    );
};

export default PaymentTermsForm;
