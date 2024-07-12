import React, { useEffect, useState } from 'react';
import GridDataUi from '../../../components/GridTable/GridData'; // Ensure correct path to GridDataUi component
import { GridColDef } from '@mui/x-data-grid'; // Assuming you are using x-data-grid for GridColDef
import { useGetApproverDashboardMutation } from '../../../redux-store/dashboard/dashboardApi';

export const columns: GridColDef[] = [
    {
        field: 'customerName',
        headerName: 'Name',
        width: 200,
        editable: true,
    },
    {
        field: 'invoiceNumber',
        headerName: 'Invoice Number',
        width: 200,
        editable: true,
    },
    {
        field: 'invoiceType',
        headerName: 'Invoice Type',
        width: 200,
        editable: true,
    },
    {
        field: 'invoiceDate',
        headerName: 'Invoice Date',
        width: 200,
        editable: true,
    },
    {
        field: 'invoiceStatus',
        headerName: 'Status',
        width: 200,
        editable: true,
    },
];

const ApproverInvoiceList = () => {
    const [getDashboard, { data, isLoading, isError, error }] = useGetApproverDashboardMutation();
    const [companyOverviewList, setCompanyOverviewList] = useState<any[]>([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await getDashboard({}).unwrap();
                    console.log(response);
                    setCompanyOverviewList(response.pendingInvoicesList || []);
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            };
    
            fetchData();
        }, [getDashboard]);
        console.log("companyOverviewList", companyOverviewList); // Log the actual state, not the setter function
            

    return (
        <>
            <GridDataUi
                showToolbar={false}
                columns={columns}
                tableData={companyOverviewList}
                checkboxSelection={false}
            />
        </>
    );
};


export default ApproverInvoiceList;
