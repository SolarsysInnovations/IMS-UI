import { useEffect, useState } from "react";
import { Box, Card, Grid, } from "@mui/material";
import { pdfjs } from "react-pdf";
import { invoiceStatusOptions } from "../../constants/data";
import { useDispatch, useSelector } from "react-redux";
import { clearData, setData } from "../../redux-store/global/globalState";
import { useSnackbarNotifications } from "../../hooks/useSnackbarNotification";
import InvoiceLetterUi from "./InvoiceLetterUi";
import InvoiceRoleButtons from "./InvoiceRoleButtons";
import { useGetCustomersListQuery, useGetInvoiceListQuery, useGetSingleInvoiceMutation, useUpdateInvoiceMutation } from "../../redux-store/api/injectedApis";

interface InvoiceUiProps {
  invoiceData?: any;
  subtotal?: number | null;
  discount?: number | null;
  tds?: number | null;
  isModalOpen?: any;
  downloadPdf?: boolean;
  preview?: boolean;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


function InvoiceUi({ preview, downloadPdf, subtotal, discount, tds, isModalOpen }: InvoiceUiProps) {
  const { data: customers, error: customerListError, isLoading: customerListLoading, refetch, isSuccess } = useGetCustomersListQuery();
  const [subTotalAmount, setSubTotalAmount] = useState<number>(0);
  const [customerDetails, setCustomerDetails] = useState<any>();
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [openemaildialogBox, setIsOpenEmailDialogBox] = useState(false);
  const [commentPopUp, setCommentPopup] = useState(false);
  const [updateInvoice, { isSuccess: invoiceUpdateSuccess, isError: invoiceUpdateError, error: invoiceUpdateErrorObject, isLoading: invoiceUpdateLoading }] = useUpdateInvoiceMutation();
  const [getInvoiceById, { }] = useGetSingleInvoiceMutation();
  const { data: invoiceList, error: invoiceListError, isLoading: invoiceListLoading, refetch: getInvoiceList } = useGetInvoiceListQuery();
  const [currentInvoiceStatus, setCurrentInvoiceStatus] = useState<number>(-1);
  const invoiceData = useSelector((state: any) => state.globalState.data);

  console.log("invoiceData", invoiceData);

  const dispatch = useDispatch();

  // * --------------- invoice sent to approver update snackbar ----------------
  useSnackbarNotifications({
    error: invoiceUpdateError,
    errorObject: invoiceUpdateErrorObject,
    errorMessage: "Error when sending Invoice to approver",
    success: invoiceUpdateSuccess,
    successMessage: "Invoice send to approver and updated successfully",
  });

  useEffect(() => {
    if (invoiceData) {
      const calculateTotal = invoiceData?.servicesList?.reduce((total: any, service: any) => {
        return total + service.serviceAmount;
      }, 0);
      setSubTotalAmount(calculateTotal);
      const disAmount = (subTotalAmount * (invoiceData.discountPercentage ?? 0)) / 100;
      setDiscountAmount(disAmount);
    }
  }, [invoiceData, subTotalAmount]);

  useEffect(() => {
    if (invoiceData) {
      const currentInvoiceStatus = invoiceStatusOptions.indexOf(invoiceData.invoiceStatus);
      if (currentInvoiceStatus !== -1) {
        setCurrentInvoiceStatus(currentInvoiceStatus);
      }
    }
  }, [invoiceData]);

  useEffect(() => {
    if (invoiceData) {
      const details = invoiceData.customerName;
      const customerDetails = customers?.find((customer: any) => details === customer.customerName);
      setCustomerDetails(customerDetails);
    }
  }, [customers, invoiceData]);

  if (!invoiceData) {
    return isModalOpen(false);
  }


  return (
    <>
      <InvoiceLetterUi invoiceData={invoiceData} />
      {preview && (
        <Grid
          sx={{
            "& .MuiGrid-item": { paddingTop: "10px" },
          }}
          container
          spacing={5}
        >
          <Grid item xs={12}>
            <InvoiceRoleButtons discount={discount} downloadPdf={downloadPdf} invoiceData={invoiceData} isModalOpen={isModalOpen} preview={preview} subtotal={subtotal} tds={tds} />
          </Grid>
          <Grid item xs={12}></Grid>
          {/* <ModalUi open={nestedOpen} onClose={handleCloseNested}>
            <MailReason invoiceData={invoiceData} setNestedOpen={setNestedOpen} />
          </ModalUi> */}
        </Grid>
      )}
      {/* <DialogBoxUi
        open={openemaildialogBox} // Set open to true to display the dialog initially
        // title="Custom Dialog Title"
        content={
          <SendEmail
            onClose={function (): void {
              if (isSuccess) {
                setIsOpenEmailDialogBox(false);
              } else {
                setIsOpenEmailDialogBox(true);
              }
            }}
          />
        }
        handleClose={() => {
          setIsOpenEmailDialogBox(false);
        }}
      /> */}
    </>
  );
}

export default InvoiceUi;
