import { IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import { useEffect, useState } from "react";
import { useDeleteInvoiceMutation, useGetInvoiceQuery } from "../../../redux-store/invoice/invcoiceApi";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../../components/ui/ModalUi";
import InvoiceUi from "../../../components/Generate-Invoice/InvoiceUi";
import { toastConfig } from "../../forms/config/toastConfig";
import { toast } from "react-toastify";

const id = 1

const MyCellRenderer = ({ row }: { row: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: invoice, error, isLoading, refetch } = useGetInvoiceQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoiceData, setInvoiceData] = useState<any>();
    console.log(invoiceData);
    const [deleteInvoice, { isLoading: D_Loading, isSuccess: D_Success }] = useDeleteInvoiceMutation();
    const navigate = useNavigate();

    useEffect(() => {
        refetch()
    }, [dispatch, refetch]);

    const handleEditClick = () => {
        localStorage.setItem("service", JSON.stringify(row));
        console.log(row);
        navigate(`/invoice/edit/${row.id}`)
    };
    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this invoice?");
        if (confirmed) {
            deleteInvoice(row.id)
        }
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if (D_Success) {
            toast.success("successfully deleted the invoice", toastConfig)
        }
        refetch();
    }, [D_Success]);
    return (
        <Stack direction="row" spacing={1}>
            <IconButton aria-label="" onClick={handleEditClick}>
                <EditIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
            </IconButton>
            <IconButton aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "16px" }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={() => {
                handleOpenModal()
                setInvoiceData(row)
            }}>
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px" }} fontSize='small' />
            </IconButton>
            <ModalUi topHeight='70%' open={isModalOpen} onClose={handleCloseModal} >
                <InvoiceUi invoiceData={invoiceData} />
            </ModalUi>
        </Stack>
    );
};

export const columns: GridColDef[] = [
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
        width: 150,
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
        width: 150,
        editable: false,
    },
    {
        field: 'invoiceStatus',
        headerName: 'Invoice Status',
        width: 150,
        editable: false,
    },
    {
        field: 'gstPercentage',
        headerName: 'Gst Percentage',
        width: 150,
        editable: false,
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