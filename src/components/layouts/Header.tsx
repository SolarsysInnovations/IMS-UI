import { AppBar, Toolbar, IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, Typography, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { AccountCircle, Logout, PersonAdd, Settings, Person, Lock } from "@mui/icons-material";
import { logOut, selectUserName, selectUserRole } from "../../redux-store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux-store/store";
import DialogBoxUi from "../ui/DialogBox";
import UserProfile from "../../pages/profile/UserProfile";
import ChangePassword from "../../pages/profile/ChangePassword";
import { useNavigate, useLocation } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { capitalize } from "../../services/utils/capitalization";
import { Roles } from "../../constants/Enums";

const PopupComponents = { USER_PROFILE: "userprofile", CHANGE_PASSWORD: "changepassword" };
const menuItems = [
  { icon: <Person sx={{ color: "grey.500", marginRight: "10px", ":hover": { color: "primary.main" } }} />, text: "User Profile", component: PopupComponents.USER_PROFILE },
  { icon: <Lock sx={{ color: "grey.500", marginRight: "10px", ":hover": { color: "primary.main" } }} />, text: "Change Password", component: PopupComponents.CHANGE_PASSWORD },
 // { icon: <PersonAdd sx={{ color: "grey.500", marginRight: "10px", ":hover": { color: "primary.main" } }} />, text: "Add another account" },
  { icon: <Settings sx={{ color: "grey.500", marginRight: "10px", ":hover": { color: "primary.main" } }} />, text: "Settings", route: "/settings" },
  { icon: <Logout sx={{ color: "grey.500", marginRight: "10px", ":hover": { color: "primary.main" } }} />, text: "Logout", action: "logout" },
];

const exceptEndUser: any = !Roles.STANDARDUSER;

const addMenuItems = [
  {
    title: "PURCHASES",
    items: [
      { icon: <ShoppingCartIcon sx={{ color: "grey.500", marginRight: "10px" }} />, text: "Add Invoice", route: "invoice/create" },
    ],
  },
];

const MenuComponent = ({ anchorEl, open, handleClose, menuItems, onMenuItemClick }: any) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    PaperProps={{ elevation: 0, sx: { borderRadius: "5px", filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.32))", mt: 1.5, "&::before": { content: '""', display: "block", position: "absolute", top: 0, right: 14, width: 10, height: 10, bgcolor: "background.paper", transform: "translateY(-50%) rotate(45deg)", zIndex: 0 } } }}
    transformOrigin={{ horizontal: "right", vertical: "top" }}
    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
  >
    {menuItems.map((item: any, index: any) => (
      <MenuItem
        key={index}
        onClick={() => onMenuItemClick(item)}
        sx={{ ":hover": { color: "primary.dark" }, fontSize: "13px" }}
      >
        <ListItemIcon sx={{ "& .css-c7koz-MuiSvgIcon-root": { width: "20px" }, ":hover": { color: "primary.dark" } }}>{item.icon}</ListItemIcon>
        {item.text}
      </MenuItem>
    ))}
  </Menu>
);

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addMenuAnchorEl, setAddMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [opendialogBox, setIsOpenDialogBox] = useState(false);
  const [popUpComponent, setPopUpComponent] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const userName = useSelector(selectUserName);
  const userRole = useSelector(selectUserRole);

  const handleMenuOpen = (setAnchor: any) => (event: any) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = (setAnchor: any) => () => {
    setAnchor(null);
  };

  const handleMenuItemClick = (item: any) => {
    if (item.component) {
      setPopUpComponent(item.component);
      setIsOpenDialogBox(true);
    } else if (item.route) {
      navigate(item.route);
    } else if (item.action === "logout") {
      window.location.reload();
      dispatch(logOut());
    }
    setAnchorEl(null);
    setAddMenuAnchorEl(null);
  };

  return (
    <>
      <AppBar
        sx={{ width: "100%", boxShadow: "none", backgroundColor: "#fbfbff !important" }}
        position='sticky'
        color='transparent'
      >
        <Toolbar
          sx={{
            "@media (min-width: 600px)": {
              minHeight: "43px",
              paddingLeft: "15px !important",
              paddingRight: "15px !important",
            },
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            {location.pathname === "/dashboard" && (
              <Grid item xs={6} display="flex" alignItems="center" sx={{ fontWeight: 500 }}>
                Hello {userRole}!
              </Grid>
            )}
          </Grid>
          <Grid item xs={6} display="flex">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <Tooltip title='Add item'>
                <IconButton
                  sx={{ width: "30px" }}
                  onClick={handleMenuOpen(setAddMenuAnchorEl)}
                  size='small'
                >
                  <AddIcon
                    sx={{
                      ":hover": {
                        color: "primary.main",
                      },
                      color: "grey.500",
                      width: "20px",
                    }}
                  />
                </IconButton>
              </Tooltip> */}
              <Tooltip title='Account settings'>
                <IconButton
                  sx={{ width: "30px" }}
                  onClick={handleMenuOpen(setAnchorEl)}
                  size='small'
                >
                  <Person
                    sx={{
                      ":hover": {
                        color: "primary.main",
                      },
                      color: "grey.500",
                      width: "20px",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Typography
                variant='caption'
                color='initial'
              >
                {capitalize(userName)}
              </Typography>
            </Box>
          </Grid>
        </Toolbar>
        <MenuComponent
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          handleClose={handleMenuClose(setAnchorEl)}
          menuItems={menuItems}
          onMenuItemClick={handleMenuItemClick}
        />
        <MenuComponent
          anchorEl={addMenuAnchorEl}
          open={Boolean(addMenuAnchorEl)}
          handleClose={handleMenuClose(setAddMenuAnchorEl)}
          menuItems={addMenuItems.flatMap((group) => group.items)}
          onMenuItemClick={handleMenuItemClick}
        />
        <DialogBoxUi
          open={opendialogBox}
          content={
            popUpComponent === PopupComponents.USER_PROFILE ? (
              <UserProfile />
            ) : popUpComponent === PopupComponents.CHANGE_PASSWORD ? (
              <ChangePassword
                onClose={() => {
                  setIsOpenDialogBox(false);
                  setPopUpComponent("");
                }}
              />
            ) : null
          }
          handleClose={() => {
            setIsOpenDialogBox(false);
            setPopUpComponent("");
          }}
        />
      </AppBar>
    </>
  );
}
