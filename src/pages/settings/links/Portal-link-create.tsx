import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { linkFields } from "../../../constants/form-data/form-data-json";
import { linkInitialValues } from "../../../constants/forms/formikInitialValues";
import { DynamicFormCreate } from "../../../components/Form-renderer/Dynamic-form";
import { linkValidationSchema } from "../../../constants/forms/validations/validationSchema";
import { useAddLinkMutation, useGetLinkQuery, useUpdateLinkMutation } from "../../../redux-store/link/linkApi";
import { LinkFormProps } from "../../../types/types";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux-store/store';
import { clearData } from "../../../redux-store/global/globalState";
import { useNavigate } from 'react-router-dom';

const PortalLinkCreate = ({ linkValue }: LinkFormProps) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [addLink, { isLoading: isAdding, isSuccess: isAddSuccess, isError: isAddError }] = useAddLinkMutation();
  const [updateLink, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateLinkMutation();
  const { data: linkList, refetch } = useGetLinkQuery();

  const initialValue = linkValue || linkInitialValues;
  console.log("values", initialValue);
  const handleClose = () => {
    setOpenModal(false);
  };
  const updateFormValue = (setFieldValue: Function) => {
    // Update form values
  };
  const handleBackClick = () => {
    handleClose(); // Close modal
    navigate(0); // Navigate back
  };

  const onSubmit = async (values: LinkFormProps, actions: any) => {
    try {
      if (linkValue) {
        await updateLink({ id: linkValue.id, link: values });
        dispatch(clearData());
      } else {
        await addLink(values);
      }
      actions.resetForm();
      toast.success("Updated successfully!"); // Show toast after updating fields
      handleClose(); // Close modal after saving
    } catch (error) {
      console.error("An error occurred during form submission:", error);
      toast.error("Error occurred while saving fields."); // Show error toast if submission fails
    }
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
        headerName="New Link"
        updateFormValue={updateFormValue}
        showTable={true}
        fields={linkFields}
        initialValues={initialValue || []}
        validationSchema={linkValidationSchema}
        onSubmit={onSubmit}
        buttons={[
          { label: "Back", onClick: handleBackClick },
          { label: "Save", onClick: onSubmit }
        ]}
      />
    </>
  );
};

export default PortalLinkCreate;
