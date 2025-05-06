import React, { useEffect } from "react";
import {
  useAddCompanySettingMutation,
  useUpdateCompanySettingMutation,
  useGetCompanySettingByIdQuery,
} from "../../../redux-store/api/injectedApis";
import { DynamicFormCreate } from "../../../components/Form-renderer/Dynamic-form";
import { companyDetailsValidationSchema } from "../../../constants/forms/validations/validationSchema";
import { clearData } from "../../../redux-store/global/globalState";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import { CompanyFormProps } from "../../../types/types";
import { CompanyDetailsFields } from "../../../constants/form-data/form-data-json";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";
import { superAdminCompanyUsersInitialValues } from "../../../constants/forms/formikInitialValues";
import { ToastContainer, toast } from "react-toastify";

interface SettingsCompanyFormProps extends CompanyFormProps {
  handleCloseDialog: () => void;
}

const SettingsCompanyForm = ({
  companyValue,
  mode,
  handleCloseDialog,
}: SettingsCompanyFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [
    addCompany,
    {
      isSuccess: companyAddSuccess,
      isError: companyAddError,
      error: companyAddErrorObject,
    },
  ] = useAddCompanySettingMutation();

  const [
    updateCompany,
    {
      isSuccess: companyUpdateSuccess,
      isError: companyUpdateError,
      error: companyUpdateErrorObject,
    },
  ] = useUpdateCompanySettingMutation();
  const companyIdString = sessionStorage.getItem("id") || "";
  const { refetch: refetchCompanyData } =
    useGetCompanySettingByIdQuery(companyIdString);

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
    if (companyAddSuccess || companyUpdateSuccess) {
      if (companyValue?.id) {
        refetchCompanyData();
      }
    }
  }, [
    companyAddSuccess,
    companyUpdateSuccess,
    companyValue,
    refetchCompanyData,
  ]);

  const onSubmit = async (values: CompanyFormProps, actions: any) => {
    try {
      if (mode === "edit" && companyValue) {
        await updateCompany({ id: companyValue.id, company: values });
        dispatch(clearData());
      } else {
        await addCompany(values);
      }
      actions.resetForm();
      handleCloseDialog();
    } catch (error) {
      console.error("An error occurred during form submission:", error);
      toast.error("Error occurred while saving fields.");
    }
  };

  const updateFormValue = (setFieldValue: Function) => {
  };

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

export default SettingsCompanyForm;
