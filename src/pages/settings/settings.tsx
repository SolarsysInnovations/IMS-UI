import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import ToastUi from "../../components/ui/ToastifyUi";
import Container from "@mui/material/Container";
import CompanyDetailsScreen from "../company/Company-details-screen";
import AddLink from "../links/Link";
import About from "../about/About";

const SettingScreen = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e: any, tabIndex: any) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  // const AntSwitch = styled(Switch)(({ theme }) => ({
  //   width: 28,
  //   height: 16,
  //   padding: 0,
  //   display: 'flex',
  //   '&:active': {
  //     '& .MuiSwitch-thumb': {
  //       width: 15,
  //     },
  //     '& .MuiSwitch-switchBase.Mui-checked': {
  //       transform: 'translateX(9px)',
  //     },
  //   },
  //   '& .MuiSwitch-switchBase': {
  //     padding: 2,
  //     '&.Mui-checked': {
  //       transform: 'translateX(12px)',
  //       color: '#fff',
  //       '& + .MuiSwitch-track': {
  //         opacity: 1,
  //         backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
  //       },
  //     },
  //   },
  //   '& .MuiSwitch-thumb': {
  //     boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
  //     width: 12,
  //     height: 12,
  //     borderRadius: 6,
  //     transition: theme.transitions.create(['width'], {
  //       duration: 200,
  //     }),
  //   },
  //   '& .MuiSwitch-track': {
  //     borderRadius: 16 / 2,
  //     opacity: 1,
  //     backgroundColor:
  //       theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
  //     boxSizing: 'border-box',
  //   },
  // }));

  return (
    <React.Fragment>
      <ToastUi autoClose={1000} />
      <Tabs
        value={currentTabIndex}
        variant="fullWidth"
        onChange={handleTabChange}
      >
        <Tab label="Company Settings" />
        <Tab label="Portals" />
        <Tab label="Tax" />
        <Tab label="About" />
      </Tabs>

      {/* TAB 1 Contents */}
      {currentTabIndex === 0 && (
        <Container fixed>
          <Box>
            {/* <Typography mt={2} variant="body1">
                <Stack direction="row" spacing={1} alignItems="center"> */}
            {/* <Typography variant="body2">Multi Branch</Typography> */}
            {/* <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} /> */}
            {/* </Stack> */}
            <CompanyDetailsScreen />
            {/* </Typography> */}
          </Box>
        </Container>
      )}
      {/* TAB 2 Contents */} 
      {currentTabIndex === 1 && (
        <Container fixed>
          <Box>
            <AddLink />
          </Box>
        </Container>
      )}

      {/* TAB 3 Contents */}
      {currentTabIndex === 2 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5">Tax</Typography>
          <Typography></Typography>
        </Box>
      )}

      {/* TAB 4 Contents */}
      {currentTabIndex === 3 && (
        <Box sx={{ p: 3 }}>
        <About />
        </Box>
      )}
    </React.Fragment>
  );
};

export default SettingScreen;
