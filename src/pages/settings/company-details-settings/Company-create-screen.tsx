import React, { useEffect, useState, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from "@mui/material";
import { useGetCompanySettingQuery} from "../../../redux-store/settings/companyDetailsApi";
import { useAddCompanySettingMutation, useUpdateCompanySettingMutation } from '../../../redux-store/settings/companyDetailsApi';
import { DynamicFormCreate } from "../../../components/Form-renderer/Dynamic-form";
import { companyValidationSchema } from '../../../constants/forms/validations/validationSchema';
import { companyInitialValues } from '../../../constants/forms/formikInitialValues';
import { companyFields } from '../../../constants/form-data/form-data-json';
import { clearData } from '../../../redux-store/global/globalState';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux-store/store';
import { CompanyFormProps } from '../../../types/types';

const CreateCompany = ({ companyValue }: CompanyFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = useState(false);
    const [addCompany, { isLoading: isAdding, isSuccess: isAddSuccess, isError: isAddError }] = useAddCompanySettingMutation();
    const [updateCompany, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateCompanySettingMutation();
    const { data: settingsList, refetch } = useGetCompanySettingQuery();

    const initialValue = companyValue || companyInitialValues;

    const onSubmit = async (values: CompanyFormProps, actions: any) => {
        try {
            if (companyValue) {
                await updateCompany({ id: companyValue.id, company: values });
                dispatch(clearData());
            } else {
                await addCompany(values);
            }
            actions.resetForm();
            // toast.success("Saved successfully!"); // Show toast after updating fields
            handleClose(); // Close modal after saving
        } catch (error) {
            console.error("An error occurred during form submission:", error);
            toast.error("Error occurred while saving fields."); // Show error toast if submission fails
        }
    };

    const updateFormValue = (setFieldValue: Function) => {
        // Update form values
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        if (isAddSuccess || isUpdateSuccess) {
            refetch(); // Refetch data after successful add or update
        }
    }, [isAddSuccess, isUpdateSuccess, refetch]);

    return (
        <>
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
        </>
    );
};

export default CreateCompany;
