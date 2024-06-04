import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { linkFields } from "../../constants/form-data/form-data-json";
import { linkInitialValues } from "../../constants/forms/formikInitialValues";
import { DynamicFormCreate } from "../../components/Form-renderer/Dynamic-form";
import { linkValidationSchema } from "../../constants/forms/validations/validationSchema";
import { useAddLinkMutation } from "../../redux-store/link/linkApi";

const LinkCreation: React.FC = () => {
  const[addLink]= useAddLinkMutation();
  const onSubmit = async (values: any, actions: any) => {
    try {
      console.log("links", values);
      actions.resetForm();
      await addLink(values);
    } catch (error) {
      console.log(error);
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
