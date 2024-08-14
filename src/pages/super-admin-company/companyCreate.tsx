import React, { useEffect, useMemo } from 'react';
import * as Yup from 'yup'; // Import Yup for validation
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

    const fields = mode === 'create' ? CompanyFields : CompanyEditFields;

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
            navigate(-1)
        };
        refetch();
    }, [companyAddSuccess, companyUpdateSuccess, refetch]);

    const onSubmit = useMemo(() => async (values: SuperAdminUsersInitialValueProps, actions: any) => {
        try {
            if (mode === 'edit' && companyEditInitialValues) {
                const transformedData = {
                    userDetails: {
                        userName: values.userName,
                        userEmail: values.userEmail,
                        // password: values.password,
                        userRole: values.userRole,
                        userMobile: values.userMobile,
                        description: values.description,
                    },
                    companyDetails: {
                        companyName: values.companyName,
                        companyAddress: values.companyAddress,
                        companyState: values.companyState,
                        companyCountry: values.companyCountry,
                        companyEmail: values.companyEmail,
                        companyPhone: values.companyPhone,
                        companyWebsite: values.companyWebsite,
                        companyTaxNumber: values.companyTaxNumber,
                        companyRegNumber: values.companyRegNumber
                    },
                };
                console.log("transformedData", transformedData);

                await updateCompany({ id: companyEditInitialValues.companyId, data: transformedData });
                dispatch(clearData());

            } else {
                const transformedData = {
                    userDetails: {
                        userName: values.userName,
                        userEmail: values.userEmail,
                        password: values.password,
                        userRole: values.userRole,
                        userMobile: values.userMobile,
                        description: values.description,
                    },
                    companyDetails: {
                        companyName: values.companyName,
                        companyAddress: values.companyAddress,
                        companyState: values.companyState,
                        companyCountry: values.companyCountry,
                        companyEmail: values.companyEmail,
                        companyPhone: values.companyPhone,
                        companyWebsite: values.companyWebsite,
                        companyTaxNumber: values.companyTaxNumber,
                        companyRegNumber: values.companyRegNumber
                    },
                };
                await addCompany(transformedData);
                dispatch(clearData());
            }

            dispatch(clearData());
            actions.resetForm();

        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [updateCompany, dispatch, addCompany, companyEditInitialValues, mode]);

    const companyDetailsValidationSchema = Yup.object().shape({
        userName: Yup.string().required('User name is required'),
        userEmail: Yup.string().email('Invalid email format').required('User email is required'),
        password: mode === 'create' ? Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required') : Yup.string(),
        userRole: Yup.string().required('User role is required'),
        userMobile: Yup.string()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be at least 10 digits')
            .required('User mobile is required'),
        description: Yup.string().required('Description is required'),
        companyName: Yup.string().required('Company name is required'),
        companyAddress: Yup.string().required('Company address is required'),
        companyState: Yup.string().required('Company state is required'),
        companyCountry: Yup.string().required('Company country is required'),
        companyEmail: Yup.string().email('Invalid email format').required('Company email is required'),
        companyPhone: Yup.string()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be at least 10 digits')
            .required('Company phone is required'),
        companyWebsite: Yup.string().url('Invalid URL format').required('Company website is required'),
        companyTaxNumber: Yup.string().required('Company tax number is required'),
        companyRegNumber: Yup.string().required('Company registration number is required'),
    });

    return (
        <>
            <DynamicFormCreate
                showTable={true}
                // fields={Object.keys(companyEditInitialValues).length === 0 ? CompanyFields : CompanyEditFields}
                fields={fields}
                initialValues={initialValues}
                validationSchema={companyDetailsValidationSchema}
                onSubmit={onSubmit}
            />
        </>
    );
};

export default CompanyCreate;
