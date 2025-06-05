import { useQueryClient } from '@tanstack/react-query';
import GridDataUi from '../../../components/GridTable/GridData';
import { paymentTermsColumns } from '../../../constants/grid-table-data/invoice/PaymentTerms-table-data';

const PaymentTermsList = () => {
  const queryclient = useQueryClient();
  const paymentTermsList = queryclient.getQueryData(['getPaymentTerms']);

  return (
    <GridDataUi
      showToolbar={false}
      columns={paymentTermsColumns}
      tableData={paymentTermsList ?? []}
      checkboxSelection={false}
    />
  );
};

export default PaymentTermsList;
