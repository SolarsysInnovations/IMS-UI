import GridDataUi from '../../../components/GridTable/GridData';
import { GridColDef } from '@mui/x-data-grid';
import { useGetInvoiceListQuery } from '../../../redux-store/api/injectedApis';
import { CircularProgress, Typography } from '@mui/material';

export const columns: GridColDef[] = [
  {
    field: 'companyName',
    headerName: 'Company Name',
    width: 150,
    editable: true,
  },
  {
    field: 'noOfCustomers',
    headerName: 'No of Customers',
    width: 150,
    editable: true,
  },
  {
    field: 'noOfUsers',
    headerName: 'No of Users',
    width: 150,
    editable: true,
  },
  {
    field: 'noOfInvoice',
    headerName: 'No of Invoice',
    width: 150,
    editable: true,
  },
];

interface SuperAdminCustomersListProps {
  superAdminCustomersListData: any; // Replace with appropriate type for better type safety
}

const SuperAdminCustomersList: React.FC<SuperAdminCustomersListProps> = ({ superAdminCustomersListData }) => {
  const { data: invoiceList, error: errorInvoiceList, isLoading, refetch } = useGetInvoiceListQuery();

  // Determine which data to display
  const tableData = invoiceList || superAdminCustomersListData || [];

  return (
    <>
      {isLoading && <CircularProgress />}
      {errorInvoiceList && <Typography color="error">Error fetching invoice list</Typography>}
      
      <GridDataUi
        showToolbar={false}
        columns={columns}
        tableData={tableData}
        checkboxSelection={false}
      />
    </>
  );
};

export default SuperAdminCustomersList;
