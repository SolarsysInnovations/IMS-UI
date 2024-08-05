import React, { useEffect, useState } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, } from '../../redux-store/store';
import { columns } from '../../constants/grid-table-data/service-table-data';
import { useGetServiceQuery } from '../../redux-store/service/serviceApi';
import ModalUi from '../../components/ui/ModalUi';
import { Box } from '@mui/material';
import ServiceCreate from './service-create-screen';
import ServiceEditScreen from './service-edit-screen'; // Import the edit screen

const ServicesList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: serviceList, error, isLoading, refetch } = useGetServiceQuery();
    const serviceStateDetails = useSelector((state: any) => state.serviceState.data);

    const [openModal, setOpenModal] = useState(false);
    const [editMode, setEditMode] = useState(false); // State to determine if edit mode is active

    const buttons = [
        { label: 'Create Service List', icon: Add, onClick: () => { setOpenModal(true); setEditMode(false); } },
    ];

    const pathname = usePathname();
    const handleModalClose = () => {
        refetch();
        setOpenModal(false);
    };

    const handleEditClick = (serviceId: any) => {
        // Logic to fetch and set the service data to be edited
        setEditMode(true);
        setOpenModal(true);
    };

    useEffect(() => {
        refetch();
    }, []);

    return (
        <>
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns || []} tableData={serviceList || []} checkboxSelection={false} onEditClick={handleEditClick} />
            <ModalUi open={openModal} onClose={handleModalClose}>
                <Box sx={{ marginTop: "15px" }}>
                    {editMode ? (
                        <ServiceEditScreen onSuccess={handleModalClose} />
                    ) : (
                        <ServiceCreate onSuccess={handleModalClose} />
                    )}
                </Box>
            </ModalUi>
        </>
    );
};

export default ServicesList;
