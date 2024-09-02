import GridDataUi from '../../../components/GridTable/GridData'
import { paymentTermsColumns } from '../../../constants/grid-table-data/invoice/PaymentTerms-table-data'
import { useGetPaymentTermsListQuery } from '../../../redux-store/api/injectedApis';

const PaymentTermsList = () => {

    const { data: paymentTermsList, error, isLoading, refetch } = useGetPaymentTermsListQuery();

    return (
        <>
            <GridDataUi showToolbar={false} columns={paymentTermsColumns} tableData={paymentTermsList || []} checkboxSelection={false} />
        </>
    )
}

export default PaymentTermsList