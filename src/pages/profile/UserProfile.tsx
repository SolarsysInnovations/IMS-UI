import { MenuItem, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import TableHeader from "../../components/layouts/TableHeader";
import { useRolesGetUserMutation } from "../../redux-store/role/roleApi"
import CustomerDetails from "../customer/customerDetails";

const UserProfile = () => {

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
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
                    <strong>Username :</strong><span style={{ marginLeft: '13px' }}> {userData?.username || ''}</span>
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    <strong>UserRole :</strong><span style={{ marginLeft: '18px' }}> {userData?.userRole || ''}</span>
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    <strong>Email :</strong><span style={{ marginLeft: '37px' }}> {userData?.userEmail || ''}</span>
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    <strong>UserMobile :</strong> {userData?.userMobile || ''}
                </Typography>
            </MenuItem>
        </>
    );
    
}

export default UserProfile;