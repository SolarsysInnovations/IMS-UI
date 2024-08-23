import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import About from "../about/About";
import TaxConfig from "./TaxConfig";
import LinkScreen from "./links/Portal-link-screen";
import SettingsCompanyDetailsScreen from "./settings-company/SettingsCompanyDetailsScreen";
import { selectUserRole } from "../../redux-store/auth/authSlice";
import { useSelector } from "react-redux";
import RoleBasedTabs from "../../components/ui/RoleBasedTabs";
import { Typography } from "@mui/material";

const SettingScreen = () => {
  const [initialValuesLoaded, setInitialValuesLoaded] = useState<boolean>(false);
  const userRole = useSelector(selectUserRole) || "user"; // Provide a default role if null

  useEffect(() => {
    loadInitialValues();
  }, []);

  const loadInitialValues = () => {
    setInitialValuesLoaded(true);
  };

  const tabs = [
    { label: "Company Settings", component: <SettingsCompanyDetailsScreen />, roles: ["ADMIN", "APPROVER", "STANDARDUSER","SUPERADMIN"] },
    { label: "Portals", component: <LinkScreen />, roles: ["ADMIN"] },
    { label: "Tax", component: <TaxConfig />, roles: ["ADMIN"] },
    { label: "About", component: <About />, roles: ["ADMIN", "APPROVER", "STANDARDUSER","SUPERADMIN"] },
  ];

  return (
    <React.Fragment>
      <Container fixed>
        {initialValuesLoaded ? (
          <RoleBasedTabs tabs={tabs} userRole={userRole} />
        ) : (
          <Typography>Loading initial values...</Typography>
        )}
      </Container>
    </React.Fragment>
  );
};

export default SettingScreen;
