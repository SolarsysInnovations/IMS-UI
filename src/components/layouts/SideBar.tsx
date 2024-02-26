import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { sidebarData } from '../../constants/sidebar-data';
import { capitalize } from '../../services/utils/capitalization';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Header from './Header';
const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: "#1C2536",
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
  backgroundColor: "#1C2536",
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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    backgroundColor: "primary",
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [activeItem, setActiveItem] = React.useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(prev => !prev)
  };

  const handleItemClick = (path: any) => {
    navigate(path)
    setActiveItem(path);
  };

  React.useEffect(() => {
    setActiveItem(location.pathname)
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open={open}>
        <Avatar
          sx={{
            transition: "0.2s",
            marginLeft: open ? 3 : 1.5,
            marginTop: 2,
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            color: "white",
          }}
          src="https://img.freepik.com/free-psd/gradient-abstract-logo_23-2150689648.jpg?size=626&ext=jpg&ga=GA1.1.373236869.1707911526&semt=ais"
        />
        <DrawerHeader style={{ backgroundColor: "#1C2536", display: "flex", alignItems: "center" }}>
          {open && <Typography variant="h6" sx={{ color: 'white', textAlign: 'left', marginLeft: 2 }}>Solar sis</Typography>}
          <IconButton onClick={handleDrawerClose}>
            {!open ? <MenuIcon style={{ color: "#fff" }} /> : <ChevronLeftIcon style={{ color: "#fff" }} />}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        <List disablePadding={true} sx={{ mt: 1, }}>
          {sidebarData.map((item, index) => (
            <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton

                onClick={() => handleItemClick(item.path)}

                sx={{
                  width: "200px",
                  "&:hover": {
                    backgroundColor: 'rgba(255, 255, 255, 0.067)'
                  },
                  backgroundColor: activeItem === item.path ? "rgba(255, 255, 255, 0.067) " : "",
                  paddingTop: "2px",
                  paddingBottom: "2px",
                  marginTop: "10px",
                  transition: "0.2s",
                  marginLeft: open ? 2 : 0,
                  borderRadius: "5px",
                  minHeight: 10,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <item.icon sx={{ color: activeItem === item.path ? `primary.main` : `primary.light` }} color={activeItem === item.path ? "primary" : "secondary"} style={{ width: "20px" }} />
                </ListItemIcon>
                <ListItemText primary={<Typography color="inherit"
                  variant="subtitle1" sx={{ color: activeItem === item.path ? `primary.contrastText` : `primary.light`, fontSize: 14, fontWeight: 600 }}>{capitalize(item.title)}</Typography>} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, }}>
        <Header />
        <Box sx={{ px: 2 }}>
          {children}
        </Box>
      </Box>
    </Box >
  );
}
