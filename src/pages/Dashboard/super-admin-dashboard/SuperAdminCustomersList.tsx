import GridDataUi from '../../../components/GridTable/GridData'
import { GridColDef } from '@mui/x-data-grid';

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
const SuperAdminCustomersList = ({ superAdminCustomersListData }: any) => {

    return (
        <>
            <GridDataUi showToolbar={false} columns={columns} tableData={superAdminCustomersListData || []} checkboxSelection={false} />
        </>
    )
}

export default SuperAdminCustomersList