import React, { useEffect, useRef, useState, useCallback } from 'react'
import GridDataUi from '../../../components/GridTable/GridData'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux-store/store'
import ToastUi from '../../../components/ui/ToastifyUi'
import { useGetPaymentTermsQuery } from '../../../redux-store/invoice/paymentTerms'
import { paymentTermsColumns } from '../../../constants/grid-table-data/invoice/PaymentTerms-table-data'
import SnackBarUi from '../../../components/ui/Snackbar'

const PaymentTermsList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: paymentTermsList, error, isLoading, refetch } = useGetPaymentTermsQuery();
    const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false);

    const handleDeleteSuccess = useCallback(() => {
        setShowDeleteSuccessToast(true);
        setTimeout(() => {
            setShowDeleteSuccessToast(false);
        }, 3000);
        refetch();

    }, [refetch]);

    return (
        <>
            <GridDataUi showToolbar={false} onDeleteSuccess={handleDeleteSuccess} columns={paymentTermsColumns} tableData={paymentTermsList || []} checkboxSelection={false} />
        </>
    )
}

export default PaymentTermsList