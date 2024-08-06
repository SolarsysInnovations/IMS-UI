import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddServiceMutation, useUpdateServiceMutation, useGetServiceQuery } from '../../redux-store/service/serviceApi';
import { serviceFields } from '../../constants/form-data/form-data-json';
import { serviceInitialValues } from '../../constants/forms/formikInitialValues';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceFormProps } from '../../types/types';
import { clearData } from '../../redux-store/global/globalState';
import { AppDispatch } from '../../redux-store/store';

const ServiceCreate = ({ serviceValue }: ServiceFormProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [addService, { isLoading: serviceAddLoading, isSuccess: serviceAddSuccess, isError: serviceAddError, error: serviceAddErrorObject }] = useAddServiceMutation();
    const [updateService, { isLoading: serviceUpdateLoading, isSuccess: serviceUpdateSuccess, isError: serviceUpdateError, error: serviceUpdateErrorObject }] = useUpdateServiceMutation();
    const serviceStateDetails = useSelector((state: any) => state.serviceState.data);
    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const { data: service, refetch } = useGetServiceQuery();
    const initialValue = serviceValue || serviceInitialValues;

    useSnackbarNotifications({
        error: serviceAddError,
        errorObject: serviceAddErrorObject,
        errorMessage: 'Error creating Service',
        success: serviceAddSuccess,
        successMessage: 'Service created successfully',
    });

    useSnackbarNotifications({
        error: serviceUpdateError,
        errorObject: serviceUpdateErrorObject,
        errorMessage: 'Error updating Service',
        success: serviceUpdateSuccess,
        successMessage: 'Service updated successfully',
    });

    useEffect(() => {
        refetch();
    }, [serviceAddSuccess, serviceUpdateSuccess, refetch]);

    // Define onSuccess function
    const onSuccess = useCallback(() => {
        // Any specific actions after success can go here
        console.log("Service operation was successful.");
        // Optionally navigate to another page or show a success message
        navigate('/services/list');
    }, [navigate]);

    useEffect(() => {
        if (serviceAddSuccess || serviceUpdateSuccess) {
            onSuccess();
        }
    }, [serviceAddSuccess, serviceUpdateSuccess, onSuccess]);

    useEffect(() => {
        console.log("Service State Details:", serviceStateDetails);

        const handlePopState = () => {
            setIsPopupOpen(false);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [serviceStateDetails]);


    const onSubmit = useMemo(() => async (values: ServiceFormProps, actions: any) => {
        try {
            if (serviceValue) {
                await updateService({ id: serviceValue.id, service: values  });
            } else {
                await addService(values);
            }
            actions.resetForm();
            refetch();
            if (serviceAddSuccess) {
                setTimeout(() => dispatch(clearData()), 1000)
            };
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        };
    }, [addService, updateService, serviceValue, refetch, dispatch, serviceAddSuccess]);


    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <>
            {isPopupOpen && (
                <DynamicFormCreate
                    headerName={serviceValue ? 'Edit Service' : 'Create Service'}
                    showTable={true}
                    fields={serviceFields}
                    initialValues={initialValue}
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

export default ServiceCreate;

