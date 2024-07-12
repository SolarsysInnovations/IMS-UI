import React, { useEffect, useState } from 'react'
import GridDataUi from '../../../components/GridTable/GridData'
import { GridColDef } from '@mui/x-data-grid';
import { useGetSuperAdminDashboardMutation } from '../../../redux-store/dashboard/dashboardApi';
import { Box } from '@mui/material';

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
        field: 'noOfInvoice',
        headerName: 'No of Invoice',
        width: 150,
        editable: true,
    },
];
const CompanyOverView = ({ companyOverviewData }: any) => {

    return (
        <>
            <Box mt={3} >
                <GridDataUi showToolbar={false} columns={columns} tableData={companyOverviewData} checkboxSelection={false} />
            </Box>
        </>
    )
}

export default CompanyOverView