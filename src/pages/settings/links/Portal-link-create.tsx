import React, { useEffect, useState } from "react";
import { linkFields } from "../../../constants/form-data/form-data-json";
import { linkInitialValues } from "../../../constants/forms/formikInitialValues";
import { DynamicFormCreate } from "../../../components/Form-renderer/Dynamic-form";
import { linkValidationSchema } from "../../../constants/forms/validations/validationSchema";
import { useAddPortalLinkMutation, useGetPortalLinkQuery, useUpdatePortalLinkMutation } from "../../../redux-store/api/injectedApis";
import { LinkFormProps } from "../../../types/types";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux-store/store';
import { clearData } from "../../../redux-store/global/globalState";
import { useNavigate } from 'react-router-dom';
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";

const PortalLinkCreate = ({ linkValue, handleClose }: LinkFormProps) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [addLink, { isLoading: linkAddLoading, isSuccess: linkAddSuccess, isError: linkAddError, error: linkAddErrorObject }] = useAddPortalLinkMutation();
  const [updateLink, { isLoading: linkUpdateLoading, isSuccess: linkUpdateSuccess, isError: linkUpdateError, error: linkUpdateErrorObject }] = useUpdatePortalLinkMutation();
  const { data: linkList, refetch } = useGetPortalLinkQuery();

  const initialValue = linkValue || linkInitialValues;

  const handleBackClick = () => {
    handleClose(); // Close modal
    navigate(0); // Navigate back
  };

  const updateFormValue = (setFieldValue: Function) => {
    // Update form values
  };

  useSnackbarNotifications({
    error: linkAddError,
    errorObject: linkAddErrorObject,
    errorMessage: 'Error creating Link',
    success: linkAddSuccess,
    successMessage: 'Link created successfully',
  });

  useSnackbarNotifications({
    error: linkUpdateError,
    errorObject: linkUpdateErrorObject,
    errorMessage: 'Error updating Link',
    success: linkUpdateSuccess,
    successMessage: 'Link updated successfully',
  });

  const onSubmit = async (values: LinkFormProps, actions: any) => {
    try {
      if (linkValue) {
        await updateLink({ id: linkValue.id, link: values }).unwrap();
      } else {
        await addLink(values).unwrap();
      }
      actions.resetForm();
      dispatch(clearData());
      handleClose(); // Close modal after saving
      refetch(); // Refetch updated list
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    }
  };

  useEffect(() => {
    if (linkAddSuccess || linkUpdateSuccess) {
      handleClose(); // Close modal on successful add or update
    }
  }, [linkAddSuccess, linkUpdateSuccess, handleClose]);

  return (
    <>
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
