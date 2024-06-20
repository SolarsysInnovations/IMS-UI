import React, { useEffect, useRef, useState } from 'react'
import GridDataUi from '../../../components/GridTable/GridData'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux-store/store'
import ToastUi from '../../../components/ui/ToastifyUi'
import { useGetPaymentTermsQuery } from '../../../redux-store/invoice/paymentTerms'
import { paymentTermsColumns } from '../../../constants/grid-table-data/invoice/PaymentTerms-table-data'
import SnackBarUi from '../../../components/ui/Snackbar'

const PaymentTermsList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: paymentTermsList, error, isLoading,refetch } = useGetPaymentTermsQuery();
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
                    message="Successfully deleted the paymentTerms"
                    severity= "success"
                    isSubmitting={true}
                />
            )}
            <GridDataUi showToolbar={false} onDeleteSuccess={handleDeleteSuccess}  columns={paymentTermsColumns(handleDeleteSuccess)} tableData={paymentTermsList || []} checkboxSelection={false} />
        </>
    )
}

export default PaymentTermsList