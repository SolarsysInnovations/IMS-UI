import React, { useEffect, useState } from 'react';
import { useAddServiceMutation, useGetServiceQuery } from '../../redux-store/service/serviceApi';
import { serviceFields } from '../../constants/form-data/form-data-json';
import { serviceInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import SnackBarUi from '../../components/ui/Snackbar';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';

interface ServiceCreateProps {
    onSuccess: () => void;
}

const ServiceCreate: React.FC<ServiceCreateProps> = ({ onSuccess }) => {

    const [addService, { isLoading: serviceAddLoading, isSuccess: serviceAddSuccess, isError: serviceAddError, error: serviceAddErrorObject }] = useAddServiceMutation();
    const { data: serviceList, refetch } = useGetServiceQuery();

    useSnackbarNotifications({
        error: serviceAddError,
        errorObject: serviceAddErrorObject,
        errorMessage: 'Error creating Service',
        success: serviceAddSuccess,
        successMessage: 'Service created successfully',
    });

    useEffect(() => {
        refetch();
    }, [serviceAddSuccess, refetch]);

    useEffect(() => {
        if (serviceAddSuccess) {
            onSuccess();
        }
    }, [serviceAddSuccess, onSuccess]);

    const onSubmit = async (values: any, actions: any) => {
        try {
            actions.resetForm();
            await addService(values);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <DynamicFormCreate
                headerName='Create Service'
                showTable={true}
                fields={serviceFields}
                initialValues={serviceInitialValues}
                validationSchema={serviceValidationSchema}
                onSubmit={onSubmit}
            />
        </>
    );
};

export default ServiceCreate;
