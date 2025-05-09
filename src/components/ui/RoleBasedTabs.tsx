import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

interface TabItem {
  label: string;
  component: React.ReactNode;
  roles: string[];
}

interface RoleBasedTabsProps {
  tabs: TabItem[];
  userRole: string;
}

const RoleBasedTabs: React.FC<RoleBasedTabsProps> = ({ tabs, userRole }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, tabIndex: number) => {
    setCurrentTabIndex(tabIndex);
  };

  const filteredTabs = tabs.filter((tab) => tab.roles.includes(userRole));

  if (filteredTabs.length === 0) {
    return <Typography>No accessible tabs for your role.</Typography>;
  }

  if (!userRole) {
    return <Typography>No role detected. Access denied.</Typography>;
  }

  return (
    <>
      <Tabs
        value={currentTabIndex}
        variant="fullWidth"
        onChange={handleTabChange}
      >
        {filteredTabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box>{filteredTabs[currentTabIndex]?.component}</Box>
    </>
  );
};

export default RoleBasedTabs;
