import { Box, Button, Stack, Typography } from '@mui/material';
import React, { forwardRef, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";



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

            </Box>
        </div >
    );
});






export default DemoScreen;
