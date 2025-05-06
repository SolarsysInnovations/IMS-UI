import React, { useEffect, useMemo, useState } from "react";
import * as Yup from "yup"; // Import Yup for validation
import {
  CompanyEditFields,
  CompanyFields,
} from "../../constants/form-data/form-data-json";
import { DynamicFormCreate } from "../../components/Form-renderer/Dynamic-form";
import { useSnackbarNotifications } from "../../hooks/useSnackbarNotification";
import { clearData } from "../../redux-store/global/globalState";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import { SuperAdminUsersInitialValueProps } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { superAdminCompanyUsersInitialValues } from "../../constants/forms/formikInitialValues";
import {
  useCreateUserMutation,
  useGetUsersListQuery,
  useUpdateUserMutation,
} from "../../redux-store/api/injectedApis";
import { companyDetailsValidationSchema } from "../../constants/forms/validations/validationSchema";

interface CompanyValueProps {
  companyEditInitialValues: any;
  mode: "create" | "edit";
}

const CompanyCreate = ({
  companyEditInitialValues,
  mode,
}: CompanyValueProps) => {
  const [
    addCompany,
    {
      isLoading: companyAddLoading,
      isSuccess: companyAddSuccess,
      isError: companyAddError,
      error: companyAddErrorObject,
    },
  ] = useCreateUserMutation();
  const [
    updateCompany,
    {
      isLoading: companyUpdateLoading,
      isSuccess: companyUpdateSuccess,
      isError: companyUpdateError,
      error: companyUpdateErrorObject,
    },
  ] = useUpdateUserMutation();
  const { data: company, error, isLoading, refetch } = useGetUsersListQuery();
  const [data, setData] = useState<any>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const initialValues =
    mode === "edit"
      ? companyEditInitialValues
      : superAdminCompanyUsersInitialValues;

  // Dynamically modify fields based on 'mode'
  const fields = useMemo(() => {
    if (mode === "create") {
      return CompanyFields; // Include password field
    } else {
      // Filter out password field in edit mode
      const editedFields = CompanyEditFields.map((section) => ({
        ...section,
        subFields:
          section.subFields?.filter((field) => field.name !== "password") || [], // Ensure subFields is not undefined
      }));
      return editedFields;
    }
  }, [mode]);

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
    if (companyUpdateSuccess) {
      navigate(-1);
    }
    refetch();
  }, [companyAddSuccess, companyUpdateSuccess, refetch]);

  const onSubmit = async (values: any, actions: any) => {
    try {
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

      if (mode === "edit" && companyEditInitialValues?.id) {
        await updateCompany({
          id: companyEditInitialValues.id,
          data: transformedData,
        });
      } else {
        await addCompany(transformedData);
      }

      actions.resetForm();
      dispatch(clearData());
    } catch (error) {
      console.error("Error during form submission:", error); // Debugging
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (companyAddSuccess || companyUpdateSuccess) {
      navigate(-1); // Redirect after successful submission
    }
  }, [companyAddSuccess, companyUpdateSuccess, navigate]);

  return (
    <div style={{ maxHeight: "90vh", overflowY: "auto", paddingRight: "1rem" }}>
      <DynamicFormCreate
        setData={setData}
        headerName={mode === "edit" ? "Company Edit" : "Company Create"}
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
