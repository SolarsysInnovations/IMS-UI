import React, { useEffect, useMemo } from 'react';
import * as Yup from 'yup'; 
import { CompanyEditFields, CompanyFields } from '../../constants/form-data/form-data-json';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { clearData } from '../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { SuperAdminUsersInitialValueProps } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { superAdminCompanyUsersInitialValues } from '../../constants/forms/formikInitialValues';
import { useCreateUserMutation, useGetUsersListQuery, useUpdateUserMutation } from '../../redux-store/api/injectedApis';
import { companyDetailsValidationSchema } from '../../constants/forms/validations/validationSchema';

interface CompanyValueProps {
    companyEditInitialValues: any;
    mode: 'create' | 'edit';
};

const CompanyCreate = ({ companyEditInitialValues, mode }: CompanyValueProps) => {
    const [addCompany, { isLoading: companyAddLoading, isSuccess: companyAddSuccess, isError: companyAddError, error: companyAddErrorObject }] = useCreateUserMutation();
    const [updateCompany, { isLoading: companyUpdateLoading, isSuccess: companyUpdateSuccess, isError: companyUpdateError, error: companyUpdateErrorObject }] = useUpdateUserMutation();
    const { data: company, error, isLoading, refetch } = useGetUsersListQuery();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const initialValues = companyEditInitialValues || superAdminCompanyUsersInitialValues;
    
    // Dynamically modify fields based on 'mode'
    const fields = useMemo(() => {
        if (mode === 'create') {
            return CompanyFields; // Include password field
        } else {
            // Filter out password field in edit mode
            const editedFields = CompanyEditFields.map(section => ({
                ...section,
                subFields: section.subFields?.filter(field => field.name !== 'password') || [], // Ensure subFields is not undefined
            }));
            return editedFields;
        }
    }, [mode]);
    

    useSnackbarNotifications({
        error: companyAddError,
        errorObject: companyAddErrorObject,
        errorMessage: 'Error creating Company',
        success: companyAddSuccess,
        successMessage: 'Company created successfully',
    });

    useSnackbarNotifications({
        error: companyUpdateError,
        errorObject: companyUpdateErrorObject,
        errorMessage: 'Error updating Company',
        success: companyUpdateSuccess,
        successMessage: 'Company updated successfully',
    });

    useEffect(() => {
        if (companyUpdateSuccess) {
            navigate(-1);
        }
        refetch();
    }, [companyAddSuccess, companyUpdateSuccess, refetch]);

    const onSubmit = useMemo(() => async (values: SuperAdminUsersInitialValueProps, actions: any) => {
        try {
            if (mode === 'edit' && companyEditInitialValues) {
                const transformedData = {
                    userDetails: {
                        userName: values.userName,
                        userEmail: values.userEmail,
                        userRole: values.userRole,
                        userMobile: values.userMobile,
                        description: values.description,
                    },
                    companyDetails: {
                        companyName: values.companyName,
                        companyAddress: values.companyAddress,
                        companyState: values.companyState,
                        companyCity: values.companyCity,
                        companyCountry: values.companyCountry,
                        companyEmail: values.companyEmail,
                        companyPhone: values.companyPhone,
                        companyWebsite: values.companyWebsite,
                        companyTaxNumber: values.companyTaxNumber,
                        companyRegNumber: values.companyRegNumber,
                        customerLimit: values.customerLimit,
                        invoiceLimit: values.invoiceLimit,
                        userLimit: values.userLimit,
                        serviceLimit: values.serviceLimit,
                    },
                };

                await updateCompany({ id: companyEditInitialValues.id, data: transformedData });
                dispatch(clearData());
            } else {
                const transformedData = {
                    userDetails: {
                        userName: values.userName,
                        userEmail: values.userEmail,
                        password: values.password,  // Only included in 'create' mode
                        userRole: values.userRole,
                        userMobile: values.userMobile,
                        description: values.description,
                    },
                    companyDetails: {
                        companyName: values.companyName,
                        companyAddress: values.companyAddress,
                        companyState: values.companyState,
                        companyCity: values.companyCity,
                        companyCountry: values.companyCountry,
                        companyEmail: values.companyEmail,
                        companyPhone: values.companyPhone,
                        companyWebsite: values.companyWebsite,
                        companyTaxNumber: values.companyTaxNumber,
                        companyRegNumber: values.companyRegNumber,
                        customerLimit: values.customerLimit,
                        invoiceLimit: values.invoiceLimit,
                        userLimit: values.userLimit,
                        serviceLimit: values.serviceLimit,
                    },
                };
                await addCompany(transformedData);
                dispatch(clearData());
            }

            actions.resetForm();
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [updateCompany, dispatch, addCompany, companyEditInitialValues, mode]);

    return (
        <div style={{ maxHeight: '90vh', overflowY: 'auto', paddingRight: '1rem' }}>
            <DynamicFormCreate
                headerName={mode=== 'edit' ? 'Company Edit' : 'Company Create'}
                showTable={true}
                fields={fields}
                initialValues={initialValues}
                validationSchema={companyDetailsValidationSchema}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default CompanyCreate;
