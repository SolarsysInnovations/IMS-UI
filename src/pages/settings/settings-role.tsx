import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import About from "../about/About";
import TaxConfig from "./TaxConfig";
import LinkScreen from "./links/Portal-link-screen";
import SettingsCompanyDetailsScreen from "./settings-company/SettingsCompanyDetailsScreen";

const SettingRoleScreen = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [initialValuesLoaded, setInitialValuesLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Load initial values when the component mounts
    loadInitialValues();
  }, []);

  useEffect(() => {
    // Trigger a refetch or any necessary update when the tab changes
    if (currentTabIndex === 0) {
      // Refetch data when the SettingsCompanyDetailsScreen is displayed
      // You can trigger a function to refetch the data or reset local state here if needed
    }
  }, [currentTabIndex]);  // Trigger when the tab index changes

  const loadInitialValues = () => {
    setInitialValuesLoaded(true); // For demonstration, setting it to true immediately
  };

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  const renderTabContent = () => {
    switch (currentTabIndex) {
      case 0:
        return <SettingsCompanyDetailsScreen />;
      case 1:
        return <About />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Tabs value={currentTabIndex} variant="fullWidth" onChange={handleTabChange}>
        <Tab label="Company Information" />
        <Tab label="About" />
      </Tabs>

      <Container fixed>
        <Box>
          {initialValuesLoaded ? (
            renderTabContent()
          ) : (
            <Typography>Loading initial values...</Typography>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default SettingRoleScreen;
