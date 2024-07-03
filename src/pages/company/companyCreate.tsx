// src/pages/company/CompanyCreate.tsx

import React from 'react';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { CompanyFields } from '../../constants/form-data/form-data-json';
import { customerInitialValues } from '../../constants/forms/formikInitialValues';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';

interface CompanyCreateProps {
    setFormData: (data: any) => void;
    onSubmit: (values: any) => void;
}

const CompanyCreate: React.FC<CompanyCreateProps> = ({ setFormData, onSubmit }) => {
    const updateFormValue = (setFieldValue: Function) => {
        // Implement if needed
    };

    const handleSubmit = (values: any) => {
        setFormData(values);
        onSubmit(values);
    };

    return (
        <DynamicFormCreate
            setData={setFormData}
            updateFormValue={updateFormValue}
            showTable={true}
            fields={CompanyFields}
            initialValues={customerInitialValues}
            validationSchema={customerValidationSchema}
            onSubmit={handleSubmit}
        />
    );
};

export default CompanyCreate;
