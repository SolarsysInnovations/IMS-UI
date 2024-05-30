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
            {/* <MenuItem sx={{ marginTop: "15px" }}>
                <CustomerDetails details={userData || []} />
            </MenuItem> */}
            {/* <Table>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{fontWeight:"600"}}>Username:</TableCell>
                        <TableCell>{userData?.username || ''}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontWeight:"600"}}>UserRole:</TableCell>
                        <TableCell>{userData?.userRole || ''}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontWeight:"600"}}>Email:</TableCell>
                        <TableCell>{userData?.userEmail || ''}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{fontWeight:"600"}}>UserMobile:</TableCell>
                        <TableCell>{userData?.userMobile || ''}</TableCell>
                    </TableRow>
                </TableBody>
            </Table> */}
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
            {/* <MenuItem>
                <Typography variant="body2">
                    Date: 
                </Typography>
            </MenuItem> */}
        </>
    );
    
}

export default UserProfile;