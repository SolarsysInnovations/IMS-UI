import React, { useEffect } from 'react';
import { useAddServiceMutation, useGetServiceQuery } from '../../redux-store/service/serviceApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { ToastContainer, toast } from 'react-toastify';
import { serviceFields } from '../../constants/form-data/form-data-json';
import { serviceInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import useSuccessToast from '../../hooks/useToast';


const ServiceCreate: React.FC = () => {
    const [addService, { isLoading, isSuccess, isError, error }] = useAddServiceMutation();
    const { data: serviceList, refetch } = useGetServiceQuery();

    const onSubmit = async (values: any, actions: any) => {
        try {
            actions.resetForm();
            await addService(values);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        refetch()
    }, [isSuccess])
    return (
        <div>
            {/* Use DynamicServiceCreate with the required props */}
            <ToastContainer />
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
