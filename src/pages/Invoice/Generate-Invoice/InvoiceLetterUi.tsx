import { useEffect, useState } from "react";
import InvoiceDocument from "./InvoiceDocument";
import InvoiceRoleButtons from "./InvoiceRoleButtons";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useGetCustomersListQuery, useGetSingleCustomerMutation } from "../../../redux-store/api/injectedApis";
import CustomerDetails from "../../customer/customerDetails";

// InvoiceLetterUi Component
const InvoiceLetterUi = ({ invoiceData, preview, downloadPdf, subtotal, discount, tds, isModalOpen }: any) => {

    const [data, setData] = useState();
    const invoiceDatas = useSelector((state: any) => state.invoiceState.data);
    const { data: customers, error, isLoading, refetch } = useGetCustomersListQuery();

    useEffect(() => {
        if (customers && invoiceDatas) {
            const filteredCustomer = customers.find((customer: any) => customer.customerName === invoiceDatas.customerName)
            if (filteredCustomer) {
                const mergedData = {
                    ...invoiceDatas,
                    customerDetails: filteredCustomer
                }
                setData(mergedData);
            }
        };
    }, [invoiceDatas, customers]);

    const handleDownload = async () => {
        const doc = (
            <InvoiceDocument invoiceData={invoiceData} />
        );
        const asPdf = pdf(doc); // Create a new instance of pdf with the document
        const blob = await asPdf.toBlob(); // Convert the PDF document to a Blob
        // Create a download link and click it programmatically
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'invoice.pdf';
        link.click();
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: "column", padding: "30px" }}>
                <div style={{ width: '100%', height: '95vh', textAlign: "center", overflow: 'hidden', alignItems: "center" }}>
                    <PDFViewer
                        showToolbar={false}
                        style={{ overflow: "hidden", width: '400px', height: '770px', border: 'none', backgroundColor: 'transparent' }}
                    >
                        <InvoiceDocument invoiceData={data} />
                    </PDFViewer>
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                        onClick={handleDownload}
                        style={{
                            padding: '10px',
                            color: '#fff',
                            backgroundColor: '#007bff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Download Invoice
                    </button>
                    <InvoiceRoleButtons
                        discount={discount}
                        downloadPdf={downloadPdf}
                        invoiceData={invoiceData}
                        isModalOpen={isModalOpen}
                        preview={preview}
                        subtotal={subtotal}
                        tds={tds}
                    />
                </div>
            </Box>
        </>
    );
};

export default InvoiceLetterUi;
