// src/pages/company/CompanyAdminCreate.tsx

import React, { useState } from 'react';
import { useAddCustomerMutation } from '../../redux-store/customer/customerApi';
import CompanyCreate from './companyCreate';
import AdminCreate from './AdminCreate';
import SnackBarUi from '../../components/ui/Snackbar';
import { sampleData } from '../../constants/data';

const CompanyAdminCreate: React.FC = () => {
    const [addCustomer, { isSuccess }] = useAddCustomerMutation();
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [companyFormData, setCompanyFormData] = useState<any>({});
    const [adminFormData, setAdminFormData] = useState<any>({});
    const [serviceList, setServiceList] = useState(sampleData);

    const handleSave = async (combinedData: any) => {
        try {
            await addCustomer(combinedData);
            setShowSuccessToast(true);
            setTimeout(() => {
                setShowSuccessToast(false);
            }, 2000);
            // Assuming you update serviceList after successful submission
            setServiceList([...serviceList, combinedData]); // Update serviceList with new data
        } catch (error) {
            console.log(error);
        }
    };

    const handleCompanySubmit = (values: any) => {
        const combinedData = { ...values, ...adminFormData };
        handleSave(combinedData);
    };

    const handleAdminSubmit = (values: any) => {
        const combinedData = { ...companyFormData, ...values };
        handleSave(combinedData);
    };

    return (
        <>
            {showSuccessToast && (
                <SnackBarUi
                    message="Successfully created the customer"
                    severity="success"
                    isSubmitting={true}
                />
            )}
            <CompanyCreate setFormData={setCompanyFormData} onSubmit={handleCompanySubmit} />
            <AdminCreate setFormData={setAdminFormData} onSubmit={handleAdminSubmit} />
        </>
    );
};

export default CompanyAdminCreate;
