import React, { useEffect, useState } from "react";
import {
  useAddCompanyMutation,
  useGetCompanyQuery,
  useGetCompanyByIdMutation,
} from "../../../redux-store/company/companyApi";
import { ToastContainer } from "react-toastify";
import { Box, Grid } from "@mui/material";
import TableHeader from "../../../components/layouts/TableHeader";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux-store/store";
import usePathname from "../../../hooks/usePathname";
import { useNavigate } from "react-router-dom";
import { setData } from "../../../redux-store/global/globalState";
import CompanyScreen from "./Company-screen";
import DialogBoxUi from "../../../components/ui/DialogBox";

const CompanyDetailsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const pathname = usePathname();
  const [addSetting, { isLoading, isSuccess, isError, error }] = useAddCompanyMutation();
  const { data: companyData, refetch: refetchCompanyData } = useGetCompanyQuery();
  const [getData, { data: customerData, isSuccess: C_success, isError: C_error }] = useGetCompanyByIdMutation();

  const [openModal, setOpenModal] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [opendialogBox, setIsOpenDialogBox] = useState(false);

  console.log("company details", companyDetails);

  const handleEditClick = async () => {
    try {
      const response = await getData(companyDetails.id);
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

  useEffect(() => {
    if (companyData && companyData.length > 0) {
      setCompanyDetails(companyData[0]);
    }
  }, [companyData]);

  useEffect(() => {
    if (pathname === "/settings") {
      refetchCompanyData();
    }
  }, [pathname, refetchCompanyData]);

  const handleModalClose = () => {
    refetchCompanyData();
    setOpenModal(false);
  };

  const button = [
    { label: "Edit", icon: Add, onClick: handleEditClick },
  ];

  return (
    <>
      <ToastContainer />
      <DialogBoxUi
        open={opendialogBox}
        content={<CompanyScreen />}
        handleClose={() => setIsOpenDialogBox(false)}
      />
      <TableHeader headerName={"Company Information"} buttons={button} />
      {companyDetails && (
        <Grid
          container
          sx={{ backgroundColor: "#f8f9f9", padding: "20px 20px" }}
        >
          <Grid sx={{ marginTop: "0px" }} item xs={7}>
            <Box gap={3}>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span
                    style={{
                      fontWeight: "500",
                      width: "140px",
                      display: "inline-block",
                    }}
                  >
                    Company Name
                  </span>
                  <span>: {companyDetails?.companyName}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span
                    style={{
                      fontWeight: "500",
                      width: "140px",
                      display: "inline-block",
                    }}
                  >
                    Company Address
                  </span>
                  <span>: {companyDetails?.companyAddress}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span
                    style={{
                      fontWeight: "500",
                      width: "140px",
                      display: "inline-block",
                    }}
                  >
                    Company State
                  </span>
                  <span>: {companyDetails?.companyState}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span
                    style={{
                      fontWeight: "500",
                      width: "140px",
                      display: "inline-block",
                    }}
                  >
                    Company Country
                  </span>
                  <span>: {companyDetails?.companyCountry}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span
                    style={{
                      fontWeight: "500",
                      width: "140px",
                      display: "inline-block",
                    }}
                  >
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
                  <span
                    style={{
                      fontWeight: "500",
                      width: "140px",
                      display: "inline-block",
                    }}
                  >
                    Company Phone
                  </span>
                  <span>: {companyDetails?.companyPhone}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span
                    style={{
                      fontWeight: "500",
                      width: "140px",
                      display: "inline-block",
                    }}
                  >
                    Company Cell
                  </span>
                  <span>: {companyDetails?.companyCell}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span
                    style={{
                      fontWeight: "500",
                      width: "140px",
                      display: "inline-block",
                    }}
                  >
                    Company Website
                  </span>
                  <span>: {companyDetails?.companyWebsite}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span
                    style={{
                      fontWeight: "500",
                      width: "140px",
                      display: "inline-block",
                    }}
                  >
                    Company Tax Num
                  </span>
                  <span>: {companyDetails?.companyTaxNumber}</span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                  <span
                    style={{
                      fontWeight: "500",
                      width: "140px",
                      display: "inline-block",
                    }}
                  >
                    Company Reg Num
                  </span>
                  <span>: {companyDetails?.companyRegNumber}</span>
                </p>
              </div>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CompanyDetailsScreen;
