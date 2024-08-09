import React, { useState, useEffect, useRef } from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import { Box } from '@mui/system';
import InvoiceRoleButtons from './InvoiceRoleButtons';

const randomImageUrl = 'https://picsum.photos/200';

// Styles for PDF document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        fontSize: 50,
        fontWeight: 100,
        marginBottom: 0,
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    image: {
        width: 70,
        height: 70,
        marginBottom: 10,
        borderRadius: 10,
    },
    table: {
        marginTop: 5,
        marginBottom: 5,
    },
    tableRow: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    tableCell: {
        padding: 8,
        fontSize: 12,
        flex: 1,
        textAlign: 'center',
    },
    tableHeader: {
        fontWeight: 'bold',
    },
    tableCellLast: {
        borderRight: 'none',
    }
});

// Invoice Document component for PDF
const InvoiceDocument = ({ invoiceData, customerDetails, subTotalAmount, discountAmount }: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: "30px" }}>
                <View>
                    <Image style={styles.image} src={randomImageUrl} />
                </View>
                <View>
                    <Text style={styles.header}>SolarSys</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: "20px", marginTop: "20px" }}>
                <View>
                    <Text style={styles.subHeader}>To :</Text>
                    <Text style={styles.text}>Name: {customerDetails?.customerName}</Text>
                    <Text style={styles.text}>Email: {customerDetails?.customerEmail}</Text>
                    <Text style={styles.text}>Phone: {customerDetails?.customerPhone}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>From :</Text>
                    <Text style={styles.text}>Invoice No: {invoiceData?.invoiceNumber}</Text>
                    <Text style={styles.text}>Payment Terms: {invoiceData?.paymentTerms}</Text>
                    <Text style={styles.text}>Due Date: 12-23-2024</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>Invoice :</Text>
                    <Text style={styles.text}>Invoice No: {invoiceData?.invoiceNumber}</Text>
                    <Text style={styles.text}>Payment Terms: {invoiceData?.paymentTerms}</Text>
                    <Text style={styles.text}>Due Date: 12-23-2024</Text>
                </View>
            </View>

            <View style={{ borderTop: "1px solid #000", marginTop: "20px" }}></View>
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Item</Text>
                    <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Quantity</Text>
                    <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Unit Price</Text>
                    <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Total</Text>
                </View>
                <View style={{ borderTop: "1px solid #000" }}></View>

                {/* Example table rows */}
                <View style={[styles.tableRow, { marginTop: "20px" }]} >
                    <Text style={styles.tableCell}>item.name</Text>
                    <Text style={styles.tableCell}>item.quantity</Text>
                    <Text style={styles.tableCell}>item.unitPrice</Text>
                    <Text style={[styles.tableCell, styles.tableCellLast]}>item.total</Text>
                </View>
                <View style={[styles.tableRow]} >
                    <Text style={styles.tableCell}>item.name</Text>
                    <Text style={styles.tableCell}>item.quantity</Text>
                    <Text style={styles.tableCell}>item.unitPrice</Text>
                    <Text style={[styles.tableCell, styles.tableCellLast]}>item.total</Text>
                </View>

                <View style={{ borderTop: "1px solid #000", marginTop: "30px" }}></View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: "15px" }}>
                <View>
                    <Text style={styles.tableCell}>Payment Method :</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row", gap: "30px", justifyContent: 'space-between' }}>
                        <View> <Text style={styles.tableCell}>item.name</Text></View>
                        <View> <Text style={styles.tableCell}>item.name</Text></View>
                    </View>
                    <View style={{ flexDirection: "row", gap: "30px", justifyContent: 'space-between', marginTop: "30px" }}>
                        <View> <Text style={styles.tableCell}>item.name</Text></View>
                        <View> <Text style={styles.tableCell}>item.name</Text></View>
                    </View>
                    <View style={{ flexDirection: "row", gap: "30px", justifyContent: 'space-between', marginTop: "30px" }}>
                        <View> <Text style={styles.tableCell}>item.name</Text></View>
                        <View> <Text style={styles.tableCell}>item.name</Text></View>
                    </View>
                </View>
            </View>
            <View style={{ borderTop: "1px solid #000", marginTop: "20px" }}></View>
            <View style={[styles.subHeader, { marginTop: "20px" }]}>
                <Text style={styles.text}>Terms & Conditions :</Text>
            </View>
            <View style={{ marginTop: "0px" }}>
                <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</Text>
            </View>
        </Page>
    </Document>
);

// InvoiceLetterUi Component
const InvoiceLetterUi = ({ invoiceData, preview, downloadPdf, subtotal, discount, tds, isModalOpen }: any) => {
    const [subTotalAmount, setSubTotalAmount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [customerDetails, setCustomerDetails] = useState({});

    useEffect(() => {
        // Fetch customer details if needed
        setCustomerDetails({ customerName: 'John Doe', customerEmail: 'john@example.com', customerPhone: '123456789' });
        setSubTotalAmount(1000); // Example value
        setDiscountAmount(50); // Example value
    }, []);

    const handleDownload = async () => {
        const doc = (
            <InvoiceDocument
                invoiceData={invoiceData}
                customerDetails={customerDetails}
                subTotalAmount={subTotalAmount}
                discountAmount={discountAmount}
            />
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
            <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: "column" }}>
                <div style={{ width: '100%', height: '95vh', textAlign: "center", overflow: 'hidden', alignItems: "center" }}>
                    <PDFViewer
                        showToolbar={false}
                        style={{ overflow: "hidden", width: '400px', height: '770px', border: 'none', backgroundColor: 'transparent' }}
                    >
                        <InvoiceDocument
                            invoiceData={invoiceData}
                            customerDetails={customerDetails}
                            subTotalAmount={subTotalAmount}
                            discountAmount={discountAmount}
                        />
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
