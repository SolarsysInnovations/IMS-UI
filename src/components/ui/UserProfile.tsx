import { MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import TableHeader from "../layouts/TableHeader";
import { useRolesGetUserMutation } from "../../redux-store/role/roleApi"

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
                    Username: {userData?.username || ''}
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    UserRole: {userData?.userRole || ''}
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    Email: {userData?.userEmail || ''}
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="body2">
                    UserMobile: {userData?.userMobile || ''}
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