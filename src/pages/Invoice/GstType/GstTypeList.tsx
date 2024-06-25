import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { gstTypeColumns } from '../../../constants/grid-table-data/invoice/GstType-table-data'
import SnackBarUi from '../../../components/ui/Snackbar'



const GstTypeList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: gstTypeList, error, isLoading, refetch } = useGetGstTypeQuery();
    const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false); 

    const handleDeleteSuccess = useCallback(() => {
        setShowDeleteSuccessToast(true);
        setTimeout(() => {
            setShowDeleteSuccessToast(false);
        }, 3000);
         refetch();
         
    },[refetch]);
    return (
        <>
            {showDeleteSuccessToast && (
                <SnackBarUi
                    message="Successfully deleted the GstType"
                    severity= "success"
                    isSubmitting={true}
                />
            )}
            <GridDataUi showToolbar={false} onDeleteSuccess={handleDeleteSuccess} columns={gstTypeColumns(handleDeleteSuccess)} tableData={gstTypeList || []} checkboxSelection={false} />
        </>
    )
}

export default GstTypeList;