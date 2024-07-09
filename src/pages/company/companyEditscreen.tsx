import React, { useState } from 'react';
import { useUpdateCompanyMutation } from '../../redux-store/company/companiesApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SnackBarUi from '../../components/ui/Snackbar';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { companyFields } from '../../constants/form-data/form-data-json';
import { customerValidationSchema } from '../../constants/forms/validations/validationSchema';

interface CompanyDetailsProps {
    details: any;
}

const CompanyEdit = ({ details }: CompanyDetailsProps) => {
    const [updateCompany, { isLoading, isSuccess, isError, error }] = useUpdateCompanyMutation();
    const companyStateDetails = useSelector((state: any) => state.companyState?.data ?? {});
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const navigate = useNavigate(); 

    const onSubmit = async (values: any, actions: any) => {
        try {
            const id: number = values?.id;
            await updateCompany({
                id: id,
                company: values,
            });
            setShowSuccessToast(true);
            setTimeout(() => {
                setShowSuccessToast(false);
                navigate(-1);
            }, 1000);
            actions.resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {/* Show Snackbar UI when the success toast is triggered */}
            {showSuccessToast && (
                <SnackBarUi
                    message="Successfully edited the customer"
                    severity="success"
                    isSubmitting={true}
                />
            )}
            {/* Render DynamicFormCreate with company details if available */}
            {Object.keys(companyStateDetails).length > 0 && (
                <DynamicFormCreate
                    headerName='Customer Edit'
                    showTable={true}
                    fields={companyFields}
                    initialValues={details || companyStateDetails}
                    validationSchema={customerValidationSchema}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

export default CompanyEdit;
