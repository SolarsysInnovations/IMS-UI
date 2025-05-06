import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import About from "../about/About";
import TaxConfig from "./TaxConfig";
import LinkScreen from "./links/Portal-link-screen";
import SettingsCompanyDetailsScreen from "./settings-company/SettingsCompanyDetailsScreen";
import RoleBasedTabs from "../../components/ui/RoleBasedTabs";
import { Typography } from "@mui/material";
import UploadScreen from "./upload/uploadScreen";
import { useInVoiceContext } from "../../invoiceContext/invoiceContext";

const SettingScreen = () => {
  const context = useInVoiceContext();
  const [initialValuesLoaded, setInitialValuesLoaded] =
    useState<boolean>(false);
  const userRole = context.userDetails.userRole;

  useEffect(() => {
    loadInitialValues();
  }, []);

  const loadInitialValues = () => {
    setInitialValuesLoaded(true);
  };

  const tabs = [
    {
      label: "Company Settings",
      component: <SettingsCompanyDetailsScreen />,
      roles: ["ADMIN", "APPROVER", "STANDARDUSER", "SUPERADMIN"],
    },
    { label: "Upload", component: <UploadScreen />, roles: ["ADMIN"] },
    { label: "Portals", component: <LinkScreen />, roles: ["ADMIN"] },
    { label: "Tax", component: <TaxConfig />, roles: ["ADMIN"] },
    {
      label: "About",
      component: <About />,
      roles: ["ADMIN", "APPROVER", "STANDARDUSER", "SUPERADMIN"],
    },
  ];

  return (
    <Container fixed>
      {initialValuesLoaded ? (
        <RoleBasedTabs tabs={tabs} userRole={userRole} />
      ) : (
        <Typography></Typography>
      )}
    </Container>
  );
};

export default SettingScreen;
