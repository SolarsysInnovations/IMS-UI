import React, { useEffect, useState } from "react";
import jsPdf from "jspdf";
import html2canvas from "html2canvas";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import TableContent from "./TableContent";
import { formatDate } from "../../services/utils/dataFormatter";
import ButtonSmallUi from "../ui/ButtonSmall";
import { useGetCustomersQuery } from "../../redux-store/customer/customerApi";
interface InvoiceUiProps {
    invoiceData?: any;
    subtotal?: number | null;
    discount?: number | null;
    tds?: number | null;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function InvoiceUi({ invoiceData, subtotal, discount, tds }: InvoiceUiProps) {
    const { data: customers, error, isLoading, refetch } = useGetCustomersQuery();
    const [customerDetails, setCustomerDetails] = useState<any>()

    useEffect(() => {
        if (invoiceData) {
            const details = invoiceData.customerName
            const customerDetails = customers?.find((customer: any) => details === customer.customerName)
            setCustomerDetails(customerDetails)
        }
    }, [customers, invoiceData])

    console.log(customerDetails);

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
    console.log("invoice", invoiceData);

    if (!invoiceData) {
        return <div>No data available</div>;
    }
    return (
        <>
            <div className="App" id="invoiceCapture" style={{ padding: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box>
                            <Typography variant="h5" color="initial">INVOICE</Typography>
                        </Box>
                    </Grid>
                    <Grid sx={{ marginTop: "30px", borderBottom: "1px solid #dadada", paddingBottom: "10px", display: 'flex', alignItems: 'right', justifyContent: 'left' }} item xs={12}>
                        <Box>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>SOLARSYS</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}> <span style={{ fontWeight: "500" }}>Address :</span> <span>1/305, Thillai Nagar , Trichy 905 606 </span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>Phone :</span> <span>983894833</span></p>
                            </div>
                        </Box>
                    </Grid>
                    <Grid sx={{ borderBottom: "1px solid #dadada", paddingBottom: "20px", }} item xs={6}>
                        <Box gap={3}>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>Billed To :</span> <span>{customerDetails?.customerName}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>Email :</span> <span>{customerDetails?.customerEmail}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>Phone :</span> <span>{customerDetails?.customerPhone}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>Address :</span> <span>{customerDetails?.address}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>Address :</span> <span>{customerDetails?.address} , {customerDetails?.pinCode}</span></p>
                            </div>

                        </Box>
                    </Grid>
                    <Grid sx={{ borderBottom: "1px solid #dadada", paddingBottom: "20px", }} item xs={6}>
                        <Box gap={3}>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>Invoice Date :</span> <span>{formatDate(invoiceData?.invoiceDate)}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>Invoice No :</span> <span>{invoiceData?.invoiceNumber}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>Payment Terms :</span> <span>{invoiceData?.paymentTerms}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>Due Date :</span> <span>{invoiceData?.dueDate}</span></p>
                            </div>
                        </Box>
                    </Grid>
                </Grid>

                <>

                    <Box sx={{ mt: 3 }}>
                        <TableContent tableData={invoiceData || []} />
                    </Box>
                    <Stack sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                    }}>
                        <Box gap={3} >
                            <Typography variant="subtitle2" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</Typography>
                        </Box>
                        <Box gap={3} >
                            <Typography variant="subtitle2" color="initial">Sub Total : <span>{subtotal}</span></Typography>
                            <Typography variant="subtitle2" color="initial">Discount % : <span>{discount}</span></Typography>
                            <Typography variant="subtitle2" color="initial">TDS Tax : <span>{tds}</span></Typography>
                            <Typography variant="h6" color="initial">Total : <span>{invoiceData?.invoiceTotalAmount}</span></Typography>
                        </Box>
                    </Stack>
                </>
                <Box gap={3} sx={{ mt: 10, mb: 7 }}>
                    <Typography variant="subtitle2" color="initial">Terms & Conditions</Typography>
                    <Typography variant="subtitle2" color="initial">All payments must be made in full before any design work</Typography>
                </Box>
            </div >
            <ButtonSmallUi label="Generate PDF" variant="contained" size="small" onClick={printPDF} />
            <ButtonSmallUi label="Email To" variant="contained" size="small" />
        </>
    );
}

export default InvoiceUi;
