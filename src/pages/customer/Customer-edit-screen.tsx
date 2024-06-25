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
import SnackBarUi from '../../components/ui/Snackbar';

const CustomerEdit: React.FC = () => {
    const [updateCustomer, { isLoading, isSuccess, isError, error }] = useUpdateCustomerMutation();
    const customerStateDetails = useSelector((state: any) => state.customerState.data);
    const [showSuccessToast, setShowSuccessToast] = useState(false); 

    const navigate = useNavigate();
    const onSubmit = async (values: any, actions: any) => {
        try {
            const
             id: number = values?.id
            await updateCustomer({
                id: id,
                customer: values,
            });
            setShowSuccessToast(true);
            setTimeout(() => {
                setShowSuccessToast(false);
                navigate(-1);
            }, 1000);
            actions.resetForm();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {/* Use DynamicCustomerCreate with the required props */}
            {showSuccessToast && (
                <SnackBarUi
                    message="Successfully edited the customer"
                    severity="success"
                    isSubmitting={true}
                />
            )}
            {customerStateDetails && (
                <DynamicFormCreate
                    headerName='Customer Edit'
                    showTable={true}
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
