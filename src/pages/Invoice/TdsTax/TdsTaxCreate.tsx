import React, { useEffect, useMemo, useState } from 'react';
import { useAddServiceMutation } from '../../../redux-store/service/serviceApi';
import { gstTypeInitialValue, serviceInitialValues, tdsTaxInitialValue } from '../../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { gstTypeValidationSchema, serviceValidationSchema, tdsTaxValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { useAddGstTypeMutation, useGetGstTypeQuery } from '../../../redux-store/invoice/gstTypeApi';
import { TdsTaxFields } from '../../../constants/form-data/form-data-json';
import { useAddTdsTaxMutation, useGetTdsTaxQuery, useUpdateTdsTaxMutation } from '../../../redux-store/invoice/tdsTaxApi';
import SnackBarUi from '../../../components/ui/Snackbar';
import { Alert } from '@mui/material';
import useSuccessToast from '../../../hooks/useToast';
import { TdsTaxFormProps, TdsTaxProps } from '../../../types/types';
import { clearData } from '../../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux-store/store';


const TdsTaxCreate = ({ tdsTaxValue }: TdsTaxFormProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [addTdsTax, { isLoading: isAdding, isSuccess: isAddSuccess, isError: isAddError }] = useAddTdsTaxMutation();

    const [updateTdsTax, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateTdsTaxMutation();

    const { data: tdsTaxList, refetch } = useGetTdsTaxQuery();

    const initialValue = tdsTaxValue || tdsTaxInitialValue;


    const onSubmit = useMemo(() => async (values: TdsTaxProps, actions: any) => {
        try {
            if (tdsTaxValue) {
                await updateTdsTax({ id: tdsTaxValue.id, tdsTaxData: values });
                dispatch(clearData());
            } else {
                await addTdsTax(values);
            }
            actions.resetForm();
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [addTdsTax, updateTdsTax, tdsTaxValue]);

    useEffect(() => {
        if (isAddSuccess || isUpdateSuccess) {
            refetch();
        }
    }, [isAddSuccess, isUpdateSuccess]);
    return (
        <div>
            {/* Use DynamicServiceCreate with the required props */}
            <DynamicFormCreate
                toastMessage={tdsTaxValue ? 'Successfully Updated Tds Tax' : 'Successfully Created Tds Tax'}
                isSuccessToast={isAddSuccess || isUpdateSuccess}
                headerName={tdsTaxValue ? 'Edit Tds Tax ' : 'Create Tds Tax'}
                showTable={true}
                fields={TdsTaxFields}
                initialValues={initialValue}
                validationSchema={tdsTaxValidationSchema}
                onSubmit={onSubmit}
                buttons={[
                   { label: 'Save', onClick: onSubmit }
                ]}
            />
        </div>
    );
};

export default TdsTaxCreate;
