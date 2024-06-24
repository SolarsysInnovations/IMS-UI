import React, { useEffect, useRef, useState, useCallback } from 'react'
import GridDataUi from '../../components/GridTable/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { columns } from '../../constants/grid-table-data/customer-table-data'
import ToastUi from '../../components/ui/ToastifyUi'
import { useGetCustomersQuery, useUpdateCustomerMutation } from '../../redux-store/customer/customerApi'
import SnackBarUi from '../../components/ui/Snackbar'

const CustomerList = () => {
    const [updateCustomer, { isSuccess, isError }] = useUpdateCustomerMutation();
    const { data: customers, error, isLoading , refetch} = useGetCustomersQuery();

    const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false); 

    const handleDeleteSuccess = useCallback(() => {
        setShowDeleteSuccessToast(true);
        setTimeout(() => {
            setShowDeleteSuccessToast(false);
        }, 3000);
        refetch();
    }, [refetch]);
    

    const role = localStorage.getItem("userRole");
    const buttons = [];
    
    if (role != "APPROVER" && role != "ENDUSER") {
        buttons.push({ label: 'Create Customer', icon: Add, onClick: () => navigate("/customer/create") })
    }
        
    
    const navigate = useNavigate();
    const pathname = usePathname();

    return (
        <>
            {showDeleteSuccessToast && (
                <SnackBarUi
                    message="Successfully deleted the customer"
                    severity= "success"
                    isSubmitting={true}
                />
            )}
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} onDeleteSuccess={handleDeleteSuccess} columns={columns(handleDeleteSuccess)} tableData={customers || []} checkboxSelection={false} />
        </>
    )
}

export default CustomerList
