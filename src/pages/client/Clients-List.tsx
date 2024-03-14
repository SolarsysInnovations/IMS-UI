import React, { useEffect, useRef } from 'react'
import GridDataUi from '../../components/Grid/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { columns } from '../../constants/table-columns-data'
import { useDispatch, useSelector } from 'react-redux'
import { clientListData } from '../../constants/clientData'
import { AppDispatch, RootState } from '../../redux-store/store'
import { fetchClientList } from '../../redux-store/client/fetchClientList'
import ReactToPrint from 'react-to-print'
import DemoScreen from '../Demo-screen'
import { Box, Button, Stack, Typography } from '@mui/material'
import TableContent from '../../components/Generate-Invoice/TableContent'
import ModalUi from '../../components/ui/ModalUi'
import ToastUi from '../../components/ui/ToastifyUi'

const ClientList = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchClientList())
    }, [dispatch])
    // const { data: clientListData } = useSelector((state: RootState) => state.clientDataList);
    const { data: clientList } = useSelector((state: RootState) => state.clientList);

    const buttons = [
        { label: 'Create User', icon: Add, onClick: () => navigate("/client/create") },
    ];
    const navigate = useNavigate();
    const pathname = usePathname();
    const newData = clientList.map((item: any) => {
        return {
            ...item,
            id: item._id // Rename _id to id
        };
    });
    console.log(newData);

    return (
        <>
            <ToastUi autoClose={1000} />
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi columns={columns} tableData={newData} checkboxSelection={false} />
            <ModalUi />
        </>
    )
}

export default ClientList