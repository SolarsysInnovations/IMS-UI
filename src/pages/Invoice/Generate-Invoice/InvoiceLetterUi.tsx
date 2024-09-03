import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InvoiceDocument from "./InvoiceDocument";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useGetCustomersListQuery, useGetInvoiceListQuery, useGetTdsTaxListQuery, useUpdateInvoiceMutation } from "../../../redux-store/api/injectedApis";
import { selectUserDetails, selectUserRole } from "../../../redux-store/auth/authSlice";
import { formatDate } from "../../../services/utils/dataFormatter";
import StageStepper from "../../../components/ui/StepperUi";
import ButtonUi from "../../../components/ui/Button";
import SplitButton from "../../../components/ui/SplitButton";
import { useSnackbarNotifications } from "../../../hooks/useSnackbarNotification";
import { InvoiceOptions, InvoiceStatus, Roles } from "../../../constants/Enums";
import { Card } from "@mui/material";
import DialogBoxUi from "../../../components/ui/DialogBox";
import SendEmail from "../Send-email";

// InvoiceLetterUi Component
interface InvoiceLetterUiProps {
    setIsModalOpen?: Dispatch<SetStateAction<boolean | undefined>>;
}
const InvoiceLetterUi = ({ setIsModalOpen }: InvoiceLetterUiProps) => {

    const [data, setData] = useState();
    const invoiceDatas = useSelector((state: any) => state.invoiceState.data);
    const { data: customers } = useGetCustomersListQuery();
    const { data: tdsTaxList } = useGetTdsTaxListQuery();
    const companyDetails = useSelector(selectUserDetails);
    const [updateInvoice, { isSuccess: invoiceUpdateSuccess, isError: invoiceUpdateError, error: invoiceUpdateErrorObject }] = useUpdateInvoiceMutation();
    const invoiceData = useSelector((state: any) => state.invoiceState.data);
    const userRole = useSelector(selectUserRole);
    const [currentInvoiceStatus, setCurrentInvoiceStatus] = useState<number>(-1);
    const [showTracker, setShowTracker] = useState(false);
    const { refetch } = useGetInvoiceListQuery();
    const [resMessage, setResMessage] = useState('');
    const [isOpenDialogBox, setIsOpenDialogBox] = useState(false);

    useEffect(() => {
        if (invoiceDatas && customers && companyDetails && tdsTaxList) {
            // Find the relevant customer
            const filteredCustomer = customers.find(
                (customer: any) => customer.customerName === invoiceDatas.customerName
            );

            // Calculate the subtotal from servicesList
            const subTotalValue = invoiceDatas.servicesList.reduce(
                (acc: number, service: any) => acc + service.serviceTotalAmount,
                0
            );

            // Calculate the discount amount
            const discountPercentageValue = (subTotalValue * invoiceDatas.discountPercentage) / 100;

            // Calculate the GST amount
            const gstPercentageValue = ((subTotalValue - discountPercentageValue) * invoiceDatas.gstPercentage) / 100;

            // Find the relevant TDS tax object
            const filteredTdsTax = tdsTaxList.find(
                (tdsTax: any) => invoiceDatas.taxAmount.tds === tdsTax.taxName
            );

            // Calculate the total value before TDS
            const totalValueBeforeTds = subTotalValue - discountPercentageValue + gstPercentageValue;

            // Calculate TDS amount if applicable
            let tdsAmount = 0;
            if (filteredTdsTax) {
                tdsAmount = (totalValueBeforeTds * filteredTdsTax.taxPercentage) / 100;
            }

            // Calculate the final total value after applying TDS
            const finalTotalValue = totalValueBeforeTds - tdsAmount;

            // Merge all data including calculated values
            const mergedData = {
                ...invoiceDatas,
                companyDetails: { ...companyDetails.companyDetails },
                customerDetails: filteredCustomer || invoiceDatas.customerDetails,
                startDate: formatDate(invoiceDatas.startDate),
                dueDate: formatDate(invoiceDatas.dueDate),
                invoiceDate: formatDate(invoiceDatas.invoiceDate),
                subTotal: Math.round(subTotalValue),
                tdsAmountValue: Math.round(tdsAmount),
                discountPercentageValue: Math.round(discountPercentageValue),
                gstPercentageValue: Math.round(gstPercentageValue),
                totalValue: Math.round(finalTotalValue),
            };
            setData(mergedData);
        }
    }, [invoiceDatas, customers, companyDetails, tdsTaxList]);

    const handleDownload = async () => {
        const doc = (
            <InvoiceDocument invoiceData={data} />
        );
        const asPdf = pdf(doc); // Create a new instance of pdf with the document
        const blob = await asPdf.toBlob(); // Convert the PDF document to a Blob
        // Create a download link and click it programmatically
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'invoice.pdf';
        link.click();
    };

    const getAvailableOptions = () => {
        const allOptions = [];
        switch (userRole) {
            case Roles.ADMIN:
            case Roles.STANDARDUSER:
                if (invoiceData.invoiceStatus === InvoiceStatus.DRAFT || invoiceData.invoiceStatus === InvoiceStatus.RETURNED) {
                    allOptions.push(InvoiceOptions.SENT_TO_APPROVER);
                } else if (invoiceData.invoiceStatus === InvoiceStatus.APPROVED) {
                    allOptions.push(InvoiceOptions.MAILED)
                } else if (invoiceData.invoiceStatus === InvoiceStatus.MAILED) {
                    allOptions.push(InvoiceOptions.PAID);
                }
                break;
            case Roles.APPROVER:
                if (invoiceData.invoiceStatus === InvoiceStatus.PENDING) {
                    allOptions.push(InvoiceOptions.APPROVE, InvoiceOptions.RETURN);
                }
                break;
            default:
                return [];
        }
        return allOptions.filter(option => option !== invoiceData.invoiceStatus);
    };

    const availableOptions = getAvailableOptions();


    useSnackbarNotifications({
        error: invoiceUpdateError,
        errorObject: invoiceUpdateErrorObject,
        errorMessage: 'Error While updating ',
        success: invoiceUpdateSuccess,
        successMessage: resMessage,
    });

    useEffect(() => {
        refetch();
        console.log('hello world');
        if (invoiceUpdateSuccess) {
            setIsModalOpen?.(false)
        };
    }, [invoiceUpdateSuccess, refetch]);

    useEffect(() => {
        if (invoiceData) {
            const currentInvoiceStatus = Object.values(InvoiceStatus).indexOf(invoiceData.invoiceStatus);
            if (currentInvoiceStatus !== -1) {
                setCurrentInvoiceStatus(currentInvoiceStatus);
            }
        }
    }, [invoiceData]);

    const handleOptionClick = async (option: any) => {

        if (option === InvoiceOptions.MAILED) {
            setIsOpenDialogBox(true);
            return;
        };
        if (invoiceData.invoiceStatus !== option) {
            try {
                let updatedInvoiceData = { ...invoiceData };
                let newStatus;

                switch (option) {
                    case InvoiceOptions.APPROVE:
                        newStatus = InvoiceStatus.APPROVED;
                        break;
                    case InvoiceOptions.RETURN:
                        newStatus = InvoiceStatus.RETURNED;
                        break;
                    case InvoiceOptions.PAID:
                        newStatus = InvoiceStatus.PAID;
                        break;
                    case InvoiceOptions.SENT_TO_APPROVER:
                        newStatus = InvoiceStatus.PENDING;
                        break;
                    default:
                        console.log("Unknown option");
                        return;
                }
                if (newStatus) {
                    updatedInvoiceData = { ...invoiceData, invoiceStatus: newStatus };
                };

                let response = await updateInvoice({ id: invoiceData.id, data: updatedInvoiceData });
                setResMessage(response.data.message);
            } catch (error) {
                console.log("Error updating invoice data", error);
            }
        }
    };
    const handleDialogBoxClose = () => {
        setIsOpenDialogBox(false)
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: "column", padding: "0px 30px 30px 30px" }}>
                <div style={{ width: '100%', height: '95vh', textAlign: "center", overflow: 'hidden', alignItems: "center" }}>
                    <PDFViewer
                        showToolbar={false}
                        style={{ overflow: "hidden", width: '400px', height: '770px', border: 'none', backgroundColor: 'transparent' }}
                    >
                        <InvoiceDocument invoiceData={data} />
                    </PDFViewer>
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Box gap={2} sx={{ display: "flex", justifyContent: "right", flexDirection: "row", gap: "20px", marginTop: "10px" }}>
                        <ButtonUi label='Download Pdf' smallButtonCss
                            onClick={() => { handleDownload() }}
                        />
                        {availableOptions.length < 1 ? "" : (
                            <SplitButton
                                key={currentInvoiceStatus} // Ensure re-render
                                disabledOptions={[availableOptions.indexOf(invoiceData.invoiceStatus)]}
                                options={availableOptions}
                                defaultIndex={0} // Always use the first available option as the default
                                onOptionClick={handleOptionClick}
                            />
                        )}

                        <Box sx={{ position: "relative" }}>
                            <ButtonUi
                                label="View Tracker"
                                smallButtonCss
                                onMouseEnter={() => setShowTracker(true)}
                                onMouseLeave={() => setShowTracker(false)}
                            />
                            <Card
                                sx={{
                                    padding: "20px 25px", position: "absolute", top: -150, right: 0, zIndex: 1300,
                                    backgroundColor: "background.paper", borderRadius: "10px", display: showTracker ? "block" : "none",
                                }}    >
                                <StageStepper stages={invoiceData.invoiceStages} />
                            </Card>
                        </Box>
                    </Box>
                </div>
            </Box>

            {/* INVOICE EMAIL DIALOG BOX */}
            <DialogBoxUi
                open={isOpenDialogBox}
                content={
                    <>
                        <SendEmail/>
                    </>
                }
                handleClose={handleDialogBoxClose}
            />
        </>
    );
};


export default InvoiceLetterUi;
