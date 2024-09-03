import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, pdf } from "@react-pdf/renderer";

const randomImageUrl = "https://picsum.photos/200";

// Styles for PDF document
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#fff",

        padding: "30px 30px 0px 30px",
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
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
    },
    tableCell: {
        padding: 8,
        fontSize: 12,
        flex: 1,
        textAlign: "center",
    },
    tableHeader: {
        fontWeight: "bold",
    },
    tableCellLast: {
        borderRight: "none",
    },
});

// Invoice Document component for PDF
const InvoiceDocument = ({ invoiceData }: any) => {
    console.log("invoiceData :", invoiceData);
    // if (invoiceData) {
    //     console.log("invoicesddsfds Data", invoiceData);

    //     console.log("customer Name", invoiceData.customerDetails);
    // }

    // tdsAmountValue: 11000,
    // discountPercentageValue: 4050,
    // gstPercentageValue: 6548,
    // totalValue: 126503
    return invoiceData ? (
        <Document>
            <Page size='A4' style={styles.page} >
                <View style={{ flexDirection: "row", alignItems: "center", gap: "30px" }}>
                    <View>
                        <Image style={styles.image} src={randomImageUrl} />
                    </View>
                    <View>
                        <Text style={styles.header}>{invoiceData?.companyDetails?.companyName}</Text>
                    </View>
                </View>

                <View style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginTop: "20px" }}>
                    <View>
                        {/* <Text style={styles.subHeader}>To :</Text> */}
                        <Text style={{ fontSize: '16px', marginBottom: "10px" }}>Invoice To:</Text>
                        <Text style={{ fontSize: '14px', marginBottom: "5px" }}>{invoiceData?.customerDetails?.companyName} </Text>
                        <Text style={{ fontSize: '14px', marginBottom: "5px" }}>{invoiceData?.customerDetails?.customerName} </Text>
                        <Text style={{ fontSize: '14px', marginBottom: "5px" }}>{invoiceData?.customerDetails?.customerEmail}</Text>
                        <Text style={{ fontSize: '14px', marginBottom: "5px" }}>{invoiceData?.customerDetails?.customerPhone}</Text>
                    </View>
                    {/* <View style={styles.section}>
                        <Text style={styles.subHeader}>From :</Text>
                        <Text style={styles.text}>Company Name: {invoiceData?.companyDetails?.companyName}</Text>
                    </View> */}
                    <View >
                        {/* <Text style={styles.subHeader}>Invoice :</Text> */}
                        <Text style={{ fontSize: '14px', marginBottom: "5px" }}>Invoice No: {invoiceData?.invoiceNumber}</Text>
                        <Text style={{ fontSize: '14px', marginBottom: "5px" }}>Payment Terms: {invoiceData?.paymentTerms} </Text>
                        <Text style={{ fontSize: '14px', marginBottom: "5px" }}>Due Date: {invoiceData?.dueDate}</Text>
                    </View>
                </View>

                <View style={{ borderTop: "1px solid #000", marginTop: "20px" }}></View>
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={[styles.tableCell, { fontWeight: "bold" }]}>Service Acc Code</Text>
                        {/* <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Service Des</Text> */}
                        <Text style={[styles.tableCell, { fontWeight: "bold" }]}>Service Qty</Text>
                        <Text style={[styles.tableCell, { fontWeight: "bold" }]}>Service Amount</Text>
                        <Text style={[styles.tableCell, { fontWeight: "bold" }]}>Total Amount</Text>
                    </View>
                    <View style={{ borderTop: "1px solid #000" }}></View>

                    {/* Example table rows */}
                    {invoiceData?.servicesList?.map((service: any, index: number) => (
                        <View style={[styles.tableRow, index === 0 ? { marginTop: "20px" } : { marginTop: "0px" }]}>
                            <Text style={styles.tableCell}>{service.serviceAccountingCode}</Text>
                            {/* <Text style={styles.tableCell}>{service.serviceDescription}</Text> */}
                            <Text style={styles.tableCell}>{service.serviceQty}</Text>
                            <Text style={[styles.tableCell, styles.tableCellLast]}>{service.serviceAmount}</Text>
                            <Text style={[styles.tableCell, styles.tableCellLast]}>{service.serviceTotalAmount}</Text>
                        </View>
                    ))}
                    <View style={{ borderTop: "1px solid #000", marginTop: "10px" }}></View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "10px" }}>
                    <View>
                        <Text style={styles.tableCell}>Payment Method :</Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", gap: "30px", justifyContent: "space-between" }}>
                            <View>
                                {" "}
                                <Text style={[styles.tableCell, { fontSize: "14px" }]}>Sub Total</Text>
                            </View>
                            <View>
                                {" "}
                                <Text style={styles.tableCell}>{invoiceData.subTotal}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", gap: "30px", justifyContent: "space-between", marginTop: "30px" }}>
                            <View>
                                {" "}
                                <Text style={[styles.tableCell, { fontSize: "14px" }]}>Discount Percentage {`( ${invoiceData.discountPercentage} % )`}</Text>
                            </View>
                            <View>
                                {" "}
                                <Text style={styles.tableCell}>{invoiceData.discountPercentageValue}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", gap: "30px", justifyContent: "space-between", marginTop: "30px" }}>
                            <View>
                                {" "}
                                <Text style={[styles.tableCell, { fontSize: "14px" }]}>Gst Percentage {`( ${invoiceData.discountPercentage} % )`}</Text>
                            </View>
                            <View>
                                {" "}
                                <Text style={styles.tableCell}>{invoiceData.gstPercentageValue}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", gap: "30px", justifyContent: "space-between", marginTop: "30px" }}>
                            <View>
                                {" "}
                                <Text style={[styles.tableCell, { fontSize: "14px" }]}>Tds Tax {`( ${invoiceData.taxAmount.tds} )`}</Text>
                            </View>
                            <View>
                                {" "}
                                <Text style={styles.tableCell}>{invoiceData.tdsAmountValue}</Text>
                            </View>
                        </View>

                        <View style={{ borderTop: "1px solid #000", flexDirection: "row", gap: "30px", justifyContent: "space-between", marginTop: "50px" }}>
                            <View>
                                <Text style={[styles.tableCell, { fontSize: "16px" }]}>Total Amount</Text>
                            </View>
                            <View>
                                <Text style={styles.tableCell}>{invoiceData.totalValue}</Text>
                            </View>
                        </View>

                    </View>
                </View>

                <View style={[styles.subHeader, { marginTop: "20px" }]}>
                    <Text style={styles.text}>Terms & Conditions :</Text>
                </View>
                <View style={{ marginTop: "0px" }}>
                    <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</Text>
                </View>
            </Page>
        </Document>
    ) : (
        <p>...loading</p>
    );
};

export default InvoiceDocument;
