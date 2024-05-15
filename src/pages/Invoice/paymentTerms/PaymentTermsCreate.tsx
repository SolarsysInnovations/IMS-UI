import React, { useEffect, useState } from 'react';
import { useAddServiceMutation } from '../../../redux-store/service/serviceApi';
import { toastConfig } from '../../../constants/forms/config/toastConfig';
import { toast } from 'react-toastify';
import { gstTypeInitialValue, paymentTermsInitialValue, serviceInitialValues, tdsTaxInitialValue } from '../../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { gstTypeValidationSchema, paymentTermsValidationSchema, serviceValidationSchema, tdsTaxValidationSchema } from '../../../constants/forms/validations/validationSchema';
import useSuccessToast from '../../../hooks/useToast';
import { useAddGstTypeMutation, useGetGstTypeQuery } from '../../../redux-store/invoice/gstTypeApi';
import { TdsTaxFields, paymentTermsFields } from '../../../constants/form-data/form-data-json';
import { useAddTdsTaxMutation, useGetTdsTaxQuery } from '../../../redux-store/invoice/tdsTaxApi';
import { useAddPaymentTermsMutation, useGetPaymentTermsQuery } from '../../../redux-store/invoice/paymentTerms';
import { PaymentTermsProps } from '../../../types/types';


const PaymentTermsCreate: React.FC = () => {
    const [addPaymentTerms, { isLoading, isSuccess, isError, error, }] = useAddPaymentTermsMutation();
    const { data: getPaymentTerms, isSuccess: getSuccess, refetch } = useGetPaymentTermsQuery();

    const onSubmit = async (values: PaymentTermsProps, { setSubmitting, resetForm }: any) => {
        try {
            await addPaymentTerms(values).unwrap(); // Call unwrap to handle the result properly
            refetch();
            resetForm();
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            setSubmitting(false);
        }
    }
    // useSuccessToast({ isSuccess, message: "successfully created the gst type", })
    return (
        <div>
            {/* Use DynamicServiceCreate with the required props */}
            <DynamicFormCreate
                headerName='Create Payment Terms'
                showTable={true}
                fields={paymentTermsFields}
                initialValues={paymentTermsInitialValue}
                validationSchema={paymentTermsValidationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default PaymentTermsCreate;
