import React, { useEffect, useRef } from 'react'
import GridDataUi from '../../components/Grid/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { columns } from '../../constants/customer-table-data'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux-store/store'
import ToastUi from '../../components/ui/ToastifyUi'
import { useGetCustomersQuery } from '../../redux-store/customer/customerApi'

const CustomerList = () => {
    const { data: customers, error, isLoading } = useGetCustomersQuery();
    const buttons = [
        { label: 'Create User', icon: Add, onClick: () => navigate("/customer/create") },
    ];
    const navigate = useNavigate();
    const pathname = usePathname();
    const newData = customers?.map((item: any) => {
        return {
            ...item,
            id: item._id
        };
    });
    return (
        <>
            <ToastUi autoClose={1000} />
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi columns={columns} tableData={newData || []} checkboxSelection={false} />
        </>
    )
}

export default CustomerList
