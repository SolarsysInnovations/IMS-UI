import React, { useState, useEffect, CSSProperties } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Example URL for a random image
const randomImageUrl = 'https://picsum.photos/200';

// Styles for web preview
const stylesHtml: { [key: string]: CSSProperties } = {
    container: {
        width: '300px', // Smaller width for web preview
        padding: '25px 20px',
        backgroundColor: '#fff',
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 5px 20px 0px",
        borderRadius: '5px',
        margin: 'auto',
        overflow: 'hidden',
        fontSize: '8px', // Smaller font size
    },
    section: {
        marginBottom: '4px',
        flexShrink: 0,
    },
    header: {
        fontSize: '14px', // Smaller font size for header
        marginBottom: '4px',
    },
    subHeader: {
        fontSize: '12px', // Smaller font size for subheader
        marginBottom: '4px',
    },
    text: {
        fontSize: '8px', // Smaller font size for text
        marginBottom: '2px',
    },
    image: {
        width: '40px', // Smaller image size
        height: '40px',
        marginBottom: '4px',
        alignSelf: 'center',
    },
};

// Invoice Preview component for web
const InvoicePreview = ({ invoiceData, customerDetails, subTotalAmount, discountAmount }: any) => (
    <div style={stylesHtml.container}>
        <div style={stylesHtml.section}>
            <img style={stylesHtml.image} src={randomImageUrl} alt="Logo" />
            <h1 style={stylesHtml.header}>INVOICE</h1>
            <h2 style={stylesHtml.subHeader}>SOLARSYS</h2>
            <p style={stylesHtml.text}>Address: 1/305, Thillai Nagar, Trichy 905 606</p>
            <p style={stylesHtml.text}>Phone: 983894833</p>
        </div>
        <div style={stylesHtml.section}>
            <h2 style={stylesHtml.subHeader}>Billed To</h2>
            <p style={stylesHtml.text}>Name: {customerDetails?.customerName}</p>
            <p style={stylesHtml.text}>Email: {customerDetails?.customerEmail}</p>
            <p style={stylesHtml.text}>Phone: {customerDetails?.customerPhone}</p>
        </div>
        <div style={stylesHtml.section}>
            <h2 style={stylesHtml.subHeader}>Invoice Details</h2>
            <p style={stylesHtml.text}>Invoice No: {invoiceData?.invoiceNumber}</p>
            <p style={stylesHtml.text}>Payment Terms: {invoiceData?.paymentTerms}</p>
            <p style={stylesHtml.text}>Due Date: 12-23-2024</p>
        </div>
        <div style={stylesHtml.section}>
            <p style={stylesHtml.text}>Sub total: {subTotalAmount}</p>
            <p style={stylesHtml.text}>Discount Amount: -{discountAmount}</p>
            <p style={stylesHtml.text}>Tax Amount: {/* Add tax amount here */}</p>
        </div>
        <div style={stylesHtml.section}>
            <p style={stylesHtml.text}>Notes: Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</p>
            <p style={stylesHtml.text}>Terms & Conditions: Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</p>
        </div>
    </div>
);

// Styles for PDF document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 30,
        width: '100%',
        height: '100%',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        fontSize: 24, // Regular font size for PDF
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 18, // Regular font size for PDF
        marginBottom: 10,
    },
    text: {
        fontSize: 12, // Regular font size for PDF
        marginBottom: 5,
    },
    image: {
        width: 100, // Regular image size for PDF
        height: 100,
        marginBottom: 10,
    },
});

// Invoice Document component for PDF
const InvoiceDocument = ({ invoiceData, customerDetails, subTotalAmount, discountAmount }: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Image style={styles.image} src={randomImageUrl} />
                <Text style={styles.header}>INVOICE</Text>
                <Text style={styles.subHeader}>SOLARSYS</Text>
                <Text style={styles.text}>Address: 1/305, Thillai Nagar, Trichy 905 606</Text>
                <Text style={styles.text}>Phone: 983894833</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.subHeader}>Billed To</Text>
                <Text style={styles.text}>Name: {customerDetails?.customerName}</Text>
                <Text style={styles.text}>Email: {customerDetails?.customerEmail}</Text>
                <Text style={styles.text}>Phone: {customerDetails?.customerPhone}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.subHeader}>Invoice Details</Text>
                <Text style={styles.text}>Invoice No: {invoiceData?.invoiceNumber}</Text>
                <Text style={styles.text}>Payment Terms: {invoiceData?.paymentTerms}</Text>
                <Text style={styles.text}>Due Date: 12-23-2024</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Sub total: {subTotalAmount}</Text>
                <Text style={styles.text}>Discount Amount: -{discountAmount}</Text>
                <Text style={styles.text}>Tax Amount: {/* Add tax amount here */}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Notes: Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</Text>
                <Text style={styles.text}>Terms & Conditions: Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</Text>
            </View>
        </Page>
    </Document>
);

const InvoiceLetterUi = ({ invoiceData }: any) => {
    const [subTotalAmount, setSubTotalAmount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [customerDetails, setCustomerDetails] = useState({});

    useEffect(() => {
        // Fetch customer details if needed
        setCustomerDetails({ customerName: 'John Doe', customerEmail: 'john@example.com', customerPhone: '123456789' });
        setSubTotalAmount(1000); // Example value
        setDiscountAmount(50); // Example value
    }, []);

    return (
        <div>
            <InvoicePreview
                invoiceData={invoiceData}
                customerDetails={customerDetails}
                subTotalAmount={subTotalAmount}
                discountAmount={discountAmount}
            />
            <PDFDownloadLink
                document={
                    <InvoiceDocument
                        invoiceData={invoiceData}
                        customerDetails={customerDetails}
                        subTotalAmount={subTotalAmount}
                        discountAmount={discountAmount}
                    />
                }
                fileName="invoice.pdf"
            >
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>
        </div>
    );
};

export default InvoiceLetterUi;
