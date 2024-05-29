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
import UserProfile from '../ui/UserProfile'
import ChangePassword from '../ui/ChangePassword'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [opendialogBox, setIsOpenDialogBox] = useState(false);
  const [popUpComponent, setPopUpComponent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = Boolean(anchorEl)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {

    setAnchorEl(null)
  }

  const PopupComponents = {
        USER_PROFILE: 'userprofile',
        CHANGE_PASSWORD: 'changepassword',
    }
  return (
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
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'add-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
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
        </Box>
      </Toolbar>
        <DialogBoxUi
          open={opendialogBox} // Set open to true to display the dialog initially
          // title="Custom Dialog Title"
          content={
              <>
                  {
                      popUpComponent === PopupComponents.USER_PROFILE ? <UserProfile />  :
                          popUpComponent === PopupComponents.CHANGE_PASSWORD ? <ChangePassword />  : null
                  }
              </>
          }
          handleClose={() => {
            setIsOpenDialogBox(false)
            setPopUpComponent("")
          }}
        />
    </AppBar>
           
  )
}
