import React, { useEffect, useRef } from 'react'
import GridDataUi from '../../components/GridTable/GridData'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { columns } from '../../constants/grid-table-data/customer-table-data'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux-store/store'
import ToastUi from '../../components/ui/ToastifyUi'
import { useGetCustomersQuery } from '../../redux-store/customer/customerApi'
import { GridColDef } from '@mui/x-data-grid'

const CustomerList = () => {
    const { data: customers, error, isLoading } = useGetCustomersQuery();
    const buttons = [
        { label: 'Create Customer', icon: Add, onClick: () => navigate("/customer/create") },
    ];
    const navigate = useNavigate();
    const pathname = usePathname();


    const columns: GridColDef[] = [
        // {
        //     field: 'Action',
        //     headerName: 'Action',
        //     width: 140,
        //     editable: false,
        //     renderCell: (params: any) => <MyCellRenderer row={params.row} />,

        // },
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            width: 150,
            editable: true,
        },
        {
            field: 'customerType',
            headerName: 'Customer Type',
            width: 150,
            editable: true,
        },
        {
            field: 'companyName',
            headerName: 'companyName',
            width: 150,
            editable: true,
        },
        {
            field: 'customerEmail',
            headerName: 'customerEmail',
            width: 150,
            editable: true,
        },
        {
            field: 'customerPhone',
            headerName: 'customerPhone',
            width: 150,
            editable: false,
        },

        {
            field: 'contactPersons',
            headerName: 'contactPersons',
            width: 250,
            editable: false,
            renderCell: (params: any) => {
                console.log('params.value:', params.row);
                return (
                    <ul className="flex">
                        {params.value?.map((person: any) => {
                            console.log('person:', person);
                            return (
                                <li key={person.id}>{person.contactName}</li>
                            );
                        })}
                    </ul>
                );
            },
        },


        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params: GridValueGetterParams) =>
        //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ];
    useEffect(() => {
        if (customers) {
            customers?.forEach((customer: any) => {
                console.log(`Customer Name: ${customer.customerName}`);
                console.log("Contact Persons:");
                customer.contactPersons.forEach((person: any) => {
                    console.log(`  Contact Name: ${person.contactName}`);
                    console.log(`  Contact Email: ${person.contactEmail}`);
                    console.log(`  Contact Phone: ${person.contactPhone}`);
                });
                console.log("-----------------------------------------");
            });
        }
    }, [customers]);

    return (
        <>
            <ToastUi autoClose={1000} />
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns || []} tableData={customers || []} checkboxSelection={false} />
        </>
    )
}

export default CustomerList
