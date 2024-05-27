import React, { useEffect, useRef } from 'react'
import GridDataUi from '../../components/GridTable/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux-store/store'
import ToastUi from '../../components/ui/ToastifyUi'
import { columns } from '../../constants/grid-table-data/invoice/invoice-table-data'
import { useGetInvoiceQuery } from '../../redux-store/invoice/invcoiceApi'

const InvoiceList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: invoiceList, error, isLoading } = useGetInvoiceQuery();
    const buttons = [
        { label: 'Create Invoice', icon: Add, onClick: () => navigate("/invoice/create") },
    ];
    const navigate = useNavigate();
    const pathname = usePathname();

    return (
        <>
            <ToastUi autoClose={1000} />
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns} tableData={invoiceList || []} checkboxSelection={false} />
        </>
    )
}

export default InvoiceList