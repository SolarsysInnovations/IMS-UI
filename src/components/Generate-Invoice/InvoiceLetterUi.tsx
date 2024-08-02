// invoice letter


import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import TableContent from './TableContent'
import { useGetCustomersQuery } from '../../redux-store/customer/customerApi'

const InvoiceLetterUi = ({ invoiceData, }: any) => {
    const [subTotalAmount, setSubTotalAmount] = useState<number>(0);
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [customerDetails, setCustomerDetails] = useState<any>();

    // const { data: customers, error: customerListError, isLoading: customerListLoading, refetch, isSuccess } = useGetCustomersQuery();

    // useEffect(() => {
    //     if (invoiceData) {
    //         const calculateTotal = invoiceData?.servicesList?.reduce((total: any, service: any) => {
    //             return total + service.serviceAmount;
    //         }, 0);
    //         setSubTotalAmount(calculateTotal);
    //         const disAmount = (subTotalAmount * (invoiceData.discountPercentage ?? 0)) / 100;
    //         setDiscountAmount(disAmount);
    //     }
    // }, [invoiceData, subTotalAmount]);

    // useEffect(() => {
    //     if (invoiceData) {
    //         const details = invoiceData.customerName;
    //         const customerDetails = customers?.find((customer: any) => details === customer.customerName);
    //         setCustomerDetails(customerDetails);
    //     }
    // }, [customers, invoiceData]);
    return (
        <div className='App' id='invoiceCapture' style={{ padding: "50px 30px" }} >
            <Grid container sx={{ borderBottom: "1px solid #dadada", paddingBottom: "15px" }} >
                <Grid sx={{ marginTop: "0px", display: "flex", alignContent: "flex-start", alignItems: "flex-start", }} item xs={6.5} >
                    <Box>
                        <h1 style={{ marginTop: "0px", textAlign: "left" }}>INVOICE</h1>
                    </Box>
                </Grid>
                <Grid sx={{ marginTop: "0px", paddingBottom: "10px", display: "flex", alignItems: "right", justifyContent: "left", }} item xs={5.5} >
                    <Box>
                        <div>
                            <p style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 5px 0", }} > <span style={{ fontWeight: "500" }}>SOLARSYS</span> </p>
                        </div>
                        <div>
                            <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}> {" "}
                                <span style={{ fontWeight: "500", width: "60px", display: "inline-block", }} > Address : </span>{" "}
                                <span>
                                    1/305, Thillai Nagar, Trichy 905 606 </span>
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>
                                <span style={{ fontWeight: "500", width: "60px", display: "inline-block", }} > Phone : </span>{" "} <span>983894833</span> </p>
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <Grid container sx={{ backgroundColor: "#f8f9f9", marginTop: "30px", padding: "20px 20px", }} >
                <Grid sx={{ marginTop: "0px" }} item xs={4} >
                    <Box gap={3}>
                        <div>
                            <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>
                                <span style={{ fontWeight: "500", width: "60px", display: "inline-block", }} > Billed To{" "} </span>{" "}
                                <span>: {customerDetails?.customerName}</span>
                            </p> </div>
                        <div>
                            <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>
                                <span style={{ fontWeight: "500", width: "60px", display: "inline-block", }} >
                                    Email{" "} </span>{" "} <span>: {customerDetails?.customerEmail}</span>
                            </p>
                        </div> <div> <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>
                            <span style={{ fontWeight: "500", width: "60px", display: "inline-block", }} > Phone{" "} </span>{" "}
                            <span>: {customerDetails?.customerPhone}</span> </p>
                        </div>
                    </Box>
                </Grid>
                <Grid sx={{ marginTop: "0px" }} item xs={4} >
                    <Box gap={3}>
                        <div>
                            <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>
                                <span style={{ fontWeight: "500", width: "100px", display: "inline-block", }} > Invoice No{" "} </span>{" "}
                                <span>: {invoiceData?.invoiceNumber}</span>
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}> <span style={{ fontWeight: "500", width: "100px", display: "inline-block", }} > Payment Terms{" "} </span>{" "} <span>: {invoiceData?.paymentTerms}</span> </p>
                        </div>
                        <div>
                            <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>
                                <span style={{ fontWeight: "500", width: "100px", display: "inline-block", }} > Due Date{" "} </span>{" "} <span>: 12-23-2024</span>
                            </p>
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid sx={{ marginTop: "0px" }} item xs={12} >
                    <Box sx={{ mt: 5 }}> <TableContent tableData={invoiceData || []} /> </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid sx={{ marginTop: "0px" }} item xs={12} >
                    <Box sx={{ display: "flex", justifyContent: "right", mt: 2 }}>
                        <div style={{ display: "flex", width: "250px", justifyContent: "space-between", }} >
                            <p style={{ fontSize: "13px", margin: "0 0 5px 0", fontWeight: "600", }} >
                                Sub total </p>
                            <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>{subTotalAmount}</p>
                        </div>
                    </Box>
                </Grid>
                <Grid sx={{ marginTop: "0px" }} item xs={12} >
                    <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <div style={{ display: "flex", width: "250px", justifyContent: "space-between", }} > <p style={{ fontSize: "13px", margin: "0 0 5px 0", fontWeight: "600", }} > Discount Amount </p>
                            <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>-{discountAmount}</p>
                        </div>
                    </Box>
                </Grid>
                <Grid sx={{ marginTop: "0px" }} item xs={12} >
                    <Box sx={{ display: "flex", justifyContent: "right" }}>
                        <div style={{ display: "flex", width: "250px", justifyContent: "space-between", }} >
                            <p style={{ fontSize: "13px", margin: "0 0 5px 0", fontWeight: "600", }} > Tax Amount </p> <p style={{ fontSize: "12px", margin: "0 0 5px 0" }}>
                                {/* {invoiceData.totalAmount} */}
                            </p>
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid sx={{ marginTop: "20px" }} item xs={12} >
                    <Box>
                        <div>
                            <p style={{ fontSize: "12px" }}>
                                <span style={{ fontWeight: "500", width: "130px", display: "inline-block", }} > Notes{" "} </span>{" "} : Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus! </p>
                        </div>
                    </Box>
                    <Box>
                        <div>
                            <p style={{ fontSize: "12px" }}> <span style={{ fontWeight: "500", width: "130px", display: "inline-block", }} > Terms & Conditions{" "} </span>{" "} : Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, doloribus! </p>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default InvoiceLetterUi