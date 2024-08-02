import { Box, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonUi from '../ui/Button';
import { InvoiceOptions, InvoiceStatus, Roles } from '../../constants/Enums';
import { selectUserRole } from '../../redux-store/auth/authSlice';
import { useGetInvoiceQuery, useUpdateInvoiceMutation } from '../../redux-store/invoice/invcoiceApi';
import SplitButton from '../ui/SplitButton';
import StageStepper from '../ui/StepperUi';
import { useSnackbarNotifications } from '../../hooks/useSnackbarNotification';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceUiProps {
    invoiceData?: any;
    subtotal?: number | null;
    discount?: number | null;
    tds?: number | null;
    isModalOpen?: any;
    downloadPdf?: boolean;
    preview?: boolean;
}

const InvoiceRoleButtons = ({ preview, downloadPdf, subtotal, discount, tds, isModalOpen }: InvoiceUiProps) => {
    const [updateInvoice, { isSuccess: invoiceUpdateSuccess, isError: invoiceUpdateError, error: invoiceUpdateErrorObject }] = useUpdateInvoiceMutation();
    const invoiceData = useSelector((state: any) => state.globalState.data);
    const userRole = useSelector(selectUserRole);
    const [currentInvoiceStatus, setCurrentInvoiceStatus] = useState<number>(-1);
    const [showTracker, setShowTracker] = useState(false);
    const { data: invoiceList, error: errorInvoiceList, isLoading, refetch } = useGetInvoiceQuery();

    useSnackbarNotifications({
        error: invoiceUpdateError,
        errorObject: invoiceUpdateErrorObject,
        errorMessage: 'Error While updating ',
        success: invoiceUpdateSuccess,
        successMessage: 'Invoice updated successfully',
    });
    useEffect(() => {
        if (downloadPdf) {
            printPDF();
        }
    }, [downloadPdf]);

    useEffect(() => {
        refetch()
    }, [invoiceUpdateSuccess, refetch])

    useEffect(() => {
        if (invoiceData) {
            const currentInvoiceStatus = Object.values(InvoiceStatus).indexOf(invoiceData.invoiceStatus);
            if (currentInvoiceStatus !== -1) {
                setCurrentInvoiceStatus(currentInvoiceStatus);
            }
        }
    }, [invoiceData]);

    const handleOptionClick = async (option: any) => {
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
                    console.log("updatedInvoiceData", updatedInvoiceData);
                }

                await updateInvoice({ id: invoiceData.id, invoiceData: updatedInvoiceData });
                console.log("Updated Invoice Data", updatedInvoiceData);
            } catch (error) {
                console.log("Error updating invoice data", error);
            }
        }
    };

    const getAvailableOptions = () => {
        const allOptions = [];
        switch (userRole) {
            case Roles.ADMIN:
            case Roles.STANDARDUSER:
                if (invoiceData.invoiceStatus === InvoiceStatus.DRAFT || invoiceData.invoiceStatus === InvoiceStatus.RETURNED) {
                    allOptions.push(InvoiceOptions.SENT_TO_APPROVER);
                }
                break;
            case Roles.APPROVER:
                if (invoiceData.invoiceStatus === InvoiceStatus.PENDING) {
                    allOptions.push(InvoiceOptions.APPROVE, InvoiceOptions.RETURN);
                } else if (invoiceData.invoiceStatus === InvoiceStatus.APPROVED) {
                    allOptions.push(InvoiceOptions.PAID);
                }
                break;
            default:
                return [];
        }
        return allOptions.filter(option => option !== invoiceData.invoiceStatus);
    };

    const availableOptions = getAvailableOptions();

    const printPDF = () => {
        const element = document.querySelector("#invoiceCapture");
        if (!element) {
            console.error("Element with id 'invoiceCapture' not found");
            return;
        }
        html2canvas(element as HTMLElement).then((canvas) => {
            const imgWidth = 208;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            heightLeft -= pageHeight;
            const doc = new jsPDF("p", "mm");
            doc.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, "", "FAST");
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, "", "FAST");
                heightLeft -= pageHeight;
            }
            const pdfData = doc.output("datauristring");
            localStorage.setItem("invoicePDF", pdfData);
            doc.save("Downld.pdf");
        });
    };

    if (invoiceData.invoiceStatus === InvoiceStatus.PAID) {
        return null; // Don't render anything if invoiceStatus is "PAID"
    }

    return (
        <Box gap={2} sx={{ display: "flex", justifyContent: "right" }}>
            <ButtonUi
                smallButtonCss={true}
                label="Generate PDF"
                variant="contained"
                size="small"
                onClick={printPDF}
            />

            <SplitButton
                key={currentInvoiceStatus} // Ensure re-render
                disabledOptions={[availableOptions.indexOf(invoiceData.invoiceStatus)]}
                options={availableOptions}
                defaultIndex={0} // Always use the first available option as the default
                onOptionClick={handleOptionClick}
            />

            <Box sx={{ position: "relative" }}>
                <ButtonUi
                    label="View Tracker"
                    smallButtonCss
                    onMouseEnter={() => setShowTracker(true)}
                    onMouseLeave={() => setShowTracker(false)}
                />
                <Card
                    sx={{ padding: "20px 25px", position: "absolute", top: -150, right: 0, zIndex: 1300, backgroundColor: "background.paper", borderRadius: "10px", display: showTracker ? "block" : "none", }}
                >
                    <StageStepper stages={invoiceData.invoiceStages} />
                </Card>
            </Box>
        </Box>
    );
}

export default InvoiceRoleButtons;

