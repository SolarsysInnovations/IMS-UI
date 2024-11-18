import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import {
  useGetCompanySettingByIdQuery,
  useGetCompanyLogoByIdQuery,
  useGetSingleCompanySettingMutation,
} from "../../../redux-store/api/injectedApis";
import { Box, Grid } from "@mui/material";
import { setData } from "../../../redux-store/global/globalState";
import TableHeader from "../../../components/layouts/TableHeader";
import SettingsCompanyForm from "./SettingsCompanyForm";
import { Edit } from "@mui/icons-material";
import DialogBoxUi from "../../../components/ui/DialogBox";
import { selectUserRole } from "../../../redux-store/auth/authSlice";
import usePathname from "../../../hooks/usePathname";

const SettingsCompanyDetailsScreen: React.FC = () => {
  console.log("SettingsCompanyDetailsScreen Rendered");

  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [opendialogBox, setIsOpenDialogBox] = useState(false);

  const userRole = useSelector(selectUserRole);
  const companyIdString = sessionStorage.getItem("id") || ""; // Use empty string as fallback
  const { id: companyId } = companyDetails || {};
  
  // Fetch company details based on the stored company ID
  const { data: companyData, refetch: refetchCompanyData } = useGetCompanySettingByIdQuery(companyIdString);
  const [getData, { data: customerData }] = useGetSingleCompanySettingMutation();
  const { data: logoData, isSuccess: logoSuccess, isError: logoError, refetch: refetchLogoData } = useGetCompanyLogoByIdQuery(companyId);

  useEffect(() => {
    if (companyData) {
      setCompanyDetails(companyData);
      console.log("Fetched company data:", companyData); // Log company data
    }
  }, [companyData]);

  useEffect(() => {
    if (pathname === "/settings") {
      refetchCompanyData();
      refetchLogoData();
    }
  }, [pathname, refetchCompanyData, refetchLogoData]);

  const handleEditClick = async () => {
    console.log("Edit button clicked");
    if (!companyDetails?.id) {
      console.error("Company ID is not defined.");
      return;
    }
    try {
      const response = await getData(companyDetails.id);
      if ("data" in response) {
        const companyData = response.data;
        await dispatch(setData(companyData)); // Store company data in global state
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
    console.log("Dialog closed");
    refetchCompanyData();
    setIsOpenDialogBox(false);
  };

  const button =
    userRole !== "APPROVER" && userRole !== "ENDUSER"
      ? [{ label: "Edit", icon: Edit, onClick: handleEditClick }]
      : [];
  console.log("Current company details:", companyDetails);
  return (
    <>
      <DialogBoxUi
        open={opendialogBox}
        content={
          <SettingsCompanyForm
            companyValue={companyDetails}
            mode="edit"
            handleCloseDialog={handleCloseDialog}
          />
        }
        handleClose={handleCloseDialog}
      />
      <TableHeader buttons={button} />

      {companyIdString && (
        <Grid container sx={{ backgroundColor: "#f8f9f9", padding: "20px 20px" }}>
          <Grid item xs={7}>
            <Box gap={3}>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Name
                  </span>
                  <span>: {companyDetails?.companyName}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Address
                  </span>
                  <span>: {companyDetails?.companyAddress}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company State
                  </span>
                  <span>: {companyDetails?.companyState}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Country
                  </span>
                  <span>: {companyDetails?.companyCountry}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company E-mail
                  </span>
                  <span>: {companyDetails?.companyEmail}</span>
                </p>
              </div>
            </Box>
          </Grid>
          <Grid sx={{ marginTop: "0px" }} item xs={4}>
            <Box gap={3}>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Phone
                  </span>
                  <span>: {companyDetails?.companyPhone}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Website
                  </span>
                  <span>: {companyDetails?.companyWebsite}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Tax Num
                  </span>
                  <span>: {companyDetails?.companyTaxNumber}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Reg Num
                  </span>
                  <span>: {companyDetails?.companyRegNumber}</span>
                </p>
              </div>
              
            {companyIdString && userRole === "ADMIN" && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" sx={{ marginTop: "10px" }}>
                  <Box component="span" fontWeight={500} width="140px" fontSize="13px">
                    Logo :
                  </Box>
                   {logoData ? (
                    <img
                      src={`data:image/jpeg;base64,${logoData.companyLogo}`}
                      alt="Company Logo"
                      style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "contain" }}
                    />
                  ) : (
                    <Box component="span" fontSize="13px">No image available</Box>
                  )} 
                </Box>
              </Grid>
            </Grid>
           )}  
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SettingsCompanyDetailsScreen;