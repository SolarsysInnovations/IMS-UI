import React, { useEffect, useState } from 'react';
import { useAddSettingMutation, useGetSettingQuery } from '../../../src/redux-store/settings/settingsApi';
import { ToastContainer } from 'react-toastify';
import { Box, Grid } from "@mui/material";

const PreviewScreen: React.FC = () => {
    const [addLink, { isLoading, isSuccess, isError, error }] = useAddSettingMutation();
    const { data: companyData, refetch: refetchCompanyData } = useGetSettingQuery();
    const [companyDetails, setCustomerDetails] = useState<any>(companyData)
    console.log("company", JSON.stringify(companyData));
console.log("companyData", companyData);
    console.log("values", companyDetails);
    const onSubmit = async (values: any, actions: any) => {
        try {
            actions.resetForm();
            await addLink(values);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
         if (companyData) {
            setCustomerDetails(companyData)
         }
     }, [])
    useEffect(() => {
        if (isSuccess) {
            refetchCompanyData();
        }
    }, [isSuccess, refetchCompanyData]);

    return (
        <div>
            <ToastContainer />
            <Grid container sx={{ backgroundColor: "#f8f9f9", padding: "20px 20px" }}>
            <Grid sx={{ marginTop: "0px" }} item xs={7}>
                <Box gap={3}>
                    <div>
                        <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Name </span> <span>: {companyDetails?.companyName}</span></p>
                    </div>
                    <div>
                        <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Address </span> <span>: {companyDetails?.companyAddress}</span></p>
                    </div>
                    <div>
                        <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company State </span> <span>: {companyDetails?.companyState}</span></p>
                    </div>
                    <div>
                        <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Country</span> <span>: {companyDetails?.companyCountry}</span></p>
                    </div><div>
                        <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company E-mail </span> <span>: {companyDetails?.companyEmail}</span></p>
                    </div>
                </Box>
            </Grid>
            <Grid sx={{ marginTop: "0px", }} item xs={4}>
                        <Box gap={3}>
                            <div>
                                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Phone</span> <span>: {companyDetails?.companyPhone}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Cell</span> <span>: {companyDetails?.companyCell}</span></p>
                            </div>
                            <div>
                                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Website</span> <span>: {companyDetails?.companyWebsite}</span></p>
                            </div><div>
                                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Tax Num</span> <span>: {companyDetails?.companyTaxNumber}</span></p>
                            </div><div>
                                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}><span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Reg Num</span> <span>: {companyDetails?.companyRegNumber}</span></p>
                            </div>
                        </Box>
                    </Grid>

            </Grid>
        </div>
    );
};

export default PreviewScreen;
