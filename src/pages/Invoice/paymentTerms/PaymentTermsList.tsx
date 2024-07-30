import GridDataUi from '../../../components/GridTable/GridData'
import { useGetPaymentTermsQuery } from '../../../redux-store/invoice/paymentTerms'
import { paymentTermsColumns } from '../../../constants/grid-table-data/invoice/PaymentTerms-table-data'

const PaymentTermsList = () => {
    const { data: paymentTermsList, error, isLoading, refetch } = useGetPaymentTermsQuery();

    return (
        <>
            <GridDataUi showToolbar={false} columns={paymentTermsColumns} tableData={paymentTermsList || []} checkboxSelection={false} />
        </>
    )
}

export default PaymentTermsList