import { Button, IconButton, Stack } from "@mui/material";
import { GridColDef, GridDeleteIcon, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import { useEffect, useState } from "react";
import { useDeleteInvoiceMutation, useGetInvoiceQuery, useInvoiceGetByIdMutation } from "../../../redux-store/invoice/invcoiceApi";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../../components/ui/ModalUi";
import InvoiceUi from "../../../components/Generate-Invoice/InvoiceUi";
import { toastConfig } from "../../forms/config/toastConfig";
import { toast } from "react-toastify";
import { setCustomerData } from "../../../redux-store/customer/customerApi";
import ButtonSmallUi from "../../../components/ui/ButtonSmall";


const DownloadButtonRenderer = ({ row }: { row: any }) => {
    const [downloadPdf, setDownloadPdf] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoiceData, setInvoiceData] = useState<any>();

    const handleOpenModal = () => {
        setInvoiceData(row);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ButtonSmallUi
                variant="outlined"
                label="Download Pdf"
                onClick={handleOpenModal}
            />
            <ModalUi topHeight='100%' open={isModalOpen} onClose={handleCloseModal} >
                <InvoiceUi downloadPdf={downloadPdf} invoiceData={invoiceData} />
            </ModalUi>
        </>
    );
};

const MyCellRenderer = ({ row }: { row: any }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { data: invoice, error, isLoading, refetch } = useGetInvoiceQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoiceData, setInvoiceData] = useState<any>();
    const [deleteInvoice, { isLoading: D_Loading, isSuccess: D_Success }] = useDeleteInvoiceMutation();
    const navigate = useNavigate();
    const [getInvoice, { data: customerData, isSuccess: C_success, isError: C_error }] = useInvoiceGetByIdMutation<{ data: any, isSuccess: any, isError: any }>();

    useEffect(() => {
        refetch()
    }, [dispatch, refetch]);

    const handleEditClick = async () => {
        try {
            const response = await getInvoice(row.id);
            if ('data' in response) {
                const customerData = response.data;

                await dispatch(setCustomerData(customerData));
                navigate(`/invoice/edit/${1}`);
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    }

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
            <ModalUi topHeight='100%' open={isModalOpen} onClose={handleCloseModal} >
                <InvoiceUi invoiceData={invoiceData} />
            </ModalUi>
        </Stack>
    );
};

const handleInvoiceStatus = (params: any) => {
    console.log(params.row);
}

export const columns: GridColDef[] = [
    {
        field: 'Action',
        headerName: 'Action',
        width: 140,
        editable: false,
        renderCell: (params: any) => <MyCellRenderer row={params.row} />,
    },
    // {
    //     field: 'id',
    //     headerName: 'id',
    //     width: 150,
    //     editable: true,
    // },
    {
        field: 'invoiceType',
        headerName: 'Invoice Type',
        width: 120,
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
        width: 120,
        editable: true,
        type: "singleSelect",
        valueOptions: ["PENDING", "APPROVED", "REJECTED", "DELETED"],
        renderCell: (params: any) => {
            handleInvoiceStatus(params);
            console.log(params.row.invoiceStatus);
            return <>{params.value}</>; // Return the default cell content
        }
    },
    // {
    //     field: 'gstPercentage',
    //     headerName: 'Gst Percentage',
    //     width: 150,
    //     editable: false,
    // },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
    {
        field: '',
        headerName: '',
        width: 80,
        renderCell: () => (
            <ButtonSmallUi
                variant="outlined"
                label="Email"
            // style={{ marginLeft: 16 }}
            />
        ),
    },
    {
        field: 'download',
        width: 150,
        editable: false,
        headerName: '',
        renderCell: (params: any) => <DownloadButtonRenderer row={params.row} />,
    },

];