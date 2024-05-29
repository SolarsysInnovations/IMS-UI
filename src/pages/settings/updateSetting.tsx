import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Box, Grid } from "@mui/material";
import { useGetSettingQuery } from "../../redux-store/settings/settingsApi";
import { useAddSettingMutation, useUpdateSettingMutation } from '../../redux-store/settings/settingsApi';
import usePathname from "../../hooks/usePathname";
import { useNavigate } from "react-router-dom";
import { DynamicFormCreate } from "../../components/Form-renderer/Dynamic-form";
import { companyValidationSchema } from '../../constants/forms/validations/validationSchema';
import { companyInitialValues } from '../../constants/forms/formikInitialValues';
import { companyFields } from '../../constants/form-data/form-data-json';


const UpdateScreen = () => {
    const [addSetting, { isLoading, isSuccess, isError, error }] = useAddSettingMutation();
    const [data, setData] = useState<any>();
    const navigate = useNavigate();
    const pathname = usePathname();
    const [updateSetting,] = useUpdateSettingMutation();
    const onSubmit = async (values: any, actions: any) => {
        try {
            const id: number = values?._id
            await addSetting({
                id: id,
                settings: values,
            });
            actions.resetForm();
      } catch (error) {
            console.log(error);
        }
     };
     const updateFormValue = (setFieldValue: Function) => {
    
     };
     
    return (
        <div>
            <ToastContainer />
            <DynamicFormCreate
                  showTable={true}
                  headerName="Update your Company Information"
                    setData={setData}
                    updateFormValue={updateFormValue}
                    fields={companyFields}
                    initialValues={companyInitialValues || []}
                    validationSchema={companyValidationSchema}
                    onSubmit={onSubmit}
                    buttons={[
                      { label: 'Save', onClick: onSubmit }
                   ]}
                  />
                  </div>
    );
};

export default UpdateScreen;
