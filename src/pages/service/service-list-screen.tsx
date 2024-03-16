import React, { useEffect, useRef } from 'react'
import GridDataUi from '../../components/Grid/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux-store/store'
import ModalUi from '../../components/ui/ModalUi'
import ToastUi from '../../components/ui/ToastifyUi'
import { fetchServiceList } from '../../redux-store/service/serviceSlice'
import { columns } from '../../constants/service-table-data'

const ServicesList = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchServiceList())
    }, [dispatch])
    // const { data: clientListData } = useSelector((state: RootState) => state.clientDataList);
    const { data: serviceList } = useSelector((state: RootState) => state.serviceList);

    const buttons = [
        { label: 'Create User', icon: Add, onClick: () => navigate("/client/create") },
    ];
    const navigate = useNavigate();
    const pathname = usePathname();
    const newData = serviceList.map((item: any) => {
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

export default ServicesList