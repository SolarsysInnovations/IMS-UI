import React, { useEffect, useState, useCallback } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import SnackBarUi from '../../components/ui/Snackbar';
import ModalUi from '../../components/ui/ModalUi';
import { Box } from '@mui/material';
import CompanyCreate from './companyCreate';
import { columns } from '../../constants/grid-table-data/company-table-data';
import { sampleData } from '../../constants/data';

const CompanyList = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [companyFormData, setCompanyFormData] = useState<any>({});
    const [openModal, setOpenModal] = React.useState(false);
    const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false); 
    const [serviceList, setServiceList] = useState(sampleData);

    const buttons = [
        { label: 'Create Company', icon: Add, onClick: () => navigate("/company/create") },
    ];

    const handleSubmit = async (values: any) => {
        try {
            // Handle submission logic
            setOpenModal(false); // Close modal on successful submission
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleDeleteSuccess = useCallback(() => {
        setShowDeleteSuccessToast(true);
        setTimeout(() => {
            setShowDeleteSuccessToast(false);
        }, 3000);
        // Handle refetch logic if necessary
    }, []);

    const pathname = usePathname();
    const handleModalClose = () => {
        // Handle refetch logic if necessary
        setOpenModal(false);
    };

    useEffect(() => {
        // Handle refetch logic if necessary
    }, []);

    return (
        <>
            {showDeleteSuccessToast && (
                <SnackBarUi
                    message="Successfully deleted the service"
                    severity="success"
                    isSubmitting={true}
                />
            )}
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} onDeleteSuccess={handleDeleteSuccess} columns={columns(handleDeleteSuccess)} tableData={serviceList} checkboxSelection={false} />
            <ModalUi open={openModal} onClose={handleModalClose}>
                <Box sx={{ marginTop: "15px" }}>
                    <CompanyCreate setFormData={setCompanyFormData} onSubmit={handleSubmit} />
                </Box>
            </ModalUi>
        </>
    );
};

export default CompanyList;
