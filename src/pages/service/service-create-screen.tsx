import React, { useEffect } from 'react';
import { useAddServiceMutation } from '../../redux-store/service/serviceApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { toast } from 'react-toastify';
import { serviceFields } from '../../constants/form-data/form-data-json';
import {serviceInitialValues} from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import useSuccessToast from '../../hooks/useToast';


const ServiceCreate: React.FC = () => {
    const [addService, { isLoading, isSuccess, isError, error }] = useAddServiceMutation();
    const onSubmit = async (values: any, actions: any) => {
        try {
            actions.resetForm();
            await addService(values);
        } catch (error) {
            console.log(error);
        }
    };
    useSuccessToast({ isSuccess, message: "successfully created the service" })
    return (
        <div>
            {/* Use DynamicCustomerCreate with the required props */}
            <DynamicFormCreate
                fields={serviceFields}
                initialValues={serviceInitialValues}
                validationSchema={serviceValidationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default ServiceCreate;
