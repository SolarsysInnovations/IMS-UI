import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import ToastUi from "../../components/ui/ToastifyUi";
import TableHeader from "../../components/layouts/TableHeader";
import usePathname from "../../hooks/usePathname";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { DynamicFormCreate } from "../../components/Form-renderer/Dynamic-form";
import { companyFields } from "../../constants/form-data/form-data-json";
import { companyValidationSchema } from "../../constants/forms/validations/validationSchema";
import { companyInitialValues } from "../../constants/forms/formikInitialValues";
import { useSelector } from "react-redux";
import { useAddSettingMutation, useUpdateSettingMutation } from '../../redux-store/settings/settingsApi';
import ButtonSmallUi from "../../components/ui/ButtonSmall";
import { Formik, Form } from "formik";
import { companyInitialValueProps } from "../../types/types";
import { Add } from '@mui/icons-material'
import { useGetSettingQuery } from "../../redux-store/settings/settingsApi";
import Stack from '@mui/material/Stack';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from '@mui/material';
import ModalUi from '../../components/ui/ModalUi'
import AddLink from './link'
import { Card, CardContent, Button } from '@mui/material';
import { List, ListItem, ListItemText, TextField } from '@mui/material';
import PreviewScreen from "./previewscreen";

const SettingScreen = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const navigate = useNavigate();
  const pathname = usePathname();
  const [updateSetting,] = useUpdateSettingMutation();
  const [addSetting, { isLoading, isSuccess, isError, error }] = useAddSettingMutation();
  // const companyStateDetails = useSelector((state: any) => state.companyState.data);
  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = useState<any>();
  const { refetch } = useGetSettingQuery();
  const [links, setLinks] = useState<string[]>([]); // Provide explicit type string[] for links
  const [newLink, setNewLink] = useState('');
  const handleAddLink = () => {
    if (newLink.trim() !== '') {
      setLinks([...links, newLink]);
      setNewLink('');
    }
  }
const onSubmit = async (values: any, actions: any) => {
   try {
       const id: number = values?._id
       await addSetting({
           id: id,
           settings: values,
       });
       actions.resetForm();
       // setserviceDetails();
 } catch (error) {
       console.log(error);
   }
};
const handleModalClose = () => {
  refetch()
  setOpenModal(false);
}
const buttons = [
  { label: 'Add Link', icon: Add, onClick: () => setOpenModal(true) },
];
const button = [
  { label: 'Edit', icon: Add, onClick: () => setOpenModal(true) },
];
  const updateFormValue = (setFieldValue: Function) => {
    
};
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

  const linkCreation = [
    {
      "url": "https://contents.tdscpc.gov.in/",
      "icon": <LanguageIcon style={{ color: 'blue' }}/>,
      "label": "TRACES",
      "description": ""
    },
    {
      "url": "https://tin.tin.nsdl.com/oltas/servlet/QueryTaxpayer",
      "icon": <LanguageIcon style={{ color: 'blue' }} />,
      "label": "OLTAS Challan",
      "description": ""
    },
  ]

  const StyledLink = styled('a')(({ theme }) => ({
    marginLeft: '8px',
    color: 'inherit', // Use your preferred initial color
    textDecoration: 'none',
    '&:hover': {
      color: 'blue', // Change this to your preferred hover color
      textDecoration: 'underline',
    },
  }));
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
              <Box sx={{ml:"-40px"}}>
                {/* <Typography mt={2} variant="body1">
                <Stack direction="row" spacing={1} alignItems="center"> */}
        {/* <Typography variant="body2">Multi Branch</Typography> */}
        {/* <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} /> */}
      {/* </Stack> */}
      <TableHeader headerName={"Company Information"} buttons={button}/>
      <PreviewScreen/> 
      <ModalUi open={openModal} onClose={handleModalClose}>
      <DynamicFormCreate
                  showTable={true}
                  headerName="Update your Company Information"
                    setData={setData}
                    updateFormValue={updateFormValue}
                    fields={companyFields}
                    initialValues={companyInitialValues || []}
                    validationSchema={companyValidationSchema}
                    onSubmit={onSubmit}
                    buttons={[
                      { label: 'Save', onClick: onSubmit }
                   ]}
                  />
                  </ModalUi>
                {/* </Typography> */}
                
             </Box>
            </Container>
          )}

          {/* TAB 2 Contents */}
          {currentTabIndex === 1 && (
             <Container fixed>
             <Box sx={{ml:"-40px"}}>
             <TableHeader headerName={"Links"} buttons={buttons}/>
                        <ModalUi open={openModal} onClose={handleModalClose}>
                <Box sx={{ marginTop: "5px", justifyContent:"center" }}>
                    <AddLink />
                </Box>
            </ModalUi>
               <Typography mt={2} sx={{display:"flex",width:"1020px",flexWrap:"wrap"}} variant="body1" >
                {linkCreation && linkCreation.map((link, index) => (
                    <Card elevation={7} sx={{display:"flex",width:"180px", margin: "10px"}} key={index}>
                    <CardContent>
                      <Typography variant="caption" sx={{display:"flex",width:"300px"}}>
                      <Box sx={{alignItems:"center",display:"flex"}}>    {link.icon}<a href={link.url}>{link.label}<StyledLink/></a></Box>
                      </Typography>
                    </CardContent>
                    </Card>
                  ))}
                {/* <Card elevation={7} sx={{display:"flex",width:"180px"}}>
      <CardContent>
        <Typography variant="caption" sx={{display:"flex",width:"300px"}}>
        <Box sx={{alignItems:"center",display:"flex"}}>    <LanguageIcon /><Link href="https://contents.tdscpc.gov.in/">TRACES</Link></Box>
        </Typography>
      </CardContent>
      </Card>
      <Card elevation={7} sx={{display:"flex",width:"180px"}}>
        <CardContent>
        <Typography variant="caption" sx={{display:"flex",width:"300px"}}>
      <Box sx={{alignItems:"center",display:"flex", }}> <LanguageIcon/><Link href="https://tin.tin.nsdl.com/oltas/index">OLTAS Challan</Link></Box>
</Typography>
</CardContent>
      </Card>   */}
             </Typography>
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
    <TableHeader headerName={"About Us"} />
    <Typography variant="body1">
      SSINTEK :
      <StyledLink 
        href="https://www.solarsystek.com/" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        www.ssintek.in
      </StyledLink>
    </Typography>
  </Box>
)}
        </React.Fragment>
    // </Formik>
  );
};

export default SettingScreen;