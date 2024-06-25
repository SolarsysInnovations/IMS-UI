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
import { setCustomerData, useUpdateCustomerMutation } from "../../../redux-store/customer/customerApi";
import ButtonSmallUi from "../../../components/ui/ButtonSmall";
import { setData } from "../../../redux-store/global/globalState";

export const DownloadButtonRenderer = ({ row }: { row: any }) => {
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

export const MyCellRenderer = ({ row, onDeleteSuccess  }: { row: any, onDeleteSuccess: () => void  }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { data: invoice, error, isLoading, refetch } = useGetInvoiceQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoiceData, setInvoiceData] = useState<any>();
    const [deleteInvoice, { isLoading: D_Loading, isSuccess: D_Success }] = useDeleteInvoiceMutation();
    const navigate = useNavigate();
    const [getInvoice, { data: customerData, isSuccess: C_success, isError: C_error }] = useInvoiceGetByIdMutation<{ data: any, isSuccess: any, isError: any }>();

    const [updateInvoice] = useUpdateCustomerMutation();

    useEffect(() => {
        refetch()
    }, [dispatch, refetch]);

    const handleEditClick = async () => {
        try {
            const response = await getInvoice(row.id);
            if ('data' in response) {
                const invoiceData = response.data;
                console.log("invoiceData", invoiceData);
                await dispatch(setData(invoiceData));
                navigate(`/invoice/edit/${1}`);
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    }
    const handleDetails = async (row: any) => {
        try {
            const response = await getInvoice(row.id);
            if ('data' in response) {
                const invoiceData = response.data;
                console.log("invoiceData", invoiceData);
                await dispatch(setData(invoiceData));
                handleOpenModal();
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
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
            onDeleteSuccess();
        }
        refetch();
    }, [D_Success, onDeleteSuccess]);



    return (
        <Stack direction="row" spacing={1}>
            <IconButton aria-label="" onClick={handleEditClick}>
                <EditIcon sx={{ color: `grey.500`, fontSize: "16px", '&:hover': { color: 'blue' } }} fontSize='small' />
            </IconButton>
            <IconButton aria-label="" onClick={handleDeleteClick}>
                <GridDeleteIcon sx={{ color: `grey.500`, fontSize: "16px", '&:hover': { color: 'blue' } }} fontSize='small' />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} aria-label="" onClick={() => {
                handleDetails(row)
                setInvoiceData(row)
            }}>
                <RemoveRedEyeOutlined sx={{ color: `grey.500`, fontSize: "15px", '&:hover': { color: 'blue' } }} fontSize='small' />
            </IconButton>
            <ModalUi topHeight='100%' open={isModalOpen} onClose={handleCloseModal} >
                <InvoiceUi invoiceData={invoiceData} isModalOpen={setIsModalOpen} />
            </ModalUi>
        </Stack>
    );
};
