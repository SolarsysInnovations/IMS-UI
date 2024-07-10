import React, { useEffect, useMemo, useState } from 'react';
import { useGetCompanyQuery, useAddCompanyMutation, useUpdateCompanyMutation } from '../../redux-store/company/companiesApi';
import { CompanyEditFields, CompanyCreateFields, CompanyFields } from '../../constants/form-data/form-data-json';
import { companyInitialValues } from '../../constants/forms/formikInitialValues';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { companyValidationSchema } from '../../constants/forms/validations/validationSchema';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import { companyDetailsInitialValueProps } from '../../types/types';
import { clearData } from '../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';

interface CompanyValueProps {
    companyEditInitialValues: any;
};

const CompanyCreate = ({ companyEditInitialValues }: CompanyValueProps) => {
    console.log("companyEditInitialValues initial", companyEditInitialValues);

    const [addCompany, { isLoading: companyAddLoading, isSuccess: companyAddSuccess, isError: companyAddError, error: companyAddErrorObject }] = useAddCompanyMutation();
    const [updateCompany, { isLoading: companyUpdateLoading, isSuccess: companyUpdateSuccess, isError: companyUpdateError, error: companyUpdateErrorObject }] = useUpdateCompanyMutation();
    const { data: company, error, isLoading, refetch } = useGetCompanyQuery();
    const dispatch = useDispatch<AppDispatch>();
    
    const initialValues = companyEditInitialValues || companyInitialValues;

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

    const onSubmit = useMemo(() => async (values: companyDetailsInitialValueProps, actions: any) => {
        try {
            console.log("values", values);

            if (companyEditInitialValues) {
                const id: number = values?.id;
                const transformedData = {
                    register: {
                        userName: values.userName,
                        userEmail: values.userEmail,
                        // password: values.password,
                        userRole: values.userRole,
                        userMobile: values.userMobile,
                        userAccess: values.userAccess,
                        description: values.description,
                    },
                    companyDetails: {
                        companyName: values.companyName,
                        companyAddress: values.companyAddress,
                        companyState: values.companyState,
                        companyCountry: values.companyCountry,
                        companyEmail: values.companyEmail,
                        companyPhone: values.companyPhone,
                        companyCell: values.companyCell,
                        companyWebsite: values.companyWebsite,
                        companyTaxNumber: values.companyTaxNumber,
                        companyRegNumber: values.companyRegNumber
                    }
                };
                await updateCompany({ id: id, company: transformedData });
                dispatch(clearData());
                actions.resetForm();
            } else {
                const transformedData = {
                    register: {
                        userName: values.userName,
                        userEmail: values.userEmail,
                        password: values.password,
                        userRole: values.userRole,
                        userMobile: values.userMobile,
                        userAccess: values.userAccess,
                        description: values.description,
                    },
                    companyDetails: {
                        companyName: values.companyName,
                        companyAddress: values.companyAddress,
                        companyState: values.companyState,
                        companyCountry: values.companyCountry,
                        companyEmail: values.companyEmail,
                        companyPhone: values.companyPhone,
                        companyCell: values.companyCell,
                        companyWebsite: values.companyWebsite,
                        companyTaxNumber: values.companyTaxNumber,
                        companyRegNumber: values.companyRegNumber
                    }
                };
                console.log('transformedData', transformedData);

                await addCompany(transformedData);
                dispatch(clearData());
                actions.resetForm();
            }
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [addCompany, updateCompany, companyEditInitialValues, dispatch]);

    
    return (
        <>
            <DynamicFormCreate
                showTable={true}
                fields={Object.keys(companyEditInitialValues).length === 0 ? CompanyFields : CompanyEditFields}
                initialValues={initialValues}
                validationSchema={companyValidationSchema}
                onSubmit={onSubmit}
            />
        </>
    );
};

export default CompanyCreate;
