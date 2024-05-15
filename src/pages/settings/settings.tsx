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


const Settingscreen = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const navigate = useNavigate();
  const pathname = usePathname();
  const [updateSetting,] = useUpdateSettingMutation();
  const [addSetting, { isLoading, isSuccess, isError, error }] = useAddSettingMutation();
  const invoiceStateDetails = useSelector(
    (state: any) => state.customerState.data
  );
  const [settingValues, setSettingValues] = useState(invoiceStateDetails);
  const [updateData] = useUpdateSettingMutation();
  //   const companyStateDetails = useSelector((state: any) => state.companyState.data);
  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = useState<any>();


  const buttons = [
      { label: 'Edit', icon: Add, onClick: () => setOpenModal(true) },
      { label: 'Save', icon: Add, onClick: () => setOpenModal(true) },

  ];
  const updateFormValue = (setFieldValue: Function) => {
    // if (data?.customerName === "arun") {
    //     setFieldValue("companyName", "arun");
    // }
};
const onSubmit = async (values: any, actions: any) => {
  try {
      const id: number = values?._id
      await updateData({
          id: id,
          settings: values,
      });
      actions.resetForm();
      // setserviceDetails();
  } catch (error) {
      console.log(error);
  }
};



  const handleTabChange = (e: any, tabIndex: any) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };
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
              <TableHeader headerName={"Update Your Company Information"} buttons={buttons} />
                <Typography mt={2} variant="body1">
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
            <Box sx={{ p: 3 }}>
              <Typography variant="h5">Portals</Typography>
              <Typography></Typography>
            </Box>
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
