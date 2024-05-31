import React, { useEffect, useState, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { Box, Grid } from "@mui/material";
import { useGetSettingQuery } from "../../redux-store/settings/settingsApi";
import { useAddSettingMutation, useUpdateSettingMutation} from '../../redux-store/settings/settingsApi';
import usePathname from "../../hooks/usePathname";
import { useNavigate } from "react-router-dom";
import { DynamicFormCreate } from "../../components/Form-renderer/Dynamic-form";
import { companyValidationSchema } from '../../constants/forms/validations/validationSchema';
import { companyInitialValueProps, CompanyFormProps } from '../../types/types';
import { companyInitialValues } from '../../constants/forms/formikInitialValues';
import { companyFields } from '../../constants/form-data/form-data-json';
import { clearData } from '../../redux-store/global/globalState';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import SettingScreen from '../settings/settings';

const CreateCompany = ({ companyValue }: CompanyFormProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [addCompany, { isLoading: isAdding, isSuccess: isAddSuccess, isError: isAddError }] = useAddSettingMutation();

    const [updateCompany, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateSettingMutation();

    const { data: companyList, refetch } = useGetSettingQuery();

    const initialValue = companyValue || companyInitialValues;
    
    const onSubmit = useMemo(() => async (values: CompanyFormProps, actions: any) => {
        try {
            if (companyValue) {
                await updateCompany({ id: companyValue.id, settings: values });
                dispatch(clearData());
            } else {
                await addCompany(values);
            }
            actions.resetForm();
        } catch (error) {
            console.error("An error occurred during form submission:", error);
        } finally {
            actions.setSubmitting(false);
        }
    }, [addCompany, updateCompany, companyValue]);

     const updateFormValue = (setFieldValue: Function) => {
    
     };
     
    return (
        <div>
            <ToastContainer />
            <DynamicFormCreate
                    showTable={true}
                    headerName="Update your Company Information"
                    updateFormValue={updateFormValue}
                    fields={companyFields}
                    initialValues={initialValue || []}
                    validationSchema={companyValidationSchema}
                    onSubmit={onSubmit}
                    buttons={[
                      { label: 'Save', onClick: onSubmit }
                   ]}
                  />
                  </div>
    );
};

 export default CreateCompany;