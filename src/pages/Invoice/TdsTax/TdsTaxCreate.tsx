import React, { useEffect, useState } from 'react';
import { useAddServiceMutation } from '../../../redux-store/service/serviceApi';
import { toastConfig } from '../../../constants/forms/config/toastConfig';
import { toast } from 'react-toastify';
import { gstTypeInitialValue, serviceInitialValues, tdsTaxInitialValue } from '../../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { gstTypeValidationSchema, serviceValidationSchema, tdsTaxValidationSchema } from '../../../constants/forms/validations/validationSchema';
import useSuccessToast from '../../../hooks/useToast';
import { useAddGstTypeMutation, useGetGstTypeQuery } from '../../../redux-store/invoice/gstTypeApi';
import { TdsTaxFields } from '../../../constants/form-data/form-data-json';
import { useAddTdsTaxMutation, useGetTdsTaxQuery } from '../../../redux-store/invoice/tdsTaxApi';


const TdsTaxCreate: React.FC = () => {
    const [addTdsTax, { isLoading, isSuccess, isError, error, }] = useAddTdsTaxMutation();
    const { data: getGstType, isSuccess: getSuccess, refetch } = useGetTdsTaxQuery();

    const onSubmit = async (values: any, actions: any) => {
        try {
            await addTdsTax(values);
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
                showTable={true}
                fields={TdsTaxFields}
                initialValues={tdsTaxInitialValue}
                validationSchema={tdsTaxValidationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default TdsTaxCreate;
