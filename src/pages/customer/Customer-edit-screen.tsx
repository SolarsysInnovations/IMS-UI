import React, { useEffect, useState } from 'react';
import { useAddCustomerMutation, useGetCustomerByIdMutation, useUpdateCustomerMutation } from '../../redux-store/customer/customerApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { ToastContainer, toast } from 'react-toastify';
import { customerFields } from '../../constants/form-data/form-data-json';
import { customerInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';
import { LocalStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useSuccessToast from '../../hooks/useToast';
import TableHeader from '../../components/layouts/TableHeader';
import { Add } from '@mui/icons-material';

const CustomerEdit: React.FC = () => {
    const [updateCustomer, { isLoading, isSuccess, isError, error }] = useUpdateCustomerMutation();
    const customerStateDetails = useSelector((state: any) => state.customerState.data);

    const navigate = useNavigate();
    const onSubmit = async (values: any, actions: any) => {
        try {
            const id: number = values?.id
            await updateCustomer({
                id: id,
                customer: values,
            });
            actions.resetForm();
            // setCustomerDetails("")
        } catch (error) {
            console.log(error);
        }
    };

    useSuccessToast({
        isSuccess, message: "successfully edited the customer",
        navigate: () => {
            navigate(-1);
        }
    });

    const pathname = "Customer Edit"
    const buttons = [
            { label: 'Back', icon: Add, onClick: () => navigate(-1) },
            { label: 'Save', icon: Add,onClick: () => {
            // Trigger form submission programmatically
            document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }}
        ];

    return (
        <div>
            {/* Use DynamicCustomerCreate with the required props */}
            <ToastContainer />
            <TableHeader headerName={pathname} buttons={buttons} />
            {customerStateDetails && (
                <DynamicFormCreate
                    showTable={false}
                    fields={customerFields}
                    initialValues={customerStateDetails}
                    validationSchema={customerValidationSchema}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

export default CustomerEdit;
