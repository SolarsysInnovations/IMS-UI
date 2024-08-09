import { MenuItem, Table, TableBody, TableCell, TableRow,Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import TableHeader from "../../components/layouts/TableHeader";
import { useRolesGetUserMutation } from "../../redux-store/role/roleApi"
import CustomerDetails from "../customer/customerDetails";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import { EmailRounded } from "@mui/icons-material";
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
 <Typography
    style={{ color: "#6366F1", marginBottom: "8px" }}
    variant="h6"
    component="h2"
  >
    User Details
  </Typography>            <MenuItem>
                
                <PersonIcon style={{
              color: "white",
              marginTop: "15px",
              backgroundColor: "#6366F1",
              padding: "5px",
              height: "15%",
              borderRadius: "25px",
            }}/> <Typography style={{marginTop:"15px", marginLeft:"10px"}} variant="body1" >  <strong>UserName :</strong><span style={{ margin: '13px'}}> {userName || ''}</span>
        </Typography>
            </MenuItem>
            <MenuItem>
       
                 <KeyIcon style={{
              color: "white",
              marginTop: "15px",
              backgroundColor: "#6366F1",
              padding: "5px",
              height: "15%",
              borderRadius: "25px",
            }}/>   <Typography  style={{marginTop:"15px", marginLeft:"10px"}} variant="body1" > <strong>UserRole :</strong><span style={{ marginLeft: '18px',marginBottom:"18px" }}> {userRole || ''}</span>
        </Typography>
            </MenuItem>
            <MenuItem>
      
                   <EmailRounded style={{
              color: "white",
              marginTop: "15px",
              backgroundColor: "#6366F1",
              padding: "5px",
              height: "15%",
              borderRadius: "25px",
            }}/>   <Typography  style={{marginTop:"15px", marginLeft:"10px"}} variant="body1" ><strong>Email :</strong><span style={{ marginLeft: '37px' }}> {userEmail || ''}</span>
        </Typography>
            </MenuItem>
            <MenuItem>
       
            <LocalPhoneIcon  style={{
              color: "white",
              marginTop: "15px",
              backgroundColor: "#6366F1",
              padding: "5px",
              height: "15%",
              borderRadius: "25px",
            }}/>
                    <Typography  style={{marginTop:"15px", marginLeft:"10px"}} variant="body1" > <strong>UserMobile :</strong> <span style={{ marginLeft: '37px' }}>{userMobile || 'NA'}</span>
        </Typography>
            </MenuItem>
            <MenuItem>
        <Typography variant="body1">

                    <strong>Description :</strong> <span style={{ marginLeft: '37px' }}>{userDescription || 'NA'}</span>
        </Typography>
            </MenuItem>
         </>
    );
    
}

export default UserProfile;