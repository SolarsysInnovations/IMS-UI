import React, { useEffect, useRef } from 'react'
import GridDataUi from '../../components/GridTable/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux-store/store'
import ToastUi from '../../components/ui/ToastifyUi'
import { columns } from '../../constants/grid-table-data/service-table-data'
import { useGetServiceQuery } from '../../redux-store/service/serviceApi'
import ModalUi from '../../components/ui/ModalUi'
import { Box } from '@mui/material'
import ServiceCreate from './service-create-screen'
import { ToastContainer } from 'react-toastify'



const ServicesList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: serviceList, error, isLoading, refetch } = useGetServiceQuery();
    const serviceStateDetails = useSelector((state: any) => state.serviceState.data);

    const [openModal, setOpenModal] = React.useState(false);

    const buttons = [
        { label: 'Create Service List', icon: Add, onClick: () => setOpenModal(true) },
    ];

    const pathname = usePathname();
    const handleModalClose = () => {
        refetch()
        setOpenModal(false);
    }

    useEffect(() => {
        refetch();
    }, [serviceStateDetails])
    return (
        <>
            <ToastUi autoClose={1000} />
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns} tableData={serviceList || []} checkboxSelection={false} />
            <ModalUi open={openModal} onClose={handleModalClose}>
                <Box sx={{ marginTop: "15px" }}>
                    <ServiceCreate />
                </Box>
            </ModalUi>
            <ToastContainer />
        </>
    )
}

export default ServicesList