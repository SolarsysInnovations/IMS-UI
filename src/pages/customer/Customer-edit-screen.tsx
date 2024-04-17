import React, { useEffect, useState } from 'react';
import { useAddCustomerMutation, useUpdateCustomerMutation } from '../../redux-store/customer/customerApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { toast } from 'react-toastify';
import { customerFields } from '../../constants/form-data/form-data-json';
import { customerInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';
import { LocalStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const CustomerEdit: React.FC = () => {
    const [updateCustomer, { isLoading, isSuccess, isError, error }] = useUpdateCustomerMutation();
    const [customerDetails] = useLocalStorage(LocalStorageKeys.CUSTOMER_EDIT, null);
    const navigate = useNavigate();
    const onSubmit = async (values: any, actions: any) => {
        try {
            const id: number = values?._id
            console.log(id);
            console.log(values);
            await updateCustomer({
                id: id,
                customer: values,
            });
            toast.success("successfully created the new customer", toastConfig)
            alert("created the new customer")
            actions.resetForm();
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success("successfully created the new customer", toastConfig)
        }
    }, [isSuccess])
    console.log(customerDetails);

    return (
        <div>
            {/* Use DynamicCustomerCreate with the required props */}
            {customerDetails ? (
                <DynamicFormCreate
                    fields={customerFields}
                    initialValues={customerDetails}
                    validationSchema={customerValidationSchema}
                    onSubmit={onSubmit}
                />
            ) : (<p>Loading ....</p>)}
        </div>
    );
};

export default CustomerEdit;
