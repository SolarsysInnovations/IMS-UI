import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import About from "../about/About";
import TaxConfig from "./TaxConfig";
import LinkScreen from "./links/Portal-link-screen";
import SettingsCompanyDetailsScreen from "./settings-company/SettingsCompanyDetailsScreen";
import { selectCurrentId } from "../../redux-store/auth/authSlice";
import { useSelector } from "react-redux";
import RoleBasedTabs from "../../components/ui/RoleBasedTabs";
import { Typography } from "@mui/material";
import UploadScreen from "./upload/uploadScreen";
import { useGetUserRoleMutation } from "../../redux-store/api/injectedApis";

const SettingScreen = () => {
  const [initialValuesLoaded, setInitialValuesLoaded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Company Settings");
  const id = useSelector(selectCurrentId);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [getUserRole, { data: userRoleData, isLoading }] = useGetUserRoleMutation();
  
  useEffect(() => {
    if (id) {
      getUserRole(id) // Pass id directly here
        .unwrap()
        .then((response) => {
          setUserRole(response?.userRole || null);
          loadInitialValues();
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    }
  }, [id, getUserRole]);

  const loadInitialValues = () => {
    setInitialValuesLoaded(true);
  };

  const handleTabChange = (newTabIndex: number) => {
    setActiveTab(tabs[newTabIndex].label); // Now we pass the tab label, not the index
  };
  

  const tabs = [
    { label: "Company Settings", component: <SettingsCompanyDetailsScreen />, roles: ["ADMIN", "APPROVER", "STANDARDUSER","SUPERADMIN"] },
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
    <React.Fragment>
      <Container fixed>
        {initialValuesLoaded ? (
          <RoleBasedTabs tabs={tabs} userRole={userRole} />
        ) : (
          <Typography></Typography>
        )}
      </Container>
    </React.Fragment>
  );
};

export default SettingScreen;
