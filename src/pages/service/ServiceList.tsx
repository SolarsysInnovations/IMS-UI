import React, { useEffect, useState } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import { columns } from '../../constants/grid-table-data/service-table-data';
import { useGetServiceQuery } from '../../redux-store/service/serviceApi';
import ModalUi from '../../components/ui/ModalUi';
import { Box } from '@mui/material';
import ServiceCreate from './ServiceCreate';

const ServicesList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: serviceList, error, isLoading, refetch } = useGetServiceQuery();
    const serviceStateDetails = useSelector((state: any) => state.serviceState.data);

    const [openModal, setOpenModal] = useState(false);

    const buttons = [
        { label: 'Create Service', icon: Add, onClick: () => { setOpenModal(true); } },
    ];

    const pathname = usePathname();
    const handleModalClose = () => {
        refetch();
        setOpenModal(false);
    };

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <>
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns || []} tableData={serviceList || []} checkboxSelection={false} />
        </>
    );
};

export default ServicesList;
