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
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useState } from 'react'
import { AccountCircle, Login, Logout, PersonAdd, Search, SearchOffRounded, Settings } from '@mui/icons-material'
import SearchBarUi from '../ui/SearchBar'
import { logOut } from '../../redux-store/auth/authSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux-store/store'
export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {

    setAnchorEl(null)
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
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
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
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
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
    </AppBar>
  )
}
