import { Box, Button, Stack, Typography } from '@mui/material';
import React, { forwardRef, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import TableContent from '../components/Generate-Invoice/TableContent';
import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";

const borderColor = '#000'
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    text: {
        fontSize: "12px"
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        display: "flex",
        justifyContent: "space-between",
        padding: "2px 5px"
    },
    description: {
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    qty: {
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        textAlign: 'right',
        paddingRight: 8,
    },
    rowData: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        display: "flex",
        justifyContent: "space-between",
        padding: "2px 5px"
    },
    rowDataHead: {
        marginTop: "15px",
    }
});




export const MyDocument = () => {

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Text>hello world</Text>
                    <Text style={styles.text}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum nesciunt rem, dignissimos explicabo doloribus molestias aliquam. Dolorum esse assumenda at. Reprehenderit asperiores, harum impedit explicabo aperiam id cum nihil inventore voluptatum sit delectus odio. Iste voluptate odit odio deleniti aperiam facere obcaecati deserunt, voluptatem itaque doloribus. Iure cupiditate excepturi, soluta voluptate vel recusandae illum quam dolor adipisci porro voluptatibus fugiat, hic eveniet! Atque assumenda dolorum vitae beatae odit qui! Ipsum exercitationem tenetur aut, molestias dolore molestiae aspernatur non corporis cum quisquam, perferendis minus quos suscipit totam animi recusandae voluptas tempora facilis ab omnis modi consequuntur. Optio adipisci a quia nihil!</Text>
                    <div style={styles.row}>
                        <Text style={styles.description}>desc</Text>
                        <Text style={styles.qty}>qty</Text>
                        <Text style={styles.rate}>rate</Text>
                        <Text style={styles.amount}>amount</Text>
                    </div>
                    <View style={styles.rowData}  >
                        <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vitae neque cupiditate.</Text>
                        <Text style={styles.qty}>qty</Text>
                        <Text style={styles.rate}>rate</Text>
                        <Text style={styles.amount}>amount</Text>
                    </View>
                </div>
            </Page>
        </Document>
    )
};


const DemoScreen = forwardRef(() => {
    const componentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="">
            <ReactToPrint
                trigger={() => <Button variant="contained" color="primary">Generate</Button>}
                content={() => componentRef.current}
            />
            <Box sx={{
                p: 7, backgroundImage: 'url("https://img.freepik.com/free-photo/detailed-structure-marble-natural-pattern-background-design_1258-77564.jpg?t=st=1710155516~exp=1710159116~hmac=0a89aacba17c0a78ab3f273ccefa60ba37401fee5e459395a6523e01cdf5b178&w=740")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }} ref={componentRef}>
                <Box sx={{
                    textAlign: "right",
                }}>
                    <Typography variant="h1" color="initial">INVOICE</Typography>
                </Box>
                <Stack sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 6,
                }}>
                    <Box gap={3}>
                        <Typography variant="subtitle2" color="initial">Billed To : <span>Really Great Company</span></Typography>
                        <Typography variant="subtitle2" color="initial">Address 4545 Lorem ipsum dolor <br /> sit Lorem, ipsum dolor.</Typography>
                    </Box>
                    <Box gap={3}>
                        <Typography variant="subtitle2" color="initial">Invoice : <span>INV - 00090</span></Typography>
                        <Typography variant="subtitle2" color="initial">Invoice Date : <span>09-4-2024</span></Typography>
                        <Typography variant="subtitle2" color="initial">Terms : <span>Due On Receipt</span></Typography>
                        <Typography variant="subtitle2" color="initial">Due Date : <span>19-may 2023</span></Typography>
                    </Box>
                </Stack>
                <Box sx={{ mt: 6 }}>
                    <TableContent />
                </Box>
                <Stack sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 10,
                }}>
                    <Box gap={3} >
                        <Typography variant="subtitle2" color="initial">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus!</Typography>

                    </Box>
                    <Box gap={3} >
                        <Typography variant="subtitle2" color="initial">Sub Total : <span>443</span></Typography>
                        <Typography variant="subtitle2" color="initial">Tax Rate : <span>5.00%</span></Typography>
                        <Typography variant="subtitle2" color="initial">Total : <span>$1324.00</span></Typography>
                        <Typography variant="h6" color="initial">Total : <span>$1324.00</span></Typography>
                    </Box>
                </Stack>
                <Box gap={3} sx={{ mt: 10, mb: 7 }}>
                    <Typography variant="subtitle2" color="initial">Terms & Conditions</Typography>
                    <Typography variant="subtitle2" color="initial">All payments must be made in full before any design work</Typography>
                </Box>
            </Box>

            <MyDocument />
            <PDFDownloadLink document={<MyDocument />} >
                {({ loading }) => (loading ? <button>Loading Document...</button> : <button>Download</button>)}
            </PDFDownloadLink>

        </div >
    );
});

export default DemoScreen;
