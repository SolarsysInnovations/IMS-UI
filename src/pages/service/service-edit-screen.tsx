import React, { useEffect, useState } from 'react';
import { useAddServiceMutation,useGetServiceByIdMutation, useUpdateServiceMutation } from '../../redux-store/service/serviceApi';
import { toastConfig } from '../../constants/forms/config/toastConfig';
import { serviceFields} from '../../constants/form-data/form-data-json';
import { serviceInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { serviceValidationSchema } from '../../constants/forms/validations/validationSchema';
import { LocalStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useSuccessToast from '../../hooks/useToast';
import { ToastContainer, toast } from 'react-toastify';

const ServiceEditScreen: React.FC = () => {
    const [updateService, { isLoading, isSuccess, isError, error }] = useUpdateServiceMutation();
    const serviceStateDetails = useSelector((state: any) => state.serviceState.data);

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
            actions.resetForm();
            // setserviceDetails();
        } catch (error) {
            console.log(error);
        }
    };

    useSuccessToast({
        isSuccess, message: "successfully edited the service",
        navigate: () => {
            navigate(-1);
        }
    });

    return (
        <div>
            <ToastContainer />
            {serviceStateDetails && (
                <DynamicFormCreate
                    fields={serviceFields}
                    initialValues={serviceStateDetails}
                    validationSchema={serviceValidationSchema}
                    onSubmit={onSubmit}
                />
            )}
        </div>
         
         );
         
};
export default ServiceEditScreen;
