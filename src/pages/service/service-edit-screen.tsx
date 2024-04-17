import React, { useEffect, useState } from 'react';
import { useAddServiceMutation, useUpdateServiceMutation } from '../../redux-store/service/serviceApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { toast } from 'react-toastify';
import { serviceFields } from '../../constants/form-data/form-data-json';
import { serviceInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import { LocalStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const CustomerEdit: React.FC = () => {
    const [updateService, { isLoading, isSuccess, isError, error }] = useUpdateServiceMutation();
    const [serviceDetails, setserviceDetails] = useLocalStorage(LocalStorageKeys.SERVICE_EDIT, null);
    const navigate = useNavigate();
    const onSubmit = async (values: any, actions: any) => {
        try {
            const id: number = values?._id
            console.log(id);
            console.log(values);
            await updateService({
                id: id,
                serviceData: values,
            });
            toast.success("successfully created the new customer", toastConfig)
            alert("created the new customer")
            actions.resetForm();
            // setCustomerDetails("")
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success("successfully created the new customer", toastConfig)
        }
    }, [isSuccess])
    // console.log(serviceDetails);


    return (
        <div>
            {/* Use DynamicServiceCreate with the required props */}
            {serviceDetails ? (
                <DynamicFormCreate
                    fields={serviceFields}
                    initialValues={serviceDetails}
                    validationSchema={serviceValidationSchema}
                    onSubmit={onSubmit}
                />
            ) : (<p>Loading ....</p>)}
        </div>
    );
};

export default CustomerEdit;
