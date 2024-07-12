import React, { useEffect, useState } from 'react';
import { useUpdateServiceMutation, useGetServiceQuery } from '../../redux-store/service/serviceApi';
import { serviceFields } from '../../constants/form-data/form-data-json';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SnackBarUi from '../../components/ui/Snackbar';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';

interface ServiceEditScreenProps {
    onSuccess: () => void;
}

const ServiceEditScreen: React.FC<ServiceEditScreenProps> = ({ onSuccess }) => {
    const [updateService, { isLoading: serviceUpdateLoading, isSuccess: serviceUpdateSuccess, isError: serviceUpdateError, error: serviceUpdateErrorObject }] = useUpdateServiceMutation();
    const serviceStateDetails = useSelector((state: any) => state.serviceState.data);
    const [showSuccessToast, setShowSuccessToast] = useState(false); 
    const { data: service, error, isLoading, refetch } = useGetServiceQuery();
    const [isPopupOpen, setIsPopupOpen] = useState(true); // State to control popup visibility
    const handleBackClick = () => {
        navigate(0); // Navigate back
      };
    
    useEffect(() => {
        console.log("Service State Details:", serviceStateDetails); // Check what is in serviceStateDetails

        // Add event listener for back button
        const handlePopState = () => {
            setIsPopupOpen(false); // Close the popup
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [serviceStateDetails]);

    useSnackbarNotifications({
        error: serviceUpdateError,
        errorObject: serviceUpdateErrorObject,
        errorMessage: 'Error updating Service',
        success: serviceUpdateSuccess,
        successMessage: 'Service updated successfully',
    });

    useEffect(() => {
        refetch();
        if (serviceUpdateSuccess) {
            onSuccess();
        }
    }, [serviceUpdateSuccess, refetch, onSuccess]);

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
                setShowSuccessToast(true);
                setTimeout(() => {
                    navigate('/services/list');
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
        <>
            {isPopupOpen && serviceStateDetails && (
                <DynamicFormCreate
                    headerName='Edit Service'
                    showTable={true}
                    fields={serviceFields}
                    initialValues={serviceStateDetails || {}} // Ensure to default to an empty object
                    validationSchema={serviceValidationSchema}
                    onSubmit={onSubmit}
                    buttons={[
                        { label: "Back", onClick: handleBackClick },
                        { label: "Save", onClick: onSubmit }
                      ]}
                />
            )}
        </>
    );
};

export default ServiceEditScreen;
