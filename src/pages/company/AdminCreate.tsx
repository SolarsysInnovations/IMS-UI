// src/pages/company/AdminCreate.tsx

import React from 'react';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { AdminFields } from '../../constants/form-data/form-data-json';
import { customerInitialValues } from '../../constants/forms/formikInitialValues';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';

interface AdminCreateProps {
    setFormData: (data: any) => void;
    onSubmit: (values: any) => void;
}

const AdminCreate: React.FC<AdminCreateProps> = ({ setFormData, onSubmit }) => {
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
            headerName='Admin Profile'
            fields={AdminFields}
            initialValues={customerInitialValues}
            validationSchema={customerValidationSchema}
            onSubmit={handleSubmit}
            buttons={[]}
        />
    );
};

export default AdminCreate;
