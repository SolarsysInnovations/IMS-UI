import { useState } from 'react';
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Lock, Logout, Person, Settings } from '@mui/icons-material';
import { logOut } from '../../api/services';
import DialogBoxUi from '../ui/DialogBox';
import UserProfile from '../../pages/profile/UserProfile';
import ChangePassword from '../../pages/profile/ChangePassword';
import { useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { capitalize } from '../../utils/capitalization';
import { useInVoiceContext } from '../../context/invoiceContext';

const PopupComponents = {
  USER_PROFILE: 'userprofile',
  CHANGE_PASSWORD: 'changepassword',
};
const menuItems = [
  {
    icon: (
      <Person
        sx={{
          color: 'grey.500',
          marginRight: '10px',
          ':hover': { color: 'primary.main' },
        }}
      />
    ),
    text: 'User Profile',
    component: PopupComponents.USER_PROFILE,
  },
  {
    icon: (
      <Lock
        sx={{
          color: 'grey.500',
          marginRight: '10px',
          ':hover': { color: 'primary.main' },
        }}
      />
    ),
    text: 'Change Password',
    component: PopupComponents.CHANGE_PASSWORD,
  },
  {
    icon: (
      <Settings
        sx={{
          color: 'grey.500',
          marginRight: '10px',
          ':hover': { color: 'primary.main' },
        }}
      />
    ),
    text: 'Settings',
    route: '/settings',
  },
  {
    icon: (
      <Logout
        sx={{
          color: 'grey.500',
          marginRight: '10px',
          ':hover': { color: 'primary.main' },
        }}
      />
    ),
    text: 'Logout',
    action: 'logout',
  },
];

const addMenuItems = [
  {
    title: 'PURCHASES',
    items: [
      {
        icon: (
          <ShoppingCartIcon sx={{ color: 'grey.500', marginRight: '10px' }} />
        ),
        text: 'Add Invoice',
        route: 'invoice/create',
      },
    ],
  },
];

const MenuComponent = ({
  anchorEl,
  open,
  handleClose,
  menuItems,
  onMenuItemClick,
}: any) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    PaperProps={{
      elevation: 0,
      sx: {
        borderRadius: '5px',
        filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.32))',
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
    {menuItems.map((item: any, index: any) => (
      <MenuItem
        key={`${item.text}-${index}`}
        onClick={() => onMenuItemClick(item)}
        sx={{ ':hover': { color: 'primary.dark' }, fontSize: '13px' }}
      >
        <ListItemIcon
          sx={{
            '& .css-c7koz-MuiSvgIcon-root': { width: '20px' },
            ':hover': { color: 'primary.dark' },
          }}
        >
          {item.icon}
        </ListItemIcon>
        {item.text}
      </MenuItem>
    ))}
  </Menu>
);

export default function Header() {
  const context = useInVoiceContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [addMenuAnchorEl, setAddMenuAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [popUpComponent, setPopUpComponent] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const userName = context.userDetails.userName || 'Guest';
  const userRole = context.userDetails.userRole || 'Guest';

  const handleMenuOpen = (setAnchor: any) => (event: any) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = (setAnchor: any) => () => {
    setAnchor(null);
  };

  const handleMenuItemClick = (item: any) => {
    if (item.component) {
      setPopUpComponent(item.component);
      setOpenDialogBox(true);
    } else if (item.route) {
      navigate(item.route);
    } else if (item.action === 'logout') {
      window.location.reload();
      logOut();
    }
    setAnchorEl(null);
    setAddMenuAnchorEl(null);
  };

  function handlePopupMenuOpen(popUpComponent: string) {
    if (popUpComponent === PopupComponents.USER_PROFILE) {
      return <UserProfile />;
    } else if (popUpComponent === PopupComponents.CHANGE_PASSWORD) {
      return (
        <ChangePassword
          onClose={() => {
            setOpenDialogBox(false);
            setPopUpComponent('');
          }}
        />
      );
    }
    return null;
  }

  return (
    <AppBar
      sx={{
        width: '100%',
        boxShadow: 'none',
        backgroundColor: '#fbfbff !important',
      }}
      position="sticky"
      color="transparent"
    >
      <Toolbar
        sx={{
          '@media (min-width: 600px)': {
            minHeight: '43px',
            paddingLeft: '15px !important',
            paddingRight: '15px !important',
          },
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          {location.pathname === '/dashboard' && userRole && (
            <Grid
              item
              xs={6}
              display="flex"
              alignItems="center"
              sx={{
                fontWeight: 500,
                fontSize: '1.25rem',
              }}
            >
              Hello,{' '}
              <Box
                component="span"
                sx={{
                  fontWeight: 'bold',
                  color: 'primary.main',
                  marginLeft: 1,
                }}
              >
                {capitalize(userName)}
              </Box>
            </Grid>
          )}
        </Grid>

        <Grid item xs={6} display="flex">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                sx={{ width: '30px' }}
                onClick={handleMenuOpen(setAnchorEl)}
                size="small"
              >
                <Person
                  sx={{
                    ':hover': {
                      color: 'primary.main',
                    },
                    color: 'grey.500',
                    width: '20px',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Typography variant="caption" color="initial">
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
        open={openDialogBox}
        content={handlePopupMenuOpen(popUpComponent)}
        handleClose={() => {
          setOpenDialogBox(false);
          setPopUpComponent('');
        }}
      />
    </AppBar>
  );
}
