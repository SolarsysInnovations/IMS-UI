import React, { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import { useGetCompanySettingQuery } from "../../../redux-store/settings/companyDetailsApi";
import {
  useAddCompanySettingMutation,
  useUpdateCompanySettingMutation,
} from "../../../redux-store/settings/companyDetailsApi";
import { DynamicFormCreate } from "../../../components/Form-renderer/Dynamic-form";
import { companyDetailsValidationSchema } from "../../../constants/forms/validations/validationSchema";
import { companyInitialValues } from "../../../constants/forms/formikInitialValues";
import { clearData } from "../../../redux-store/global/globalState";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import { CompanyFormProps } from "../../../types/types";
import { Save } from "@mui/icons-material";
import {
  CompanyEditFields,
  CompanyDetailsFields,
} from "../../../constants/form-data/form-data-json";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";
import { setCredentials } from "../../../redux-store/auth/authSlice";

const CreateCompany = ({ companyValue, mode }: CompanyFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);

  const [
    addCompany,
    {
      isLoading: companyAddLoading,
      isSuccess: companyAddSuccess,
      isError: companyAddError,
      error: companyAddErrorObject,
    },
  ] = useAddCompanySettingMutation();

  const [
    updateCompany,
    {
      isLoading: companyUpdateLoading,
      isSuccess: companyUpdateSuccess,
      isError: companyUpdateError,
      error: companyUpdateErrorObject,
    },
  ] = useUpdateCompanySettingMutation();

  const { data: settingsList, refetch } = useGetCompanySettingQuery();

  const userDetailsFromStorage = window.localStorage.getItem("userDetails");

  // Parse userDetails if it exists
  let userDetails = userDetailsFromStorage
    ? JSON.parse(userDetailsFromStorage)
    : null;
  console.log("userDetails", userDetails.companyDetails);

  const initialValue = companyValue || companyInitialValues;

  const fields = CompanyDetailsFields;

  console.log("mode", mode);
  console.log("fields", fields);
  console.log("companyValue", companyValue);

  useSnackbarNotifications({
    error: companyAddError,
    errorObject: companyAddErrorObject,
    errorMessage: "Error creating Company",
    success: companyAddSuccess,
    successMessage: "Company created successfully",
  });

  useSnackbarNotifications({
    error: companyUpdateError,
    errorObject: companyUpdateErrorObject,
    errorMessage: "Error updating Company",
    success: companyUpdateSuccess,
    successMessage: "Company updated successfully",
  });

  useEffect(() => {
    refetch();
  }, [companyAddSuccess, companyUpdateSuccess, refetch]);

  const onSubmit = async (values: CompanyFormProps, actions: any) => {
    try {
      if (mode === "edit" && companyValue) {
        await updateCompany({
          id: userDetails?.companyDetails.id,
          company: values,
        });

        // Update userDetails in localStorage
        const userDetailsFromStorage = localStorage.getItem('userDetails');
        if (!userDetailsFromStorage) {
            throw new Error('User details not found in localStorage.');
        }

        // Parse userDetails from JSON string
        const userDetailsData = JSON.parse(userDetailsFromStorage);

        // Update only companyDetails with new values
        userDetailsData.companyDetails = {
            ...userDetailsData.companyDetails,  // Keep existing properties
            ...values  // Update with new form values
        };

        // Stringify updated userDetails back to JSON
        const updatedUserDetails = JSON.stringify(userDetailsData);

        // Store updated userDetails back in localStorage
        localStorage.setItem('userDetails', updatedUserDetails);

        


        dispatch(clearData());
      } else {
        await addCompany(values);
      }
      actions.resetForm();
      handleClose();
    } catch (error) {
      console.error("An error occurred during form submission:", error);
      toast.error("Error occurred while saving fields.");
    }
  };

  const updateFormValue = (setFieldValue: Function) => {
    // Update form values
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // useEffect(() => {
  //     if (isAddSuccess || isUpdateSuccess) {
  //         refetch(); // Refetch data after successful add or update
  //     }
  // }, [isAddSuccess, isUpdateSuccess, refetch]);

  return (
    <>
      <ToastContainer />
      <DynamicFormCreate
        showTable={true}
        headerName="Update your Company Information"
        updateFormValue={updateFormValue}
        fields={fields}
        initialValues={initialValue || []}
        validationSchema={companyDetailsValidationSchema}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default CreateCompany;
