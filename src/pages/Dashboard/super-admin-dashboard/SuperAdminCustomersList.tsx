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

interface SuperAdminInvoiceListProps {
    superAdminCustomersListData: any;
    startDate?: string;
    endDate?: string;
}

const SuperAdminCustomersList: React.FC<SuperAdminInvoiceListProps> = ({
    superAdminCustomersListData,
    startDate,
    endDate,
}) => {
    const hasFiltersApplied = Boolean(startDate && endDate);
    return (
        <>
         {hasFiltersApplied ? (
                superAdminCustomersListData && superAdminCustomersListData.length > 0 ? (
                    <GridDataUi 
                        showToolbar={false} 
                        columns={columns} 
                        tableData={superAdminCustomersListData} 
                        checkboxSelection={false} 
                    />
                ) : (
                    <div>No invoices found.</div>
                )
            ) : (
                <GridDataUi 
                    showToolbar={false} 
                    columns={columns} 
                    tableData={[]} // Empty data for grid
                    checkboxSelection={false} 
                />
            )}

        </>
    )
}

export default SuperAdminCustomersList