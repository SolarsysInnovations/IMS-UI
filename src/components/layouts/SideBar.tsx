import React, { useState } from 'react';
import { CSSObject, Theme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { capitalize } from '../../services/utils/capitalization';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Collapse } from '@mui/material';
import Header from './Header';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { sidebarTwo } from '../../constants/data';
import Logo from '../../assets/gradient-abstract-logo_23-2150689648-removebg-preview.png';
import { useInVoiceContext } from '../../invoiceContext/invoiceContext';

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: '#1C2536',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#1C2536',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  backgroundColor: 'primary',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface MainLayoutProps {
  readonly children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const context = useInVoiceContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const userRole = context.userDetails.userRole || 'Guest';
  const [activeItem, setActiveItem] = React.useState<string>('');

  const handleDrawerClose = () => {
    setOpen((prev) => !prev);
    setOpenIndex(null);
  };

  const handleCollapse = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open={open}>
        <Avatar
          sx={{
            transition: '0.2s',
            bgcolor: 'white',
            marginLeft: open ? 3 : 1.5,
            marginTop: 2,
            width: 40,
            height: 40,
            color: 'white',
          }}
          src={Logo}
        />
        <DrawerHeader
          style={{
            backgroundColor: '#1C2536',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {open && (
            <Typography
              variant="h6"
              sx={{ color: 'white', textAlign: 'left', marginLeft: 2 }}
            >
              Invoice
            </Typography>
          )}
          <IconButton onClick={handleDrawerClose}>
            {!open ? (
              <MenuIcon style={{ color: '#fff' }} />
            ) : (
              <ChevronLeftIcon style={{ color: '#fff' }} />
            )}
          </IconButton>
        </DrawerHeader>

        <List disablePadding={true} sx={{ mt: 1 }}>
          <>
            {sidebarTwo?.map((item: any, index: number) => {
              if (
                !item.allowedRoles ||
                (userRole && item.allowedRoles.includes(userRole))
              ) {
                return (
                  <React.Fragment key={item.id}>
                    <ListItemButton
                      sx={{
                        width: '200px',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.067)',
                        },
                        backgroundColor: isActive(item.path)
                          ? 'rgba(255, 255, 255, 0.067) '
                          : '',
                        paddingTop: '2px',
                        paddingBottom: '2px',
                        marginTop: '10px',
                        transition: '0.2s',
                        marginLeft: open ? 2 : 0,
                        borderRadius: '5px',
                        minHeight: 10,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      onClick={() => navigate(item.path)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: '43px',
                        }}
                      >
                        {React.createElement(item.icon, {
                          sx: {
                            width: '22px',
                            color: isActive(item.path)
                              ? 'primary.main'
                              : 'primary.light',
                          },
                        })}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            color="inherit"
                            variant="subtitle1"
                            sx={{
                              color:
                                activeItem === item.path
                                  ? `primary.contrastText`
                                  : `primary.light`,
                              fontSize: 14,
                              fontWeight: 600,
                              marginLeft: '5px',
                            }}
                          >
                            {capitalize(item.title)}
                          </Typography>
                        }
                      />
                      {item.subItems &&
                        item.subItems.some((subItem: any) => subItem.show) &&
                        (openIndex === index ? (
                          <KeyboardArrowDownIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCollapse(index);
                            }}
                            sx={{
                              width: '15px',
                              color: `primary.light`,
                              backgroundColor: `#ffffff14`,
                              borderRadius: '10px',
                              padding: '0 5px',
                            }}
                          />
                        ) : (
                          <KeyboardArrowDownIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCollapse(index);
                            }}
                            sx={{
                              width: '15px',
                              color: `primary.light`,
                              backgroundColor: `#ffffff14`,
                              borderRadius: '10px',
                              padding: '0 5px',
                            }}
                          />
                        ))}
                    </ListItemButton>
                    {item.subItems && (
                      <Collapse
                        in={openIndex === index}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.subItems
                            .filter((subItem: any) => subItem.show !== false)
                            .map((subItem: any, subIndex: number) => (
                              <ListItemButton
                                key={subIndex}
                                sx={{
                                  width: '200px',
                                  '&:hover': {
                                    backgroundColor:
                                      'rgba(255, 255, 255, 0.067)',
                                  },
                                  backgroundColor:
                                    activeItem === subItem.path
                                      ? 'rgba(255, 255, 255, 0.067) '
                                      : '',
                                  paddingTop: '2px',
                                  paddingBottom: '2px',
                                  marginTop: '10px',
                                  transition: '0.2s',
                                  marginLeft: 2,
                                  borderRadius: '5px',
                                  minHeight: 10,
                                  justifyContent: open ? 'initial' : 'center',
                                  px: 2.5,
                                }}
                                onClick={() => navigate(subItem.path)}
                              >
                                <ListItemIcon
                                  sx={{
                                    width: 'fit-content',
                                    minWidth: '20px !important',
                                  }}
                                >
                                  <FiberManualRecordIcon
                                    sx={{
                                      width: '10px',
                                      color:
                                        activeItem === subItem.path
                                          ? `primary.main`
                                          : `primary.light`,
                                    }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    <Typography
                                      color="inherit"
                                      variant="subtitle1"
                                      sx={{
                                        color:
                                          activeItem === subItem.path
                                            ? `primary.contrastText`
                                            : `primary.light`,
                                        fontSize: 14,
                                        fontWeight: 600,
                                      }}
                                    >
                                      {capitalize(subItem.title)}
                                    </Typography>
                                  }
                                />
                              </ListItemButton>
                            ))}
                        </List>
                      </Collapse>
                    )}
                  </React.Fragment>
                );
              }
            })}
          </>
        </List>
        {/*  <Divider /> */}
        <Divider />
      </Drawer>
      <Box component="main" sx={{ width: '500px', flexGrow: 1 }}>
        <Header />
        <Box sx={{ px: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
