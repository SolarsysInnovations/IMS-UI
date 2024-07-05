import React, { useEffect, useState } from 'react';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { CompanyFields } from '../../constants/form-data/form-data-json';
import { companyDetailsInitialValues } from '../../constants/forms/formikInitialValues';
import { companyValidationSchema } from '../../constants/forms/validations/validationSchema';
import { useAddCompanyMutation } from '../../redux-store/company/companiesApi';
import SnackBarUi from '../../components/ui/Snackbar';

interface CompanyCreateProps {
    setFormData: (data: any) => void;
    onSubmit: (values: any) => void;
}

const CompanyCreate: React.FC<CompanyCreateProps> = ({ setFormData, onSubmit }) => {
    const [addCompany, { isLoading, isSuccess, isError, error }] = useAddCompanyMutation();
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const updateFormValue = (setFieldValue: Function) => {
        // Implement if needed
    };

    const handleFormSubmit = async (values: any, actions: any) => {
        try {
            await addCompany(values);
            actions.resetForm();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setShowSuccessToast(true);
            setTimeout(() => {
                setShowSuccessToast(false);
            }, 2000);
        }
    }, [isSuccess]);

    const handleSubmit = (values: any) => {
        setFormData(values);
        handleFormSubmit(values, {});
    };

    return (
        <>
            {showSuccessToast && (
                <SnackBarUi
                    message="Successfully created the company"
                    severity="success"
                    isSubmitting={true}
                />
            )}
            <DynamicFormCreate
                setData={setFormData}
                updateFormValue={updateFormValue}
                showTable={true}
                fields={CompanyFields}
                initialValues={companyDetailsInitialValues}
                validationSchema={companyValidationSchema}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default CompanyCreate;
