import React, { useMemo } from 'react';
import { GstTypeFields } from '../../../constants/form-data/form-data-json';
import { gstTypeInitialValue } from '../../../constants/forms/formikInitialValues';
import { gstTypeValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { DynamicFormCreate } from '../../../components/Form-renderer/Dynamic-form';
import { GstTypeFormProps, GstTypeProps } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux-store/store';
import { Save } from "@mui/icons-material";
import { useSnackbarNotifications } from '../../../hooks/useSnackbarNotification';
import { useCreateGstTypeMutation, useGetGstTypeListQuery, useUpdateGstTypeMutation } from '../../../redux-store/api/injectedApis';
import { clearGstTypeData } from '../../../redux-store/slices/gstTypeSlice';

// create and edit screen

const GstTypeForm = ({ gstTypeValue }: GstTypeFormProps) => {

    const [addGstType, { isLoading: gstTypeAddLoading, isSuccess: gstTypeAddSuccess, isError: gstTypeAddError, error: gstTypeAddErrorObject }] = useCreateGstTypeMutation();

    const [updateGstType, { isLoading: gstTypeUpdateLoading, isSuccess: gstTypeUpdateSuccess, isError: gstTypeUpdateError, error: gstTypeUpdateErrorObject }] = useUpdateGstTypeMutation();

    const { data: getGstType, refetch } = useGetGstTypeListQuery();

    const dispatch = useDispatch<AppDispatch>();

    const initialValues = gstTypeValue || gstTypeInitialValue;

    const onSubmit = useMemo(() => async (values: GstTypeProps, actions: any) => {
        try {
            if (gstTypeValue) {
                await updateGstType({ id: gstTypeValue.id, data: values });
            } else {
                await addGstType(values);
            }
            actions.resetForm();
            refetch();
            if (gstTypeValue) {
                setTimeout(() => dispatch(clearGstTypeData()), 1000)
            };
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [addGstType, updateGstType, gstTypeValue, refetch, dispatch]);

    // * -------- gst type creating --------------------
    useSnackbarNotifications({
        error: gstTypeAddError,
        errorObject: gstTypeAddErrorObject,
        errorMessage: 'Error creating Gst Type',
        success: gstTypeAddSuccess,
        successMessage: 'Gst Type created successfully',
    });

    // * -------- gst type updating --------------------
    useSnackbarNotifications({
        error: gstTypeUpdateError,
        errorObject: gstTypeUpdateErrorObject,
        errorMessage: 'Error updating Gst Type',
        success: gstTypeUpdateSuccess,
        successMessage: 'Gst Type updated successfully',
    });

    return (
        <div>
            <DynamicFormCreate
                headerName={gstTypeValue ? 'Edit GST Type' : 'Create GST Type'}
                showTable={true}
                fields={GstTypeFields}
                initialValues={initialValues}
                validationSchema={gstTypeValidationSchema}
                onSubmit={onSubmit}
                buttons={[
                    { label: 'Save', icon: Save, onClick: onSubmit }
                ]} />
        </div>
    );
};

export default GstTypeForm;
