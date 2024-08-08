import { MenuItem, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import TableHeader from "../../components/layouts/TableHeader";
import { useRolesGetUserMutation } from "../../redux-store/role/roleApi"
import CustomerDetails from "../customer/customerDetails";

const UserProfile = () => {
    const userMobile = localStorage.getItem("userMobile");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("userRole");
    
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
            <TableHeader headerName="User Details" />
            <MenuItem>
                <Typography variant="body2" >
                    <strong>UserName :</strong><span style={{ marginLeft: '13px' }}> {userName || ''}</span>
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    <strong>UserRole :</strong><span style={{ marginLeft: '18px' }}> {userRole || ''}</span>
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    <strong>Email :</strong><span style={{ marginLeft: '37px' }}> {userEmail || ''}</span>
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    <strong>UserMobile :</strong> <span style={{ marginLeft: '37px' }}>{userMobile || 'NA'}</span>
                </Typography>
            </MenuItem>
        </>
    );
    
}

export default UserProfile;