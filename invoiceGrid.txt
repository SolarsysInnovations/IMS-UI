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

const roles = ['Market', 'Finance', 'Development'];

export const invoiceDemoColumns: GridColDef[] = [

    {
        field: 'itemDetails',
        headerName: 'itemDetails',
        width: 350,
        editable: true,
        type: "singleSelect",
        valueOptions: roles,
    },
    {
        field: 'quantity',
        headerName: 'quantity',
        width: 100,
        editable: true,
    },
    {
        field: 'rate',
        headerName: 'rate',
        width: 100,
        editable: false,
    },
    {
        field: 'amount',
        headerName: 'amount',
        width: 100,
        editable: false,
    },
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => <MyCellRenderer row={params.row} />,
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

// Function to get a random item from an array
const randomArrayItem = (array: any) => {
    return array[Math.floor(Math.random() * array.length)];
};


// Generate invoice data with random roles
export const invoiceDataDemo = [
    {
        id: 1,
        itemDetails: randomArrayItem(roles), // Assign a random role
        quantity: 0,
        rate: 0,
        amount: 0,
    },
    {
        id: 2,
        itemDetails: randomArrayItem(roles), // Assign a random role
        quantity: 0,
        rate: 0,
        amount: 0,
    },
    // Add more objects as needed
];
