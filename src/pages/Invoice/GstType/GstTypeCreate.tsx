import React, { useEffect, useMemo } from 'react';
import { useAddGstTypeMutation, useGetGstTypeQuery, useUpdateGstTypeMutation } from '../../../redux-store/invoice/gstTypeApi';
import { GstTypeFields } from '../../../constants/form-data/form-data-json';
import { gstTypeInitialValue } from '../../../constants/forms/formikInitialValues';
import { gstTypeValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { GstTypeFormProps, GstTypeProps } from '../../../types/types';
import { clearData } from '../../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux-store/store';
import { Add } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

// create and edit screen

const GstTypeForm = ({ gstTypeValue }: GstTypeFormProps) => {

    const [addGstType, { isLoading: isAdding, isSuccess: isAddSuccess, isError: isAddError }] = useAddGstTypeMutation();

    const [updateGstType, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateGstTypeMutation();
    const navigate = useNavigate();
    const { data: getGstType, refetch } = useGetGstTypeQuery();

    const dispatch = useDispatch<AppDispatch>();

    const initialValues = gstTypeValue || gstTypeInitialValue;

    const onSubmit = useMemo(() => async (values: GstTypeProps, actions: any) => {
        try {
            if (gstTypeValue) {
                console.log(values);
                await updateGstType({ id: gstTypeValue.id, gstTypeData: values });
                dispatch(clearData());
            } else {
                await addGstType(values);
            }
            actions.resetForm();
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [addGstType, updateGstType, gstTypeValue]);

    useEffect(() => {
        if (isAddSuccess || isUpdateSuccess) {
            refetch();
            console.log("Operation successful!");
        }
    }, [isAddSuccess, isUpdateSuccess]);

    return (
        <div>
            <DynamicFormCreate
                toastMessage={gstTypeValue ? 'Successfully Updated GST Type' : 'Successfully Created GST Type'}
                isSuccessToast={isAddSuccess || isUpdateSuccess}
                headerName={gstTypeValue ? 'Edit GST Type' : 'Create GST Type'}
                showTable={true}
                fields={GstTypeFields}
                initialValues={initialValues}
                validationSchema={gstTypeValidationSchema}
                onSubmit={onSubmit}
                buttons={[
                    { label: 'Save', icon: Add, onClick: onSubmit }
                ]} />
        </div>
    );
};

export default GstTypeForm;
