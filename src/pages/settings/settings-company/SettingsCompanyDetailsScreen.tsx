import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux-store/store";
import {
  useGetCompanySettingByIdQuery,
  useGetCompanyLogoByIdQuery,
  useGetSingleCompanySettingMutation,
  useGetUserRoleMutation,
} from "../../../redux-store/api/injectedApis";
import { Box, Grid } from "@mui/material";
import { setData } from "../../../redux-store/global/globalState";
import TableHeader from "../../../components/layouts/TableHeader";
import SettingsCompanyForm from "./SettingsCompanyForm";
import { Edit } from "@mui/icons-material";
import DialogBoxUi from "../../../components/ui/DialogBox";
import { selectCurrentId } from "../../../redux-store/auth/authSlice";
import usePathname from "../../../hooks/usePathname";

const SettingsCompanyDetailsScreen: React.FC = () => {
  console.log("SettingsCompanyDetailsScreen Rendered");

  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [opendialogBox, setIsOpenDialogBox] = useState(false);
  const [base64String, setBase64String] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [getUserRole, { data: userRoleData, isLoading }] =
    useGetUserRoleMutation();
  const userId = useSelector(selectCurrentId) || ""; // Use empty string as fallback
  const { id: companyId } = companyDetails || {};
  const { data: companyData, refetch: refetchCompanyData } =
    useGetCompanySettingByIdQuery(userId);

  const [getData] = useGetSingleCompanySettingMutation();

  const {
    data: logoData,
    isSuccess: logoSuccess,
    isError: logoError,
    refetch: refetchLogoData,
  } = useGetCompanyLogoByIdQuery(companyId, {
    skip: !companyId,
  });

  useEffect(() => {
    if (userId) {
      getUserRole(userId) // Pass id directly here
        .unwrap()
        .then((response) => {
          setUserRole(response?.userRole || null);
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    }
  }, [userId, getUserRole]);

  useEffect(() => {
    if (logoSuccess && logoData?.companyLogo) {
      setBase64String(`data:image/jpeg;base64,${logoData.companyLogo}`);
    } else {
      setBase64String(null);
    }
  }, [logoSuccess, logoData]);

  useEffect(() => {
    if (companyData) {
      setCompanyDetails(companyData);
      console.log("Fetched company data:", companyData);
    }
  }, [companyData]);

  useEffect(() => {
    if (userId) {
      refetchCompanyData();
    }
    if (companyId) {
      refetchLogoData();
    }
  }, [userId, companyId, refetchCompanyData, refetchLogoData]);

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
    refetchLogoData();
    setIsOpenDialogBox(false);
  };

  const button =
    userRole !== "APPROVER" && userRole !== "ENDUSER"
      ? [{ label: "Edit", icon: Edit, onClick: handleEditClick }]
      : [];

  if (!companyDetails) {
    return <div></div>; // Ensure companyDetails are fetched before rendering the content
  }

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

      {userId && (
        <Grid
          container
          sx={{ backgroundColor: "#f8f9f9", padding: "20px 20px" }}
        >
          <Grid item xs={7}>
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
              <p
                style={{
                  fontSize: "13px",
                  margin: "0 0 5px 0",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    fontWeight: "500",
                    width: "140px",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis", // Optional for long labels
                  }}
                >
                  Company Address
                </span>
                <span style={{ flex: 1 }}>
                  {" "}
                  : {companyDetails?.companyAddress}
                </span>
              </p>

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

              {userId && userRole === "ADMIN" && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ marginTop: "10px" }}
                    >
                      <Box
                        component="span"
                        fontWeight={500}
                        width="140px"
                        fontSize="13px"
                      >
                        Logo
                      </Box>
                      :{" "}
                      <Box
                        sx={{
                          width: "150px",
                          height: "150px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: base64String ? "1px solid #ddd" : "none", // Conditional border
                          borderRadius: "8px",
                          overflow: "hidden",
                          backgroundColor: base64String
                            ? "transparent"
                            : "#f8f9fa", // Optional background for no image
                        }}
                      >
                        {base64String ? (
                          <img
                            src={base64String}
                            alt="Company Logo"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <Box component="span" fontSize="13px">
                            No image available
                          </Box>
                        )}
                      </Box>
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
