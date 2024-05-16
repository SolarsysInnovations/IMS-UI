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




const Settingscreen = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const navigate = useNavigate();
  const pathname = usePathname();
  const [updateSetting,] = useUpdateSettingMutation();
  const [addSetting, { isLoading, isSuccess, isError, error }] = useAddSettingMutation();
  // const companyStateDetails = useSelector((state: any) => state.companyState.data);
  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = useState<any>();
  const { refetch } = useGetSettingQuery();

const onSubmit = async (values: any, actions: any) => {
  // try {
  //     const id: number = values?._id
  //     await updateSetting({
  //         id: id,
  //         setting: values,
  //     });
  //     actions.resetForm();
  //     // setserviceDetails();
  // } catch (error) {
  //     console.log(error);
  // }
};
const handleModalClose = () => {
  refetch()
  setOpenModal(false);
}
const buttons = [
  { label: 'Add Link', icon: Add, onClick: () => setOpenModal(true) },
];
const buttons1 = [
  { label: 'Edit', icon: Add, onClick: () => setOpenModal(true) },
  { label: 'Save', icon: Add, onClick: () => setOpenModal(true) },
];
  const updateFormValue = (setFieldValue: Function) => {
    
};
  const handleTabChange = (e: any, tabIndex: any) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
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
              <TableHeader headerName={"Update Your Company Information"} buttons={buttons1} />
                <Typography mt={2} variant="body1">
                <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2">Multi Branch</Typography>
        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
      </Stack>
                  <DynamicFormCreate
                    setData={setData}
                    updateFormValue={updateFormValue}
                    fields={companyFields}
                    initialValues={companyInitialValues || []}
                    validationSchema={companyValidationSchema}
                    onSubmit={onSubmit}
                  />
                </Typography>
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
               <Typography mt={2} variant="body1" sx={{display:"flex",width:"300px",justifyContent:"space-between"}}>
            <Box sx={{alignItems:"center",display:"flex"}}>    <LanguageIcon /><Link href="https://contents.tdscpc.gov.in/">TRACES</Link></Box>
              <Box sx={{alignItems:"center",display:"flex"}}> <LanguageIcon/><Link href="https://tin.tin.nsdl.com/oltas/index">OLTAS Challan</Link></Box>
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
              <Typography variant="h5">About</Typography>
              <Typography></Typography>
            </Box>
          )}
        </React.Fragment>
    // </Formik>
  );
};

export default Settingscreen;
