import React, { useEffect, useMemo } from 'react';
import { Add } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useAddGstTypeMutation, useGetGstTypeQuery, useUpdateGstTypeMutation } from '../../redux-store/invoice/gstTypeApi';
import { GstTypeFormProps, GstTypeProps } from '../../types/types';
import { AppDispatch } from '../../redux-store/store';
import { useDispatch } from 'react-redux';
import { clearData } from '../../redux-store/global/globalState';
import { DynamicFormCreate } from '../Form-renderer/Dynamic-form';
import { GstTypeFields, InvoiceMailReasonFields } from '../../constants/form-data/form-data-json';
import { InvoiceEmailReasonValidationSchemas, gstTypeValidationSchema } from '../../constants/forms/validations/validationSchema';
import { invoiceMailReasonInitialValue } from '../../constants/forms/formikInitialValues';

// create and edit screen

const MailReason = () => {

    const [addGstType, { isLoading: isAdding, isSuccess: isAddSuccess, isError: isAddError }] = useAddGstTypeMutation();
    const [updateGstType, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateGstTypeMutation();
    const navigate = useNavigate();
    const { data: getGstType, refetch } = useGetGstTypeQuery();

    const dispatch = useDispatch<AppDispatch>();


    const onSubmit = useMemo(() => async (values: GstTypeProps, actions: any) => {
        try {
            // if (gstTypeValue) {
            //     console.log(values);
            //     await updateGstType({ id: gstTypeValue.id, gstTypeData: values });
            //     // dispatch(clearData());
            // } else {
            //     await addGstType(values);
            // }
            actions.resetForm();
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [addGstType, updateGstType,]);

    useEffect(() => {
        if (isAddSuccess || isUpdateSuccess) {
            refetch();
            console.log("Operation successful!");
        }
    }, [isAddSuccess, isUpdateSuccess]);

    useEffect(() => {
        if (isUpdateSuccess) {
            setTimeout(() => {
                dispatch(clearData());
            }, 1000);

        }
    }, [isUpdateSuccess, dispatch]);

    return (
        <div>
            <DynamicFormCreate
                headerName="Send a Reason To Email"
                showTable={true}
                fields={InvoiceMailReasonFields}
                initialValues={invoiceMailReasonInitialValue || []}
                validationSchema={InvoiceEmailReasonValidationSchemas}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default MailReason;
