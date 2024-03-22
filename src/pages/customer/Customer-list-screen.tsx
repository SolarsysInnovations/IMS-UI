import React, { useEffect, useRef } from 'react'
import GridDataUi from '../../components/Grid/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { columns } from '../../constants/table-columns-data'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux-store/store'
import ToastUi from '../../components/ui/ToastifyUi'
import { fetchCustomerList } from '../../redux-store/customer/fetchClientList'

const CustomerList = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchCustomerList())
    }, [dispatch])
    // const { data: clientListData } = useSelector((state: RootState) => state.clientDataList);
    const { data: customerList } = useSelector((state: RootState) => state.customerList);

    const buttons = [
        { label: 'Create User', icon: Add, onClick: () => navigate("/customer/create") },
    ];
    const navigate = useNavigate();
    const pathname = usePathname();
    const newData = customerList.map((item: any) => {
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
        </>
    )
}

export default CustomerList