import { useEffect, useState } from "react";
import InvoiceDocument from "./InvoiceDocument";
import InvoiceRoleButtons from "./InvoiceRoleButtons";
import { pdf, PDFViewer } from "@react-pdf/renderer";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useGetCustomersListQuery, useGetSingleCustomerMutation, useGetTdsTaxListQuery } from "../../../redux-store/api/injectedApis";
import CustomerDetails from "../../customer/customerDetails";
import { selectUserDetails } from "../../../redux-store/auth/authSlice";
import { formatDate } from "../../../services/utils/dataFormatter";

// InvoiceLetterUi Component
const InvoiceLetterUi = ({ invoiceData, preview, downloadPdf, subtotal, discount, tds, isModalOpen }: any) => {

    const [data, setData] = useState();
    const invoiceDatas = useSelector((state: any) => state.invoiceState.data);
    const { data: customers } = useGetCustomersListQuery();
    const { data: tdsTaxList } = useGetTdsTaxListQuery();
    const companyDetails = useSelector(selectUserDetails);

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

            console.log("mergedData", mergedData);
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
