import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import TextFieldUi from '../../components/ui/TextField';
import SelectDropdown from '../../components/ui/SelectDropdown';

interface InvoiceCalculationProps {
    subTotalInvoiceAmount: number | null;
    values: any;
    setDiscountPercentage: any;
    setFieldValue: any;
    discountAmount: number | null;
    invoiceTotalAmount: number | null | undefined;
    setSelectedTdsAmount: any;
    tdsAmount: number | null;

}
const tdsOptions = [
    {
        value: "Professional Service 10%",
        label: "Professional Service 10%"
    },
]
const InvoiceCalculation = ({ tdsAmount, setSelectedTdsAmount, subTotalInvoiceAmount, values, setDiscountPercentage, setFieldValue, discountAmount, invoiceTotalAmount }: InvoiceCalculationProps) => {
    return (
        <>
            <Grid container mt={3} mb={3} spacing={4} justifyContent="flex-end">
                <Box sx={{
                    width: '40%',
                    padding: "20px",
                    backgroundColor: "#fafafa",
                    borderRadius: "10px",
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: "space-between",
                    }}>
                        <Typography variant="body2" color="initial">Sub Total: </Typography>
                        <Typography variant="body2" color="initial">{subTotalInvoiceAmount}</Typography>
                    </Box>
                    <Box sx={{
                        marginTop: "10px",
                        display: 'flex',
                        justifyContent: "space-between",
                    }}>
                        <Box sx={{
                            display: 'flex',
                            gap: "30px",
                            justifyContent: "space-between",
                        }}>
                            <TextFieldUi
                                width='100px'
                                label='Discount %'
                                name='discount'
                                type="number"
                                value={values.discountAmount !== null ? values.discountAmount.toString() : ""}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const parsedValue = value !== "" ? parseFloat(value) : null;
                                    setDiscountPercentage(parsedValue); // Set discountAmount as a number or null
                                    setFieldValue("discountAmount", value);
                                }}
                            />
                        </Box>
                        <Typography variant="body2" color="initial">-{discountAmount}</Typography>
                    </Box>
                    <Box sx={{
                        marginTop: "10px",
                        display: 'flex',
                        justifyContent: "space-between",
                    }}>
                        <Box sx={{ display: "flex" }} >
                            <SelectDropdown
                                width='150px'
                                onChange={(newValue: any) => {
                                    if (newValue) {
                                        if (newValue.value === "Professional Service 10%") {
                                            setFieldValue("taxAmount.tds", newValue.value)
                                            setSelectedTdsAmount(newValue.value)
                                        }
                                        setFieldValue("taxAmount.tds", newValue.value)
                                    }
                                    else {
                                        setFieldValue("taxAmount.tds", "")
                                    }
                                }}
                                options={tdsOptions}
                                value={values.taxAmount.tds ? { value: values.taxAmount.tds, label: values.taxAmount.tds } : null}
                                labelText='TDS %'
                            />
                        </Box>
                        <Typography variant="body2" color="initial">-{tdsAmount}</Typography>
                    </Box>
                    <Divider sx={{ marginTop: "20px" }} />
                    <Box sx={{
                        marginTop: "10px",
                        display: 'flex',
                        justifyContent: "space-between",
                    }}>

                        <Typography variant="subtitle1" color="initial">Total Amount: </Typography>
                        <Typography variant="subtitle2" color="initial">{invoiceTotalAmount}</Typography>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

export default InvoiceCalculation