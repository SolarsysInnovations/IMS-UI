import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Box,
  Avatar,
  ListItemIcon,
  Divider,
  Tooltip
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useState } from 'react'
import { AccountCircle, Login, Logout, PersonAdd, Search, SearchOffRounded, Settings } from '@mui/icons-material'
import SearchBarUi from '../ui/SearchBar'
import { logOut } from '../../redux-store/auth/authSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux-store/store'
import DialogBoxUi from "../ui/DialogBox";
import UserProfile from '../../pages/profile/UserProfile'
import ChangePassword from '../../pages/profile/ChangePassword'
import { useNavigate } from 'react-router-dom'
import ToastUi from '../../components/ui/ToastifyUi';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [addMenuAnchorEl, setAddMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [opendialogBox, setIsOpenDialogBox] = useState(false);
  const [popUpComponent, setPopUpComponent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = Boolean(anchorEl)
  const addMenuOpen = Boolean(addMenuAnchorEl);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {

    setAnchorEl(null)
  }

  const handleAddMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuAnchorEl(event.currentTarget);
  }

  const handleAddMenuClose = () => {
    setAddMenuAnchorEl(null);
  }

  const PopupComponents = {
        USER_PROFILE: 'userprofile',
        CHANGE_PASSWORD: 'changepassword',
    }
  return (<>
    <ToastUi autoClose={1000} />
    <AppBar sx={{ width: "100%", boxShadow: 'none', backgroundColor: "#fbfbff !important" }} position='sticky' color='transparent'>
      <Toolbar sx={{
        '& .MuiToolbar-root': {
          minHeight: "20px !important",
        },
        "@media (min-width: 600px)": {
          minHeight: "43px",
          paddingLeft: "15px !important",
          paddingRight: "15px !important",
        },
        justifyContent: 'space-between',
        backgroundColor: "#ffffff",
      }}>
        {/* <Box >
          <Typography variant="h6" color="initial">Hello</Typography>
        </Box> */}
        <Box >
          {/* <SearchBarUi /> */}
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title="Add item">
              <IconButton
                onClick={handleAddMenuClick}
                size="small"
                aria-controls={addMenuOpen ? 'add-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={addMenuOpen ? 'true' : undefined}
              >
                <AddIcon sx={{ color: `grey.500` }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <ListItemIcon sx={{
                    minWidth: "25px",
                    color:"#6C737F"
                  }} onClick={()=>{navigate("/settings")}}>
                <Settings fontSize="small"  />
              </ListItemIcon>
            </Tooltip>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                // sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <PersonIcon sx={{ color: `grey.500` }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {

                borderRadius: '13px',
                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => {
              setPopUpComponent(PopupComponents.USER_PROFILE);
              setIsOpenDialogBox(true)
            }} sx={{fontSize:"14px"}} >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              User Profile
            </MenuItem>
            <MenuItem onClick={() => {
              setPopUpComponent(PopupComponents.CHANGE_PASSWORD);
              setIsOpenDialogBox(true)
            }} sx={{fontSize:"14px"}} >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              Change Password
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} sx={{fontSize:"14px"}}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={()=>{navigate("/settings")}} sx={{fontSize:"14px"}}>
              <ListItemIcon >
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={() => dispatch(logOut())} sx={{fontSize:"14px"}}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          <Menu
              anchorEl={addMenuAnchorEl}
              id="add-menu"
              open={addMenuOpen}
              onClose={handleAddMenuClose}
              onClick={handleAddMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  borderRadius: '13px',
                  filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            > 
              <Box display='flex' justifyContent= 'space-between'>
                <Box display= 'flex' flexDirection= 'column' pr={2}>
                  <MenuItem onClick={handleClose} sx={{fontSize:"14px"}}>
                    <GroupIcon sx={{ color: `grey.500`,marginRight:"10px" }} fontSize="small" />
                    CUSTOMERS
                  </MenuItem>
                  <MenuItem onClick={() => navigate("roles/list")} sx={{fontSize:"14px"}}>
                    <AddIcon sx={{ color: `grey.500`}} fontSize="small" />
                    Add User
                  </MenuItem>
                  <MenuItem onClick={() => navigate("customer/create")} sx={{fontSize:"14px"}}>
                    <AddIcon sx={{ color: `grey.500`}} fontSize="small" />
                    Add Customer
                  </MenuItem>
                </Box>
                <Box display= 'flex' flexDirection='column' pr={2}>
                  <MenuItem onClick={handleClose} sx={{fontSize:"14px"}}>
                    <ShoppingCartIcon sx={{ color: `grey.500`,marginRight:"10px" }} fontSize="small" />
                    PURCHASES
                  </MenuItem>
                  <MenuItem onClick={() => navigate("invoice/create")} sx={{fontSize:"14px"}}>
                    <AddIcon sx={{ color: `grey.500`}} fontSize="small" />
                    Add Invoice
                  </MenuItem>
                  <MenuItem onClick={() => navigate("reports")} sx={{fontSize:"14px"}}>
                    <AddIcon sx={{ color: `grey.500`}} fontSize="small" />
                    Add Report
                  </MenuItem>
                </Box>
              </Box>
            </Menu>
        </Box>
      </Toolbar>
        <DialogBoxUi
          open={opendialogBox}
          maxwidth={{
              "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                  width: "60%",
                  maxWidth: "350px",
                  },
              },
          }}
           // Set open to true to display the dialog initially
          // title="Custom Dialog Title"
          content={
              <>
                {
                  popUpComponent === PopupComponents.USER_PROFILE ? <UserProfile />  :
                  popUpComponent === PopupComponents.CHANGE_PASSWORD ? <ChangePassword onClose={function (): void {
                    setIsOpenDialogBox(false)
                    setPopUpComponent("")
                  }} />  : null
                }
              </>
          }
          handleClose={() => {
            setIsOpenDialogBox(false)
            setPopUpComponent("")
          }}
        />
    </AppBar>
   </>        
  )
}
