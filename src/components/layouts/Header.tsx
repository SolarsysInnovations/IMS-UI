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
  return (
  <>
    <ToastUi autoClose={1000} />
    <AppBar sx={{ width: "100%", boxShadow: 'none' }} position='sticky' color='transparent'>
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
                sx={{
                  position: "relative",
                  right:"10px",
                  backgroundColor: 'grey',
                  border: '1px solid grey',
                  width: '20px',
                  height: '20px',
                  fontSize:"12px",
                  '&:hover': {
                    backgroundColor: 'grey',
                  },
                }}
              >
                <AddIcon sx={{ color: `white` }} />
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
                <AccountCircle sx={{ color: `grey.500` }} />
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
            }}>
              <Avatar /> User Profile
            </MenuItem>
            <MenuItem onClick={() => {
              setPopUpComponent(PopupComponents.CHANGE_PASSWORD);
              setIsOpenDialogBox(true)
            }}>
              <Avatar /> Change Password
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={()=>{navigate("/settings")}}>
              <ListItemIcon >
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={() => dispatch(logOut())}>
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
                  <MenuItem onClick={handleClose}>
                    <GroupIcon sx={{ color: `grey.500`,marginRight:"10px" }} />
                    CUSTOMERS
                  </MenuItem>
                  <MenuItem onClick={() => navigate("roles/list")}>
                    <AddIcon sx={{ color: `grey.500`,fontSize:"20px"}} />
                    Add User
                  </MenuItem>
                  <MenuItem onClick={() => navigate("customer/create")}>
                    <AddIcon sx={{ color: `grey.500`,fontSize:"20px"}} />
                    Add Customer
                  </MenuItem>
                </Box>
                <Box display= 'flex' flexDirection='column' pr={2}>
                  <MenuItem onClick={handleClose}>
                    <ShoppingCartIcon sx={{ color: `grey.500`,marginRight:"10px" }} />
                    PURCHASES
                  </MenuItem>
                  <MenuItem onClick={() => navigate("invoice/create")}>
                    <AddIcon sx={{ color: `grey.500`,fontSize:"20px"}} />
                    Add Invoice
                  </MenuItem>
                  <MenuItem onClick={() => navigate("reports")}>
                    <AddIcon sx={{ color: `grey.500`,fontSize:"20px"}} />
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
