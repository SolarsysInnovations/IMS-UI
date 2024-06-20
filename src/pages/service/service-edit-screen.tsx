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


    useEffect(() => {
        console.log("Service State Details:", serviceStateDetails); // Check what is in serviceStateDetails
    }, [serviceStateDetails]);

    const navigate = useNavigate();
    const onSubmit = async (values: any, actions: any) => {
        try {
            const id = values.id;
            console.log("id", id); // Ensure id is correctly retrieved
            if (id !== undefined) {
                await updateService({
                    id: id,
                    service: values,
                });
                actions.resetForm();
                setShowSuccessToast(true);
             setTimeout(() => {
                setShowSuccessToast(false);
             }, 2000);
            } else {
                console.error("ID is undefined");
            }
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
                    initialValues={serviceStateDetails || {}} // Ensure to default to an empty object
                    validationSchema={serviceValidationSchema}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};
export default ServiceEditScreen;

