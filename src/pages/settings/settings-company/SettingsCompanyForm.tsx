import React, { useEffect, useState } from "react";
import { useGetCompanySettingQuery } from "../../../redux-store/settings/companyDetailsApi";
import {
  useAddCompanySettingMutation,
  useUpdateCompanySettingMutation,
} from "../../../redux-store/settings/companyDetailsApi";
import { DynamicFormCreate } from "../../../components/Form-renderer/Dynamic-form";
import { companyDetailsValidationSchema } from "../../../constants/forms/validations/validationSchema";
import { clearData } from "../../../redux-store/global/globalState";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import { CompanyFormProps } from "../../../types/types";
import { CompanyDetailsFields, } from "../../../constants/form-data/form-data-json";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";
import { superAdminCompanyUsersInitialValues } from "../../../constants/forms/formikInitialValues";

const SettingsCompanyForm = ({ companyValue, mode }: CompanyFormProps) => {
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

  const initialValue = companyValue || superAdminCompanyUsersInitialValues;

  const fields = CompanyDetailsFields;


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

export default SettingsCompanyForm;
