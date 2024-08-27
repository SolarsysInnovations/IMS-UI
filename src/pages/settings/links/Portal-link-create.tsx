import React, { useEffect, useState } from "react";
import { linkFields } from "../../../constants/form-data/form-data-json";
import { linkInitialValues } from "../../../constants/forms/formikInitialValues";
import { DynamicFormCreate } from "../../../components/Form-renderer/Dynamic-form";
import { linkValidationSchema } from "../../../constants/forms/validations/validationSchema";
import { useAddPortalLinkMutation, useGetPortalLinkQuery, useUpdatePortalLinkMutation }  from "../../../redux-store/api/injectedApis";
import { LinkFormProps } from "../../../types/types";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux-store/store';
import { clearData } from "../../../redux-store/global/globalState";
import { useNavigate } from 'react-router-dom';

const PortalLinkCreate = ({ linkValue }: LinkFormProps) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [addLink, { isLoading: isAdding, isSuccess: isAddSuccess, isError: isAddError }] = useAddPortalLinkMutation();
  const [updateLink, { isLoading: isUpdating, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdatePortalLinkMutation();
  const { data: linkList, refetch } = useGetPortalLinkQuery();

  const initialValue = linkValue || linkInitialValues;
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
      handleClose(); // Close modal after saving
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    }
  };

  useEffect(() => {
    if (isAddSuccess || isUpdateSuccess) {
      refetch(); // Refetch data after successful add or update
    }
  }, [isAddSuccess, isUpdateSuccess, refetch]);

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
