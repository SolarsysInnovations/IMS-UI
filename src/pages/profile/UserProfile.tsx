import { MenuItem, Table, TableBody, TableCell, TableRow,Box, Card,
     CardContent, Grid, Typography, IconButton } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';import React, { useEffect, useState } from "react"
import TableHeader from "../../components/layouts/TableHeader";
import { useRolesGetUserMutation } from "../../redux-store/role/roleApi"
// import CustomerDetails from "../customer/customerDetails";
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import PersonIcon from '@mui/icons-material/Person';
// import KeyIcon from '@mui/icons-material/Key';
// import MailRoundedIcon from '@mui/icons-material/MailRounded';
// import { EmailRounded } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import DescriptionIcon from '@mui/icons-material/Description';
const UserProfile = () => {
    const userMobile = localStorage.getItem("userMobile");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("userRole");
    const userDescription = localStorage.getItem("description");

    const [userData, setUserData] = useState<any | null>(null);
    const [rolesGetUser] = useRolesGetUserMutation();
   

    useEffect(() => {
        if (userEmail) {
            rolesGetUser(userEmail).then(response => {
                if (response && response.data) {
                    setUserData(response[`data`]);
                    // console.log("response", response);
                }                
            })
        } 
    }, [userEmail, rolesGetUser]);
    

    return (
        <>
        <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px' }}>
      <TableHeader
      //  buttons={[{label : "Edit" , onClick : () => {} ,  }]}
       headerName="Personal Details"/>
      <Grid mt={0.5}  container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Name
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {userName?.charAt(0).toUpperCase()}{userName?.slice(1)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
           Role
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {userRole}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Email address
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {userEmail || 'N/A'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Phone
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {userMobile || '7502447897'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
           Description
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {userDescription || 'profile'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
         </>
    );
    
}

export default UserProfile;