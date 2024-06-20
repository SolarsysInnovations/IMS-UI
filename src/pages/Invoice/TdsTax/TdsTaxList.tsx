import React, { useEffect, useRef, useState } from 'react'
import GridDataUi from '../../../components/GridTable/GridData'
import TableHeader from '../../../components/layouts/TableHeader'
import usePathname from '../../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux-store/store'
import ToastUi from '../../../components/ui/ToastifyUi'
import { useGetServiceQuery } from '../../../redux-store/service/serviceApi'
import { useGetGstTypeQuery } from '../../../redux-store/invoice/gstTypeApi'
import { tdsTaxColumns } from '../../../constants/grid-table-data/invoice/TdsTax-table-data'
import { useGetTdsTaxQuery } from '../../../redux-store/invoice/tdsTaxApi'
import SnackBarUi from '../../../components/ui/Snackbar'
import { MyCellRenderer } from '../../../constants/grid-table-data/invoice/invoice-table-data'

const TdsTaxList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: getTdsTax, error, isLoading,refetch } = useGetTdsTaxQuery();
    const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false); 

    const handleDeleteSuccess = () => {
        setShowDeleteSuccessToast(true);
        setTimeout(() => {
            setShowDeleteSuccessToast(false);
        }, 3000);
         refetch();
         
    };
    return (
        <>
            {showDeleteSuccessToast && (
                <SnackBarUi
                    message="Successfully deleted the TdsTax"
                    severity= "success"
                    isSubmitting={true}
                />
            )}
            <GridDataUi showToolbar={false} onDeleteSuccess={handleDeleteSuccess} columns={tdsTaxColumns(handleDeleteSuccess)}  tableData={getTdsTax || []} checkboxSelection={false} />
        </>
    )
}

export default TdsTaxList