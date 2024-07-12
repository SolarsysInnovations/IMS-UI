import React, { useEffect, useState } from 'react'
import GridDataUi from '../../../components/GridTable/GridData'
import { GridColDef } from '@mui/x-data-grid';
import { useGetSuperAdminDashboardMutation } from '../../../redux-store/dashboard/dashboardApi';

export const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        editable: true,
    },
    {
        field: 'invoiceNum',
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
const EnduserOverView = () => {

    const [getDashboard, { data, isLoading, isError }] = useGetSuperAdminDashboardMutation();
    const [companyOverviewList, setCompanyOverviewList] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDashboard().unwrap();
                console.log(response);
                setCompanyOverviewList(response.companyOverview || []);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, [getDashboard]);

    console.log("companyOverviewList", companyOverviewList);

    return (
        <>
  <GridDataUi showToolbar={false} columns={columns} tableData={[]} checkboxSelection={false} />
  </>
    )
}

export default EnduserOverView ;