import React, { useEffect, useState } from 'react'
import GridDataUi from '../../../components/GridTable/GridData'
import { GridColDef } from '@mui/x-data-grid';
import { useGetEndUserDashboardMutation } from '../../../redux-store/dashboard/dashboardApi';

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
export interface EndUserInvoiceListProps {
    selectedValue: string | null;
  }
const EndUserOverViewList :React.FC<EndUserInvoiceListProps> = ({ selectedValue })=> {

    const [getDashboard, { data, isLoading, isError }] = useGetEndUserDashboardMutation();
    const [companyOverviewList, setCompanyOverviewList] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getDashboard({ filter: selectedValue }).unwrap();
                console.log(response);
                setCompanyOverviewList(response.allInvoicesList || []);    
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, [getDashboard]);

    console.log("companyOverviewList", companyOverviewList);

    return (
        <>
  <GridDataUi showToolbar={false} columns={columns} tableData={companyOverviewList} checkboxSelection={false} />
  </>
    )
}

export default EndUserOverViewList ;