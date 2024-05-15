import React, { useEffect, useState } from 'react';
import { useAddServiceMutation } from '../../../redux-store/service/serviceApi';
import { toastConfig } from '../../../constants/forms/config/toastConfig';
import { toast } from 'react-toastify';
import { GstTypeFields, serviceFields } from '../../../constants/form-data/form-data-json';
import { gstTypeInitialValue, serviceInitialValues } from '../../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { gstTypeValidationSchema, serviceValidationSchema } from '../../../constants/forms/validations/validationSchema';
import useSuccessToast from '../../../hooks/useToast';
import { useAddGstTypeMutation, useGetGstTypeQuery } from '../../../redux-store/invoice/gstTypeApi';


const GstTypeCreate: React.FC = () => {
    const [addGstType, { isLoading, isSuccess, isError, error, }] = useAddGstTypeMutation();
    const { data: getGstType, isSuccess: getSuccess, refetch } = useGetGstTypeQuery();

    const onSubmit = async (values: any, actions: any) => {
        try {
            await addGstType(values);
            actions.resetForm();
            refetch()
        } catch (error) {
            console.log(error);
        }
    };
    // useSuccessToast({ isSuccess, message: "successfully created the gst type", })
    return (
        <div>
            {/* Use DynamicServiceCreate with the required props */}
            <DynamicFormCreate
                headerName='Create Gst Type'
                showTable={true}
                fields={GstTypeFields}
                initialValues={gstTypeInitialValue}
                validationSchema={gstTypeValidationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default GstTypeCreate;
