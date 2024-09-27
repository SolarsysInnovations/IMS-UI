import React, { useEffect, useState } from "react";
import { useGetSingleCompanySettingMutation, useGetCompanyLogoQuery } from "../../../redux-store/api/injectedApis";
import { Box, Grid } from "@mui/material";
import TableHeader from "../../../components/layouts/TableHeader";
import { Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import usePathname from "../../../hooks/usePathname";
import { setData } from "../../../redux-store/global/globalState";
import DialogBoxUi from "../../../components/ui/DialogBox";
import SettingsCompanyForm from "./SettingsCompanyForm";
import { selectUserDetails, selectUserRole } from "../../../redux-store/auth/authSlice";

const SettingsCompanyDetailsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const [getData, { data: customerData, isSuccess: C_success, isError: C_error }] = useGetSingleCompanySettingMutation();
  const companyInfo = useSelector(selectUserDetails);
  const userRole = useSelector(selectUserRole);

  const [openModal, setOpenModal] = useState(false);
  const [opendialogBox, setIsOpenDialogBox] = useState(false);

  // Fetch company logo using companyId from companyInfo
  const { data: logoData, isSuccess: logoSuccess, isError: logoError } = useGetCompanyLogoQuery(companyInfo?.companyDetails?.id);

  // Convert ArrayBuffer to base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary); // Convert to base64
  };

  // Get base64 string for company logo
  const getCompanyLogo = () => {
    if (logoData && logoData.companyLogo) {
      const base64String = logoData.companyLogo; // Assuming companyLogo is a base64 string
      return `data:image/jpeg;base64,${base64String}`;
    }
    return null;
  };

  useEffect(() => {
    if (logoSuccess && logoData) {
      console.log("Logo Base64 String:", logoData.companyLogo); // Logs the base64 string of the logo
    }
  }, [logoData, logoSuccess]);

  const handleEditClick = async () => {
    try {
      const response = await getData(companyInfo.companyDetails.id);
      if ("data" in response) {
        const companyData = response.data;
        await dispatch(setData(companyData));
        setOpenModal(true);
        setIsOpenDialogBox(true);
      } else {
        console.error("Error response:", response.error);
      }
    } catch (error) {
      console.error("Error handling edit click:", error);
    }
  };

  const handleCloseDialog = () => {
    setIsOpenDialogBox(false); // Close the dialog box
  };

  const button = userRole !== "APPROVER" && userRole !== "ENDUSER" ? [{ label: "Edit", icon: Edit, onClick: handleEditClick }] : [];

  return (
    <>
      <DialogBoxUi
        open={opendialogBox}
        content={<SettingsCompanyForm companyValue={companyInfo?.companyDetails} mode="edit" handleCloseDialog={handleCloseDialog} />}
        handleClose={handleCloseDialog}
      />
      <TableHeader buttons={button} />

      {companyInfo && (
        <Grid container sx={{ backgroundColor: "#f8f9f9", padding: "20px 20px" }}>
          <Grid item xs={7}>
            <Box gap={3}>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Name</span>
                  <span>: {companyInfo?.companyDetails.companyName}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Address</span>
                  <span>: {companyInfo?.companyDetails.companyAddress}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company City</span>
                  <span>: {companyInfo?.companyDetails.companyCity}</span>
                </p>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company State</span>
                  <span>: {companyInfo?.companyDetails.companyState}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Country</span>
                  <span>: {companyInfo?.companyDetails.companyCountry}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company E-mail</span>
                  <span>: {companyInfo?.companyDetails.companyEmail}</span>
                </p>
              </div>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box gap={3}>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Phone</span>
                  <span>: {companyInfo?.companyDetails.companyPhone}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Website</span>
                  <span>: {companyInfo?.companyDetails.companyWebsite}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Tax Num</span>
                  <span>: {companyInfo?.companyDetails.companyTaxNumber}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>Company Reg Num</span>
                  <span>: {companyInfo?.companyDetails.companyRegNumber}</span>
                </p>
              </div>
            </Box>
          </Grid>

          <Grid container spacing={2}>
  <Grid item xs={12}>
    <Box display="flex" alignItems="center" sx={{marginTop:"10px"}} gap={3}>
      <Box component="span" fontWeight={500} width="140px" fontSize="13px">
        Uploaded Image 
      </Box>
      {logoData && logoData.companyLogo ? (
        <img
          src={getCompanyLogo() ?? undefined}
          alt="Company Logo"
          style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "contain" }}
        />
      ) : (
        <Box component="span" fontSize="13px">
          : No image available
        </Box>
      )}
    </Box>
  </Grid>
</Grid>

        </Grid>
      )}
    </>
  );
};

export default SettingsCompanyDetailsScreen;