import React, { useEffect, useRef } from 'react'
import GridDataUi from '../../components/Grid/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux-store/store'
import ToastUi from '../../components/ui/ToastifyUi'
import { columns } from '../../constants/invoice-table-data'
import { fetchInvoiceList } from '../../redux-store/invoice/invoiceSlice'

const InvoiceList = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchInvoiceList())
    }, [dispatch])
    // const { data: clientListData } = useSelector((state: RootState) => state.clientDataList);
    const { data: invoiceList } = useSelector((state: RootState) => state.invoiceList);

    const buttons = [
        { label: 'Create User', icon: Add, onClick: () => navigate("/invoice/create") },
    ];
    const navigate = useNavigate();
    const pathname = usePathname();
    const newData = invoiceList.map((item: any) => {
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

export default InvoiceList