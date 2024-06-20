import React, { useEffect, useState } from 'react';
import { useAddServiceMutation, useGetServiceByIdMutation, useUpdateServiceMutation } from '../../redux-store/service/serviceApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { serviceFields } from '../../constants/form-data/form-data-json';
import { serviceInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import { LocalStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useSuccessToast from '../../hooks/useToast';
import { ToastContainer, toast } from 'react-toastify';
import ToastUi from '../../components/ui/ToastifyUi';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import SnackBarUi from '../../components/ui/Snackbar';

const ServiceEditScreen: React.FC = () => {
    const [updateService, { isLoading, isSuccess, isError, error }] = useUpdateServiceMutation();
    const serviceStateDetails = useSelector((state: any) => state.serviceState.data);
    const [showSuccessToast, setShowSuccessToast] = useState(false); 


    const navigate = useNavigate();
    const onSubmit = async (values: any, actions: any) => {
        try {
            const id: number = values?.id
            await updateService({
                id: id,
                service: values,
            });
             setShowSuccessToast(true);
             setTimeout(() => {
                setShowSuccessToast(false);
             }, 2000);
            // actions.resetForm();
            // setserviceDetails();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {showSuccessToast && (
                <SnackBarUi
                    message="Successfully edited the service"
                    severity="success"
                    isSubmitting={true}
                />
            )}
            {serviceStateDetails && (
                <DynamicFormCreate
                    headerName='Edit Service'
                    showTable={true}
                    fields={serviceFields}
                    initialValues={serviceStateDetails || []}
                    validationSchema={serviceValidationSchema}
                    onSubmit={onSubmit}
                />
            )}
        </div>

    );

};
export default ServiceEditScreen;
