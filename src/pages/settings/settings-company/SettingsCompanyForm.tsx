import React, { useEffect, useState, useCallback } from "react";
import {
  useGetCompanySettingQuery,
  useAddCompanySettingMutation,
  useUpdateCompanySettingMutation,
  useGetCompanySettingByIdQuery,
} from "../../../redux-store/api/injectedApis";
import { DynamicFormCreate } from "../../../components/Form-renderer/Dynamic-form";
import { companyDetailsValidationSchema } from "../../../constants/forms/validations/validationSchema";
import { clearData } from "../../../redux-store/global/globalState";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import { CompanyFormProps } from "../../../types/types";
import { CompanyDetailsFields } from "../../../constants/form-data/form-data-json";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";
import { superAdminCompanyUsersInitialValues } from "../../../constants/forms/formikInitialValues";
import { selectUserDetails } from "../../../redux-store/auth/authSlice";
import { ToastContainer, toast } from 'react-toastify';

interface SettingsCompanyFormProps extends CompanyFormProps {
  handleCloseDialog: () => void;
}

const SettingsCompanyForm = ({ companyValue, mode, handleCloseDialog }: SettingsCompanyFormProps) => {
  console.log("companyValue", companyValue);
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
  const companyIdString = sessionStorage.getItem("id") || "";
  const { data: companyData, refetch: refetchCompanyData } = useGetCompanySettingByIdQuery(companyIdString);

  const userDetailsFromStorage = useSelector(selectUserDetails);
  const userDetails = typeof userDetailsFromStorage === 'string' ? JSON.parse(userDetailsFromStorage) : userDetailsFromStorage;
  console.log("userDetails", userDetails?.companyDetails);

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
      // Instead of refetching the entire list, you can refetch the specific company by its ID
      if (companyValue?.id) {
        refetchCompanyData();
      }
    }
  }, [companyAddSuccess, companyUpdateSuccess, companyValue, refetchCompanyData]);
  


//   useEffect(() => {
//     if (isAddSuccess || isUpdateSuccess) {
//         refetch(); // Refetch data after successful add or update
//     }
// }, [isAddSuccess, isUpdateSuccess, refetch]);


  const onSubmit = async (values: CompanyFormProps, actions: any) => {
    try {
        if (mode === "edit" && companyValue) {
            await updateCompany({ id: companyValue.id, company: values });
            dispatch(clearData());
        } else {
            await addCompany(values);
        }
        actions.resetForm();
        // toast.success("Saved successfully!"); // Show toast after updating fields
        handleCloseDialog(); // Close modal after saving
    } catch (error) {
        console.error("An error occurred during form submission:", error);
        toast.error("Error occurred while saving fields."); // Show error toast if submission fails
    }
};


  // const onSubmit = async (values: CompanyFormProps, actions: any) => {
  //   try {
  //     if (mode === "edit" && userDetails?.companyDetails) {
  //       await updateCompany({
  //         id: userDetails.companyDetails.id,
  //         company: values,
  //       });

  //       // Update userDetails in localStorage
  //       const userDetailsFromStorage = localStorage.getItem('userDetails');
  //       if (userDetailsFromStorage) {
  //         const userDetailsData = JSON.parse(userDetailsFromStorage);

  //         // Update only companyDetails with new values
  //         userDetailsData.companyDetails = {
  //           ...userDetailsData.companyDetails,
  //           ...values,
  //         };

  //         // Store updated userDetails back in localStorage
  //         localStorage.setItem('userDetails', JSON.stringify(userDetailsData));
  //       } else {
  //         throw new Error('User details not found in localStorage.');
  //       }

  //       dispatch(clearData());
  //     } else {
  //       await addCompany(values);
  //     }
  //     actions.resetForm();
  //     handleCloseDialog();
  //   } catch (error) {
  //     console.error("An error occurred during form submission:", error);
  //   }
  // };

  const updateFormValue = (setFieldValue: Function) => {
    
    // Update form values
  };

  return (
    <>

<ToastContainer />
            {/* <DynamicFormCreate
                showTable={true}
                headerName="Update your Company Information"
                updateFormValue={updateFormValue}
                fields={CompanyDetailsFields}
                initialValues={initialValue || []}
                validationSchema={companyDetailsValidationSchema}
                onSubmit={onSubmit}
                buttons={[
                    { label: 'Save',icon: Save, onClick: onSubmit }
                ]}
            /> */}


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
