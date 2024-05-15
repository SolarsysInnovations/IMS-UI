import React, { useEffect, useMemo, useState } from 'react';
import { useAddServiceMutation } from '../../../redux-store/service/serviceApi';
import { gstTypeInitialValue, serviceInitialValues, tdsTaxInitialValue } from '../../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { gstTypeValidationSchema, serviceValidationSchema, tdsTaxValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { useAddGstTypeMutation, useGetGstTypeQuery } from '../../../redux-store/invoice/gstTypeApi';
import { TdsTaxFields } from '../../../constants/form-data/form-data-json';
import { useAddTdsTaxMutation, useGetTdsTaxQuery } from '../../../redux-store/invoice/tdsTaxApi';
import SnackBarUi from '../../../components/ui/Snackbar';
import { Alert } from '@mui/material';
import useSuccessToast from '../../../hooks/useToast';


const TdsTaxCreate: React.FC = () => {
    const [addTdsTax, { isLoading, isSuccess, isError, error, }] = useAddTdsTaxMutation();
    const { data: tdsTax, refetch } = useGetTdsTaxQuery();

    const onSubmit = useMemo(() => async (values: any, actions: any) => {
        try {
            await addTdsTax(values).unwrap();
            actions.resetForm();
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [addTdsTax]);

    useEffect(() => {
        refetch()
    }, [isSuccess, refetch])
    // useSuccessToast({ isSuccess, message: "successfully created the gst type", })
    return (
        <div>
            {/* Use DynamicServiceCreate with the required props */}
            <DynamicFormCreate
                toastMessage='SuccessFully Created Tds Tax'
                isSuccessToast={isSuccess}
                headerName='Create Tds Tax'
                showTable={true}
                fields={TdsTaxFields}
                initialValues={tdsTaxInitialValue}
                validationSchema={tdsTaxValidationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default TdsTaxCreate;
