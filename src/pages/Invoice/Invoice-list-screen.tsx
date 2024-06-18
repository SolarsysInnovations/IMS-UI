import React, { useEffect, useState } from 'react';
import GridDataUi from '../../components/GridTable/GridData';
import TableHeader from '../../components/layouts/TableHeader';
import usePathname from '../../hooks/usePathname';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-store/store';
import ToastUi from '../../components/ui/ToastifyUi';
import { DownloadButtonRenderer, MyCellRenderer } from '../../constants/grid-table-data/invoice/invoice-table-data';
import { useGetInvoiceQuery } from '../../redux-store/invoice/invcoiceApi';
import ButtonSmallUi from '../../components/ui/ButtonSmall';
import { GridColDef } from '@mui/x-data-grid';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { useUpdateInvoiceMutation } from '../../redux-store/invoice/invcoiceApi';
import { selectUserRole } from '../../redux-store/auth/authSlice';
import { Roles } from '../../constants/Enums';
const invoiceOptions = ["DRAFT", "PENDING", "APPROVED", "PAID", "OVERDUE", "DELETE", "RETURNED",]

const InvoiceStatusCell = ({ params }: { params: GridRenderCellParams }) => {


    const [status, setStatus] = useState(params.value);
    const [updateInvoice, { isSuccess: updateSuccess }] = useUpdateInvoiceMutation();
    const { data: invoiceList, error, isLoading, refetch: getInvoiceList } = useGetInvoiceQuery();

    useEffect(() => {
        getInvoiceList();
    }, [updateSuccess])

    const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
        const newStatus = event.target.value as string;
        setStatus(newStatus);

        const updatedInvoice = {
            ...params.row,
            invoiceStatus: newStatus,
        };

        console.log("Updating invoice with payload:", updatedInvoice);

        try {
            const response = await updateInvoice({ id: updatedInvoice.id, invoiceData: updatedInvoice });
            console.log("Update response:", response);
            if ('error' in response) {
                console.error("Error updating invoice status:", response.error);
            } else {
                console.log(`Invoice status updated: ${newStatus}`);
            }
        } catch (error) {
            console.error('Error updating invoice status:', error);
        }
    };

    return (
        <select
            value={status}
            onChange={handleChange}
            style={{ fontSize: "12px", padding: "5px 5px", borderRadius: "5px" }}
        >
            {invoiceOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
};


const InvoiceList = () => {
    const { data: invoiceList, error, isLoading, refetch } = useGetInvoiceQuery();
    const userRole = useSelector(selectUserRole);
    console.log(userRole);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const pathname = usePathname();
    const buttons = [
        { label: 'Create Invoice', icon: Add, onClick: () => navigate("/invoice/create") },
    ];

    const columns: GridColDef[] = [
        {
            field: 'Action',
            headerName: 'Action',
            width: 140,
            editable: false,
            renderCell: (params: any) => <MyCellRenderer row={params.row} />,
        },
        {
            field: 'invoiceType',
            headerName: 'Invoice Type',
            width: 140,
            editable: true,
        },
        {
            field: 'invoiceNumber',
            headerName: 'Invoice Number',
            width: 150,
            editable: true,
        },
        {
            field: 'customerName',
            headerName: 'Customer Name',
            width: 150,
            editable: false,
        },
        {
            field: 'dueDate',
            headerName: 'Due Date',
            width: 140,
            editable: false,
        },

        // {
        //     field: '',
        //     headerName: '',
        //     width: 80,
        //     renderCell: () => (
        //         <ButtonSmallUi
        //             variant="outlined"
        //             label="Email"
        //         />
        //     ),
        // },
        // {
        //     field: 'download',
        //     width: 150,
        //     editable: false,
        //     headerName: '',
        //     renderCell: (params: any) => <DownloadButtonRenderer row={params.row} />,
        // },
    ];

    if (userRole === Roles.ADMIN || Roles.APPROVER || Roles.SUPERADMIN) {
        columns.push(
            {
                field: 'invoiceStatus',
                headerName: 'Invoice Status',
                width: 120,
                editable: true,
                type: "singleSelect",
                valueOptions: ["PENDING", "APPROVED", "REJECTED", "DELETED"],
                renderCell: (params: GridRenderCellParams) => (
                    <InvoiceStatusCell params={params} />
                ),
            },
        )
    } else {
        columns.push(
            {
                field: 'invoiceStatus',
                headerName: 'Invoice Status',
                width: 150,
                editable: false,
            },
        )
    }

    return (
        <>
            <ToastUi autoClose={1000} />
            <TableHeader headerName={pathname} buttons={buttons} />
            <GridDataUi showToolbar={true} columns={columns} tableData={invoiceList || []} checkboxSelection={false} />
        </>
    );
};

export default InvoiceList;
