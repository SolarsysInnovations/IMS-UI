// Import necessary libraries and hooks
import { useDispatch } from "react-redux";
import React, { useEffect, useState, useCallback } from "react";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import {
  useDeleteInvoiceMutation,
  useGetInvoiceListQuery,
  useGetInvoiceListScreenMutation,
  useGetSingleInvoiceMutation,
} from "../../redux-store/api/injectedApis";
import { useSnackbarNotifications } from "../../hooks/useSnackbarNotification";
import { useRolePermissions } from "../../hooks/useRolePermission";
import {
  clearInvoiceData,
  setInvoiceData,
} from "../../redux-store/slices/invoiceSlice";
import ActionButtons from "../../components/ui/ActionButtons";
import DialogBoxUi from "../../components/ui/DialogBox";
import InvoiceUi from "../../pages/Invoice/Generate-Invoice/InvoiceUi";

interface MyCellRendererProps {
  row: any; // You may want to replace `any` with a specific type for the `row` if available
  onDelete: (id: string) => void;
}

export const MyCellRenderer: React.FC<MyCellRendererProps> = ({
  row,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canEditInvoices, canViewInvoices, canDeleteInvoices } =
    useRolePermissions();
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const [preview, setPreview] = useState(false);

  const [
    deleteInvoice,
    {
      isSuccess: invoiceDeleteSuccess,
      isError: invoiceDeleteError,
      error: invoiceDeleteErrorObject,
    },
  ] = useDeleteInvoiceMutation();
  const [getList, { data: invoice }] = useGetSingleInvoiceMutation();
  const { refetch: getInvoiceList, isSuccess: refetchSuccess } =
    useGetInvoiceListQuery();

  useSnackbarNotifications({
    error: invoiceDeleteError,
    errorMessage: "Error deleting invoice",
    success: invoiceDeleteSuccess,
    successMessage: "Invoice deleted successfully",
    errorObject: invoiceDeleteErrorObject,
  });

  const handleEditClick = useCallback(async () => {
    if (row.invoiceStatus === "PENDING") {
      alert("Editing is not allowed when the invoice status is PENDING.");
      return;
    }

    try {
      const response = await getList(row.id);
      if ("data" in response) {
        dispatch(setInvoiceData(response.data));
        navigate("/invoice/create");
      } else {
        console.error("Error response:", response.error);
      }
    } catch (error) {
      console.error("Error handling edit click:", error);
    }
  }, [row, dispatch, navigate, getList]);

  const handleDetails = useCallback(async () => {
    try {
      const response = await getList(row.id);
      if ("data" in response) {
        dispatch(clearInvoiceData());
        dispatch(setInvoiceData(response.data));
        setPreview(true);
        setIsModalOpen(true);

        // Refetch the invoice list after the dialog is opened
        await getInvoiceList();
      } else {
        console.error("Error response:", response.error);
      }
    } catch (error) {
      console.error("Error handling details click:", error);
    }
  }, [row, dispatch, getList, getInvoiceList]);

  const handleDeleteClick = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this invoice?",
    );
    if (confirmed) {
      try {
        await deleteInvoice(row.id).unwrap();
        onDelete(row.id); // Update the local state immediately after deletion
      } catch (error) {
        console.error("Error deleting invoice:", error);
      }
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <ActionButtons
        canView={canViewInvoices}
        canDelete={canDeleteInvoices && row.invoiceStatus !== "PENDING"}
        canEdit={canEditInvoices && row.invoiceStatus !== "PENDING"}
        onDeleteClick={handleDeleteClick}
        onEditClick={handleEditClick}
        onViewClick={handleDetails}
      />

      <DialogBoxUi
        open={isModalOpen}
        content={
          <InvoiceUi invoiceData={row} setIsModalOpen={setIsModalOpen} />
        }
        handleClose={() => setIsModalOpen(false)}
      />
    </Stack>
  );
};
