import { IconButton, Stack } from "@mui/material";
import { GridDeleteIcon, } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import { useEffect, useState } from "react";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import ModalUi from "../../../components/ui/ModalUi";
import InvoiceUi from "../../../pages/Invoice/Generate-Invoice/InvoiceUi";
import ButtonSmallUi from "../../../components/ui/ButtonSmall";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";
import { useDeleteInvoiceMutation, useGetInvoiceListQuery, useGetSingleInvoiceMutation, } from "../../../redux-store/api/injectedApis";
import { clearInvoiceData, setInvoiceData } from "../../../redux-store/slices/invoiceSlice";
import DialogBoxUi from "../../../components/ui/DialogBox";
import ActionButtons from "../../../components/ui/ActionButtons";
import { useRolePermissions } from "../../../hooks/useRolePermission";

// export const DownloadButtonRenderer = ({ row }: { row: any }) => {
//     const [downloadPdf, setDownloadPdf] = useState<boolean>(false);

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [invoiceData, setInvoicesData] = useState<any>();

//     const handleOpenModal = () => {
//         setInvoicesData(row);
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <>
//             <ButtonSmallUi
//                 variant="outlined"
//                 label="Download Pdf"
//                 onClick={handleOpenModal}
//             />
//             <ModalUi topHeight='100%' open={isModalOpen} onClose={handleCloseModal} >
//                 <InvoiceUi downloadPdf={downloadPdf} invoiceData={invoiceData} />
//             </ModalUi>
//         </>
//     );
// };

export const MyCellRenderer = ({ row }: { row: any }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { refetch: getInvoiceList } = useGetInvoiceListQuery();
    const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
    const [deleteInvoice, { isSuccess: invoiceDeleteSuccess, isError: invoiceDeleteError, error: invoiceDeleteErrorObject }] = useDeleteInvoiceMutation();
    const [getInvoice,] = useGetSingleInvoiceMutation();
    const navigate = useNavigate();
    const [preview, setPreview] = useState(false);

    const { canEditInvoices, canViewInvoices, canDeleteInvoices } = useRolePermissions();

    useEffect(() => {
        getInvoiceList()
    }, [invoiceDeleteSuccess]);

    useSnackbarNotifications({
        error: invoiceDeleteError,
        errorMessage: 'Error adding invoice',
        success: invoiceDeleteSuccess,
        successMessage: 'Invoice deleted successfully',
        errorObject: invoiceDeleteErrorObject,
    });

    const handleEditClick = async () => {
        try {
            const response = await getInvoice(row.id);
            if ('data' in response) {
                const invoiceData = response.data;
                dispatch(setInvoiceData(invoiceData));
                navigate("/invoice/create");
            } else {
                console.error('Error response:', response.error);
            }
        } catch (error) {
            console.error('Error handling edit click:', error);
        }
    }

    const handleDetails = async () => {
        try {
            const response = await getInvoice(row.id);
            if ('data' in response) {
                const invoiceData = response.data;
                dispatch(clearInvoiceData());
                dispatch(setInvoiceData(invoiceData));
                handleOpenModal();
                setIsModalOpen(true);
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
        setPreview(true);
    };

    return (
        <>
            <Stack direction="row" spacing={1}>
                <ActionButtons
                    canView={canViewInvoices}
                    canDelete={canDeleteInvoices}
                    canEdit={canEditInvoices}
                    onDeleteClick={handleDeleteClick}
                    onEditClick={handleEditClick}
                    onViewClick={handleDetails}
                />
                <DialogBoxUi
                    open={isModalOpen}
                    content={
                        <>
                            <InvoiceUi preview={preview} setIsModalOpen={setIsModalOpen} />
                        </>
                    }
                    handleClose={() => {
                        setIsModalOpen(false)
                    }}
                />
            </Stack>
        </>
    );
};
