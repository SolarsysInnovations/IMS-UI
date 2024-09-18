import React, { useState } from "react";
import jsPdf from "jspdf";
import html2canvas from "html2canvas";
import { Box, Stack, Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
interface InvoiceUiProps {
    invoiceData?: any;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function DemoTwo({ invoiceData }: InvoiceUiProps) {
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
            const doc = new jsPdf('p', 'mm');
            doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
                heightLeft -= pageHeight;
            }
            const pdfData = doc.output('datauristring');
            localStorage.setItem('invoicePDF', pdfData);
            doc.save('Downld.pdf');
        });
    };

    return (
        <>
            <div className="App" id="invoiceCapture" style={{ padding: "10px" }}>
                <Box sx={{
                    textAlign: "right",
                }}>
                    <Typography variant="h1" color="initial">INVOICE</Typography>
                </Box>
                <>
                    <Stack sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 6,
                    }}>
                        <Box gap={3}>
                            <Typography variant="subtitle2" color="initial">Billed To : <span>{invoiceData?.customerName}</span></Typography>
                            <Typography variant="subtitle2" color="initial">Address 4545 Lorem ipsum dolor <br /> sit Lorem, ipsum dolor.</Typography>
                        </Box>
                        <Box gap={3}>
                            <Typography variant="subtitle2" color="initial">Invoice No : <span>{invoiceData?.invoiceNumber}</span></Typography>
                            <Typography variant="subtitle2" color="initial">Payment Terms: <span>{invoiceData?.paymentTerms}</span></Typography>
                            <Typography variant="subtitle2" color="initial">Invoice Date : <span>{invoiceData?.invoiceDate}</span></Typography>
                            <Typography variant="subtitle2" color="initial">Due Date : <span>{invoiceData?.dueDate}</span></Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ mt: 6 }}>
                    </Box>

                    <Stack sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 10,
                    }}>
                        <Box gap={3} >
                            <Typography variant="subtitle2" color="initial">Thanks for your bussiness</Typography>
                        </Box>
                        <Box gap={3} >
                            <Typography variant="subtitle2" color="initial">Sub Total : <span>443</span></Typography>
                            <Typography variant="subtitle2" color="initial">Tax Rate : <span>5.00%</span></Typography>
                            <Typography variant="subtitle2" color="initial">Total : <span>$1324.00</span></Typography>
                            <Typography variant="h6" color="initial">Total : <span>$1324.00</span></Typography>
                        </Box>
                    </Stack>
                </>
                <Box gap={3} sx={{ mt: 10, mb: 7 }}>
                    <Typography variant="subtitle2" color="initial">Terms & Conditions</Typography>
                    <Typography variant="subtitle2" color="initial">All payments must be made in full before any design work</Typography>
                </Box>
            </div>
            <button onClick={printPDF}>Generate PDF</button>
        </>
    );
}

export default DemoTwo;
