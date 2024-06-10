import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { linkFields } from "../../constants/form-data/form-data-json";
import { linkInitialValues } from "../../constants/forms/formikInitialValues";
import { DynamicFormCreate } from "../../components/Form-renderer/Dynamic-form";
import { linkValidationSchema } from "../../constants/forms/validations/validationSchema";
import { useAddLinkMutation } from "../../redux-store/link/linkApi";

const LinkCreation: React.FC = () => {
  const [addLink] = useAddLinkMutation();

  const onSubmit = async (values: any, actions: any) => {
    try {
      console.log("links", values);
      await addLink(values);
      actions.resetForm();
      toast.success("Link added successfully!"); // Show success toast
    } catch (error) {
      console.error("Error adding link:", error);
      toast.error("Error adding link. Please try again."); // Show error toast
    }
  };

  return (
    <div>
      <ToastContainer />
      <DynamicFormCreate
        headerName="New Link"
        showTable={true}
        fields={linkFields}
        initialValues={linkInitialValues}
        validationSchema={linkValidationSchema}
        onSubmit={onSubmit}
        // buttons={[{ label: "Save", onClick: onSubmit }]}
      />
    </div>
  );
};

export default LinkCreation;
