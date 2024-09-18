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

  const loadInitialValues = () => {
    // Your logic to load initial values goes here
    // Example:
    // fetchData().then((data) => {
    //   // Set initial values based on the fetched data
    //   setInitialValuesLoaded(true);
    // });
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
