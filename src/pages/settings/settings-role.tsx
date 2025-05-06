import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import About from "../about/About";
import SettingsCompanyDetailsScreen from "./settings-company/SettingsCompanyDetailsScreen";

const SettingRoleScreen = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [initialValuesLoaded, setInitialValuesLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadInitialValues();
  }, []);

  const loadInitialValues = () => {
    setInitialValuesLoaded(true);
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
