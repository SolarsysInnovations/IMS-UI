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


const PaymentTermsCreate: React.FC = () => {
    const [addPaymentTerms, { isLoading, isSuccess, isError, error, }] = useAddPaymentTermsMutation();
    const { data: getPaymentTerms, isSuccess: getSuccess, refetch } = useGetPaymentTermsQuery();

    const onSubmit = async (values: any, actions: any) => {
        try {
            await addPaymentTerms(values);
            actions.resetForm();
            refetch()
        } catch (error) {
            console.log(error);
        }
    };
    // useSuccessToast({ isSuccess, message: "successfully created the gst type", })
    return (
        <div>
            {/* Use DynamicServiceCreate with the required props */}
            <DynamicFormCreate
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
