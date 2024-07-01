import React, { useEffect, useState } from 'react';
import { useUpdateServiceMutation } from '../../redux-store/service/serviceApi';
import { serviceFields } from '../../constants/form-data/form-data-json';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SnackBarUi from '../../components/ui/Snackbar';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';

const ServiceEditScreen: React.FC = () => {
    const [updateService, { isLoading, isSuccess, isError, error }] = useUpdateServiceMutation();
    const serviceStateDetails = useSelector((state: any) => state.serviceState.data);
    const [showSuccessToast, setShowSuccessToast] = useState(false); 
    const [isPopupOpen, setIsPopupOpen] = useState(true); // State to control popup visibility

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
        <div>
            {showSuccessToast && (
                <SnackBarUi
                    message="Successfully edited the service"
                    severity="success"
                    isSubmitting={true}
                />
            )}
            {isPopupOpen && serviceStateDetails && (
                <DynamicFormCreate
                    headerName='Edit Service'
                    showTable={true}
                    fields={serviceFields}
                    initialValues={serviceStateDetails || {}} // Ensure to default to an empty object
                    validationSchema={serviceValidationSchema}
                    onSubmit={onSubmit}
                    onClose={() => setIsPopupOpen(false)} // Pass handler to close popup
                />
            )}
        </div>
    );
};

export default ServiceEditScreen;
