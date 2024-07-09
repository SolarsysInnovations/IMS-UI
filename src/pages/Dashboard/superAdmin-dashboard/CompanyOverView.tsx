import React, { useEffect, useState } from 'react'
import GridDataUi from '../../../components/GridTable/GridData'
import { GridColDef } from '@mui/x-data-grid';
import { useGetSuperAdminDashboardMutation } from '../../../redux-store/dashboard/dashboardApi';

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
const CompanyOverView = () => {

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

export default CompanyOverView