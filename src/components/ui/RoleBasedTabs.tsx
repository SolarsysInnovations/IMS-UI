import React from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";

interface TabItem {
  label: string;
  component: React.ReactNode;
  roles: string[]; // Roles allowed to access this tab
}

interface RoleBasedTabsProps {
  tabs: TabItem[];
  userRole: string | null; // Allow null
}

const RoleBasedTabs: React.FC<RoleBasedTabsProps> = ({ tabs, userRole }) => {
  if (!userRole) {
    return <Typography>No role detected. Access denied.</Typography>; 
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentTabIndex, setCurrentTabIndex] = React.useState<number>(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  const filteredTabs = tabs.filter((tab) => tab.roles.includes(userRole));

  if (filteredTabs.length === 0) {
    return <Typography>No accessible tabs for your role.</Typography>;
  }

  return (
    <>
      <Tabs value={currentTabIndex} variant="fullWidth" onChange={handleTabChange}>
        {filteredTabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box>{filteredTabs[currentTabIndex]?.component}</Box>
    </>
  );
};

export default RoleBasedTabs;
