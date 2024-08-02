import { useEffect, useState } from "react";
import jsPdf from "jspdf";
import html2canvas from "html2canvas";
import { Box, Card, Grid, } from "@mui/material";
import { pdfjs } from "react-pdf";
import TableContent from "./TableContent";
import { useGetCustomersQuery } from "../../redux-store/customer/customerApi";
import { addDays, format, parse } from "date-fns";
import DialogBoxUi from "../ui/DialogBox";
import SendEmail from "../../pages/Invoice/Send-email";
import SplitButton from "../ui/SplitButton";
import ButtonUi from "../ui/Button";
import { invoiceStatusOptions } from "../../constants/data";
import { Roles } from "../../constants/Enums";
import { userRole } from "../../constants/data";
import { useUpdateInvoiceMutation, useInvoiceGetByIdMutation, useGetInvoiceQuery } from "../../redux-store/invoice/invcoiceApi";
import { useDispatch, useSelector } from "react-redux";
import { clearData, setData } from "../../redux-store/global/globalState";
import ModalUi from "../ui/ModalUi";
import MailReason from "./MailReason";
import { useSnackbarNotifications } from "../../hooks/useSnackbarNotification";
import StageStepper from "../ui/StepperUi";
import InvoiceLetterUi from "./InvoiceLetterUi";
import InvoiceRoleButtons from "./InvoiceRoleButtons";

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
  const { data: customers, error: customerListError, isLoading: customerListLoading, refetch, isSuccess } = useGetCustomersQuery();
  const [subTotalAmount, setSubTotalAmount] = useState<number>(0);
  const [customerDetails, setCustomerDetails] = useState<any>();
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [openemaildialogBox, setIsOpenEmailDialogBox] = useState(false);
  const [commentPopUp, setCommentPopup] = useState(false);
  const [updateInvoice, { isSuccess: invoiceUpdateSuccess, isError: invoiceUpdateError, error: invoiceUpdateErrorObject, isLoading: invoiceUpdateLoading }] = useUpdateInvoiceMutation();
  const [getInvoiceById, { }] = useInvoiceGetByIdMutation();
  const { data: invoiceList, error: invoiceListError, isLoading: invoiceListLoading, refetch: getInvoiceList } = useGetInvoiceQuery();
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


  const handleSentToApprover = async (e: any) => {
    e.preventDefault();
    try {
      const invoicePayload = {
        id: invoiceData.id,
        invoiceType: invoiceData.invoiceType,
        invoiceNumber: invoiceData.invoiceNumber,
        customerName: invoiceData.customerName,
        gstType: invoiceData.gstType,
        gstPercentage: invoiceData.gstPercentage,
        invoiceDate: invoiceData.invoiceDate,
        paymentTerms: invoiceData.paymentTerms,
        startDate: invoiceData.startDate,
        dueDate: invoiceData.dueDate,
        invoiceStatus: "PENDING",
        lastModified: invoiceData.lastModified,
        gstInNumber: invoiceData.gstInNumber,
        retainerFee: invoiceData.retainerFee,
        notes: invoiceData.retainerFee,
        termsAndConditions: invoiceData.termsAndConditions,
        servicesList: [...invoiceData.servicesList],
        taxAmount: invoiceData.taxAmount,
        discountPercentage: invoiceData.discountPercentage,
        totalAmount: invoiceData.totalAmount,
        createdBy: invoiceData.createdBy,
        updatedBy: invoiceData.updatedBy,
        companyName: invoiceData.companyName,
      };
      await updateInvoice({ id: invoicePayload.id, invoiceData: invoicePayload });
      getInvoiceList();
      const fetchedInvoiceData = await getInvoiceById(invoicePayload.id).unwrap();
      dispatch(setData(fetchedInvoiceData));
      isModalOpen(false);
      // Optionally, update the state with the fetched data if needed
    } catch (error) {
      console.log("Error updating invoice data", error);
    }
  };

  if (!invoiceData) {
    return <div>No data available</div>;
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
