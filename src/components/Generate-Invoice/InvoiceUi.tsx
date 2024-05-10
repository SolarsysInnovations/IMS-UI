import React, { useEffect, useState } from "react";
import jsPdf from "jspdf";
import html2canvas from "html2canvas";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import TableContent from "./TableContent";
import { formatDate } from "../../services/utils/dataFormatter";
import ButtonSmallUi from "../ui/ButtonSmall";
import { useGetCustomersQuery } from "../../redux-store/customer/customerApi";
import { format } from "util";
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
            <div className="App" id="invoiceCapture" style={{ padding: "50px 30px" }}>
                <Grid container sx={{ borderBottom: "1px solid #dadada", paddingBottom: "15px" }}>
                    <Grid sx={{ marginTop: "0px", display: 'flex', alignContent: "flex-start", alignItems: 'flex-start', }} item xs={6.5}>
                        <Box>
                            <h1 style={{ marginTop: "0px", textAlign: "left" }}>INVOICE</h1>
                        </Box>
                    </Grid>
                    <Grid sx={{ marginTop: "0px", paddingBottom: "10px", display: 'flex', alignItems: 'right', justifyContent: 'left' }} item xs={5.5}>
                        <Box>
                            <div>
                                <p style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500" }}>SOLARSYS</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}> <span style={{ fontWeight: "500", width: "60px", display: "inline-block" }}>Address :</span> <span>1/305, Thillai Nagar, Trichy 905 606 </span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "60px", display: "inline-block" }}>Phone :</span> <span>983894833</span></p>
                            </div>
                        </Box>
                    </Grid>

                </Grid>
                <Grid container sx={{ backgroundColor: "#f8f9f9", marginTop: "30px", padding: "20px 20px" }}>
                    <Grid sx={{ marginTop: "0px" }} item xs={4}>
                        <Box gap={3}>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "60px", display: "inline-block" }}>Billed To </span> <span>: {customerDetails?.customerName}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "60px", display: "inline-block" }}>Email </span> <span>: {customerDetails?.customerEmail}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "60px", display: "inline-block" }}>Phone </span> <span>: {customerDetails?.customerPhone}</span></p>
                            </div>


                        </Box>
                    </Grid>
                    <Grid sx={{ marginTop: "0px", }} item xs={4}>
                        <Box gap={3}>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "100px", display: "inline-block" }}>Invoice No </span> <span>: {invoiceData?.invoiceNumber}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "100px", display: "inline-block" }}>Payment Terms </span> <span>: {invoiceData?.paymentTerms}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "100px", display: "inline-block" }}>Due Date </span> <span>: {formatDate(new Date(invoiceData?.dueDate))}</span></p>
                            </div>
                        </Box>
                    </Grid>

                </Grid>
                <Grid container>
                    <Grid sx={{ marginTop: "0px" }} item xs={12}>
                        <Box sx={{ mt: 5 }}>
                            <TableContent tableData={invoiceData || []} />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid sx={{ marginTop: "0px" }} item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }} >
                            <div style={{ display: "flex", width: "250px", justifyContent: "space-between" }}>
                                <p style={{ fontSize: "13px", margin: "0 0 5px 0", fontWeight: "600" }}>Sub total</p>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>$46654</p>
                            </div>
                        </Box>
                    </Grid>
                    <Grid sx={{ marginTop: "0px" }} item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }} >
                            <div style={{ display: "flex", width: "250px", justifyContent: "space-between" }}>
                                <p style={{ fontSize: "13px", margin: "0 0 5px 0", fontWeight: "600" }}>Sub total</p>
                                <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>$46654</p>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid sx={{ marginTop: "20px" }} item xs={8}>
                        <Box >
                            <div>
                                <p style={{ fontSize: "12px", }}><span style={{ fontWeight: "500", width: "130px", display: "inline-block" }}>Notes </span> : Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</p>
                            </div>
                        </Box>
                        <Box >
                            <div>
                                <p style={{ fontSize: "12px", }}><span style={{ fontWeight: "500", width: "130px", display: "inline-block" }}>Terms & Conditions </span> : Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</p>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
                <>

                    <Stack sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                    }}>

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
