import React, { useEffect, useState } from 'react';
import { useAddServiceMutation, useGetServiceQuery } from '../../redux-store/service/serviceApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { ToastContainer, toast } from 'react-toastify';
import { serviceFields } from '../../constants/form-data/form-data-json';
import { serviceInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import useSuccessToast from '../../hooks/useToast';
import SnackBarUi from '../../components/ui/Snackbar';


const ServiceCreate: React.FC = () => {

    const [addService, { isLoading, isSuccess, isError, error }] = useAddServiceMutation();
    const { data: serviceList, refetch } = useGetServiceQuery();
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const onSubmit = async (values: any, actions: any) => {
        try {
            actions.resetForm();
            await addService(values);
            setShowSuccessToast(true);
            setTimeout(() => {
                setShowSuccessToast(false);
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        refetch()
    }, [isSuccess]);

    return (
        <div>
            {/* Use DynamicServiceCreate with the required props */}
            {showSuccessToast && (
                <SnackBarUi
                    message="Successfully created the service"
                    severity="success"
                    isSubmitting={true}
                />
            )}
            <DynamicFormCreate
                headerName='Create Service'
                showTable={true}
                fields={serviceFields}
                initialValues={serviceInitialValues}
                validationSchema={serviceValidationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default ServiceCreate;
