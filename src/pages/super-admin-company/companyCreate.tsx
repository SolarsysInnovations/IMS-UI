import React, { useEffect, useMemo } from 'react';
import { useGetCompanyQuery, useAddCompanyMutation, useUpdateCompanyMutation } from '../../redux-store/company/companiesApi';
import { CompanyEditFields, CompanyFields } from '../../constants/form-data/form-data-json';
import { companyInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { companyDetailsValidationSchema } from '../../constants/forms/validations/validationSchema';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { clearData } from '../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { CompanyInitialValueProps } from '../../types/types';

interface CompanyValueProps {
    companyEditInitialValues: any;
    mode: 'create' | 'edit';
};

const CompanyCreate = ({ companyEditInitialValues, mode }: CompanyValueProps) => {

    const [addCompany, { isLoading: companyAddLoading, isSuccess: companyAddSuccess, isError: companyAddError, error: companyAddErrorObject }] = useAddCompanyMutation();

    const [updateCompany, { isLoading: companyUpdateLoading, isSuccess: companyUpdateSuccess, isError: companyUpdateError, error: companyUpdateErrorObject }] = useUpdateCompanyMutation();

    const { data: company, error, isLoading, refetch } = useGetCompanyQuery();

    const dispatch = useDispatch<AppDispatch>();

    const initialValues = companyEditInitialValues || companyInitialValues;
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
        refetch();
    }, [companyAddSuccess, companyUpdateSuccess, refetch]);

    const onSubmit = useMemo(() => async (values: CompanyInitialValueProps, actions: any) => {
        try {
            const id = values.id;
            if (mode === 'edit' && companyEditInitialValues) {
                const transformedData = {
                    userName: values.userName,
                    userEmail: values.userEmail,
                    password: values.password,
                    userRole: values.userRole,
                    userMobile: values.userMobile,
                    description: values.description,
                    companyName: values.companyName,
                    companyAddress: values.companyAddress,
                    companyState: values.companyState,
                    companyCountry: values.companyCountry,
                    companyEmail: values.companyEmail,
                    companyPhone: values.companyPhone,
                    companyWebsite: values.companyWebsite,
                    companyTaxNumber: values.companyTaxNumber,
                    companyRegNumber: values.companyRegNumber
                };
                await updateCompany({ id, company: transformedData });
            } else {
                const transformedData = {
                    userName: values.userName,
                    userEmail: values.userEmail,
                    password: values.password,
                    userRole: values.userRole,
                    userMobile: values.userMobile,
                    description: values.description,
                    companyName: values.companyName,
                    companyAddress: values.companyAddress,
                    companyState: values.companyState,
                    companyCountry: values.companyCountry,
                    companyEmail: values.companyEmail,
                    companyPhone: values.companyPhone,
                    companyWebsite: values.companyWebsite,
                    companyTaxNumber: values.companyTaxNumber,
                    companyRegNumber: values.companyRegNumber
                };
                await addCompany(transformedData);
            }

            dispatch(clearData());
            actions.resetForm();

        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [updateCompany, dispatch, addCompany, companyEditInitialValues, mode]);


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
