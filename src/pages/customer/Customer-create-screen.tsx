import React, { useEffect, useMemo, useState } from 'react';
import { useAddCustomerMutation, useGetCustomersQuery, useUpdateCustomerMutation } from '../../redux-store/customer/customerApi';
import { customerFields } from '../../constants/form-data/form-data-json';
import { customerInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { DyCreateCustomerProps } from '../../types/types';
import { clearData } from '../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';

interface CustomerValueProps {
    customerEditInitialValues: any;
};

const CustomerCreate = ({ customerEditInitialValues }: CustomerValueProps) => {

    const [addCustomer, { isLoading: customerAddLoading, isSuccess: customerAddSuccess, isError: customerAddError, error: customerAddErrorObject }] = useAddCustomerMutation();
    const [updateCustomer, { isLoading: customerUpdateLoading, isSuccess: customerUpdateSuccess, isError: customerUpdateError, error: customerUpdateErrorObject }] = useUpdateCustomerMutation();
    const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();

    const dispatch = useDispatch<AppDispatch>();

    const [data, setData] = useState<any>();

    useSnackbarNotifications({
        error: customerAddError,
        errorObject: customerAddErrorObject,
        errorMessage: 'Error creating Customer',
        success: customerAddSuccess,
        successMessage: 'Customer created successfully',
    });

    useSnackbarNotifications({
        error: customerUpdateError,
        errorObject: customerUpdateErrorObject,
        errorMessage: 'Error updating Customer',
        success: customerUpdateSuccess,
        successMessage: 'Customer update successfully',
    });

    useEffect(() => {
        refetch();
    }, [customerAddSuccess, customerUpdateSuccess, refetch]);

    const initialValues = customerEditInitialValues || customerInitialValues;

    const onSubmit = useMemo(() => async (values: DyCreateCustomerProps, actions: any) => {
        try {
            if (customerEditInitialValues) {
                const id: number = values?.id
                await updateCustomer({ id: id, customer: values, });
                dispatch(clearData());
                actions.resetForm();
            } else {
                await addCustomer(values);
                dispatch(clearData());
                actions.resetForm();
            }
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [addCustomer, updateCustomer, customerEditInitialValues, dispatch]);

    return (
        <>
            <DynamicFormCreate
                setData={setData}
                // updateFormValue={updateFormValue}
                showTable={true}
                fields={customerFields}
                initialValues={initialValues}
                validationSchema={customerValidationSchema}
                onSubmit={onSubmit}
            />
        </>
    );
};

export default CustomerCreate;
