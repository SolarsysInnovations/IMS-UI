import React, { useEffect, useRef } from 'react'
import GridDataUi from '../../../components/GridTable/GridData'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux-store/store'
import ToastUi from '../../../components/ui/ToastifyUi'
import { useGetPaymentTermsQuery } from '../../../redux-store/invoice/paymentTerms'
import { paymentTermsColumns } from '../../../constants/grid-table-data/invoice/PaymentTerms-table-data'

const PaymentTermsList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { data: paymentTermsList, error, isLoading } = useGetPaymentTermsQuery();


    return (
        <>
            <ToastUi autoClose={1000} />
            <GridDataUi showToolbar={false} columns={paymentTermsColumns} tableData={paymentTermsList || []} checkboxSelection={false} />
        </>
    )
}

export default PaymentTermsList