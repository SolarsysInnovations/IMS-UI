import { MenuItem, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import TableHeader from "../../components/layouts/TableHeader";
import { useRolesGetUserMutation } from "../../redux-store/role/roleApi"
import CustomerDetails from "../customer/customerDetails";

const UserProfile = () => {

    const userName=localStorage.getItem("userName");
    // console.log(localStorage.getItem("userid"));
    const [userData, setUserData] = useState<any | null>(null);
    const [rolesGetUser] = useRolesGetUserMutation();
   

    useEffect(() => {
        if (userName) {
            rolesGetUser(userName).then(response => {
                if (response && response.data) {
                    setUserData(response[`data`]);
                    // console.log("response", response);
                }                
            })
        } 
    }, [userName, rolesGetUser]);
    

    return (
        <>
            <TableHeader headerName="User Details" />
            <MenuItem>
                <Typography variant="body2" >
                    <strong>Username:</strong> {userData?.username || ''}
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    <strong>UserRole:</strong> {userData?.userRole || ''}
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    <strong>Email:</strong> {userData?.userEmail || ''}
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    <strong>UserMobile:</strong> {userData?.userMobile || ''}
                </Typography>
            </MenuItem>
        </>
    );
    
}

export default UserProfile;