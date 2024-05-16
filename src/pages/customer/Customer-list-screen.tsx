import React, { useEffect, useRef } from 'react'
import GridDataUi from '../../components/GridTable/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { columns } from '../../constants/grid-table-data/customer-table-data'
import ToastUi from '../../components/ui/ToastifyUi'
import { useGetCustomersQuery, useUpdateCustomerMutation } from '../../redux-store/customer/customerApi'

const CustomerList = () => {
    const [updateCustomer, { isSuccess, isError }] = useUpdateCustomerMutation();
    const { data: customers, error, isLoading } = useGetCustomersQuery();

    const role = localStorage.getItem("userRole");
    const buttons = [];
    
    if (role != "APPROVER" && role != "STANDARD USER") {
        buttons.push({ label: 'Create Customer', icon: Add, onClick: () => navigate("/customer/create") })
    }
        
    
    const navigate = useNavigate();
    const pathname = usePathname();

    return (
        <>
            <ToastUi autoClose={1000} />
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns || []} tableData={customers || []} checkboxSelection={false} />
        </>
    )
}

export default CustomerList
