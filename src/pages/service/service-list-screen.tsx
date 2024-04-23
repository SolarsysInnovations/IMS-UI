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



const ServicesList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: serviceList, error, isLoading } = useGetServiceQuery();

    const buttons = [
        { label: 'Create Service List', icon: Add, onClick: () => navigate("/service/create") },
    ];
    const navigate = useNavigate();
    const pathname = usePathname();
    const newData = serviceList?.map((item: any) => {
        return {
            ...item,
            id: item._id
        };
    }) || [];
    console.log(newData);

    return (
        <>
            <ToastUi autoClose={1000} />
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns} tableData={newData} checkboxSelection={false} />
        </>
    )
}

export default ServicesList