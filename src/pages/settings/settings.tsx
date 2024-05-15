import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import ToastUi from '../../components/ui/ToastifyUi'
import TableHeader from '../../components/layouts/TableHeader'
import usePathname from '../../hooks/usePathname'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container';
import { DynamicFormCreate } from '../../components/Form-renderer/Dynamic-form';
import { companyFields} from '../../constants/form-data/form-data-json';
import { companyValidationSchema } from '../../constants/forms/validations/validationSchema';
import { companyInitialValues } from '../../constants/forms/formikInitialValues';
import { useSelector } from 'react-redux';
import { useAddSettingMutation,useGetSettingByIdMutation, useUpdateSettingMutation } from '../../redux-store/settings/settingsApi';
import ButtonSmallUi from "../../components/ui/ButtonSmall";


const Settingscreen =()=> {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const navigate = useNavigate();
  const pathname = usePathname();
  const [updateData, { isLoading, isSuccess, isError, error }] = useUpdateSettingMutation();
//   const companyStateDetails = useSelector((state: any) => state.companyState.data);

  const onSubmit = async (values: any, actions: any) => {
    try {
        const id: number = values?._id
        console.log(id);
        console.log(values);
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

  const handleTabChange = (e:any, tabIndex:any) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };
 
  return (
    <React.Fragment>
    <ToastUi autoClose={1000} />
    <TableHeader headerName={pathname} />
      <Tabs value={currentTabIndex} variant='fullWidth' onChange={handleTabChange}>
        <Tab label='Company Settings' />
        <Tab label='Portals' />
        <Tab label='Tax' />
        <Tab label='About' />
      </Tabs>
 
      {/* TAB 1 Contents */}
      {currentTabIndex === 0 && (
           <Container fixed>
        <Box sx={{ p: 3 }}>
          <Typography variant='h6'>Update your Company information </Typography>
          <Typography mt={2} variant='body1' >
          <DynamicFormCreate
                fields={companyFields}
                initialValues={companyInitialValues || []}
                validationSchema={companyValidationSchema}
                onSubmit={onSubmit}
            />
            <Box sx={{
            display: "flex",
            width:"180px",
            justifyContent: "space-around",
            marginLeft:"-10px",
        }}>
            <ButtonSmallUi variant="contained" label="Edit"/>
            <ButtonSmallUi variant="contained" label="Save"/>
            </Box>
          </Typography>
        </Box>
        </Container>
      )}
 
      {/* TAB 2 Contents */}
      {currentTabIndex === 1 && (
        <Box sx={{ p: 3 }}>
          <Typography variant='h5'>Portals</Typography>
          <Typography >
         </Typography>
        </Box>
      )}
 
      {/* TAB 3 Contents */}
      {currentTabIndex === 2 && (
        <Box sx={{ p: 3 }}>
          <Typography variant='h5'>Tax</Typography>
          <Typography >
         </Typography>
        </Box>
      )}
 
      {/* TAB 4 Contents */}
      {currentTabIndex === 3 && (
        <Box sx={{ p: 3 }}>
          <Typography variant='h5'>About</Typography>
          <Typography >
       </Typography>
        </Box>
      )}
    </React.Fragment>
  );
}
 
export default Settingscreen;