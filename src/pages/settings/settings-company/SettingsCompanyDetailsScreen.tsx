import React, { useEffect, useState } from "react";
import { useGetCompanySettingQuery, useGetSingleCompanySettingMutation } from "../../../redux-store/api/injectedApis";
import { Box, Grid } from "@mui/material";
import TableHeader from "../../../components/layouts/TableHeader";
import { Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import usePathname from "../../../hooks/usePathname";
import { setData } from "../../../redux-store/global/globalState";
import DialogBoxUi from "../../../components/ui/DialogBox";
import SettingsCompanyScreen from "./SettingsCompanyScreen";
import { selectUserDetails } from "../../../redux-store/auth/authSlice";
import { selectUserRole } from "../../../redux-store/auth/authSlice";

const SettingsCompanyDetailsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const [getData, { data: customerData, isSuccess: C_success, isError: C_error }] = useGetSingleCompanySettingMutation();

  // Directly use the user details from the Redux store
  const companyInfo = useSelector(selectUserDetails);
  console.log("companyInfo", companyInfo);

  const [openModal, setOpenModal] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [opendialogBox, setIsOpenDialogBox] = useState(false);
  const userRole = useSelector(selectUserRole);


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

  const button = userRole !== "APPROVER" && userRole !== "ENDUSER" ? [{ label: "Edit", icon: Edit, onClick: () => handleEditClick() }] : [];
  return (
    <>
      <DialogBoxUi
        open={opendialogBox}
        content={<SettingsCompanyScreen />}
        handleClose={() => setIsOpenDialogBox(false)}
      />
      <TableHeader buttons={button} />
      {companyInfo && (
        <Grid container sx={{ backgroundColor: "#f8f9f9", padding: "20px 20px" }}>
          <Grid sx={{ marginTop: "0px" }} item xs={7}>
            <Box gap={3}>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Name
                  </span>
                  <span>: {companyInfo?.companyDetails.companyName}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Address
                  </span>
                  <span>: {companyInfo?.companyDetails.companyAddress}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company State
                  </span>
                  <span>: {companyInfo?.companyDetails.companyState}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Country
                  </span>
                  <span>: {companyInfo?.companyDetails.companyCountry}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company E-mail
                  </span>
                  <span>: {companyInfo?.companyDetails.companyEmail}</span>
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
                  <span>: {companyInfo?.companyDetails.companyPhone}</span>
                </p>
              </div>

              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Website
                  </span>
                  <span>: {companyInfo?.companyDetails.companyWebsite}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Tax Num
                  </span>
                  <span>: {companyInfo?.companyDetails.companyTaxNumber}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span style={{ fontWeight: "500", width: "140px", display: "inline-block" }}>
                    Company Reg Num
                  </span>
                  <span>: {companyInfo?.companyDetails.companyRegNumber}</span>
                </p>
              </div>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SettingsCompanyDetailsScreen;
