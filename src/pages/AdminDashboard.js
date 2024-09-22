import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Box, CssBaseline, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu'; // MenuIcon for drawer toggle
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssessmentIcon from '@mui/icons-material/Assessment'; // Status icon

// Drawer width
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  height: 64,
}));

const AdminDashboard = () => {
  const [open, setOpen] = useState(true); // Drawer state
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [anchorEl, setAnchorEl] = useState(null); // Menu anchor element
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/admin/dashboard':
        setPageTitle('Dashboard');
        break;
      case '/admin/clients':
        setPageTitle('Clients');
        break;
      case '/admin/invoices':
        setPageTitle('Invoices');
        break;
      case '/admin/products':
        setPageTitle('Products');
        break;
      case '/admin/status':
        setPageTitle('Status');
        break;
      default:
        setPageTitle('Dashboard');
    }
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate('/login');
  };

  const toggleDrawer = () => {
    setOpen(prevOpen => !prevOpen); // Toggle drawer state
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar sx={{ backgroundColor: '#ecf0f1', color: '#000' }}>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          <IconButton onClick={handleMenuClick} color="inherit">
            <Avatar alt="User Name" src="/path/to/avatar.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <AccountCircleIcon sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToAppIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#2c3e50',
            color: '#fff',
            zIndex: '10000',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" noWrap>
            Menu
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button onClick={() => handleNavigation('/admin/dashboard')}>
            <ListItemIcon>
              <DashboardIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/admin/clients')}>
            <ListItemIcon>
              <PeopleIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/admin/invoices')}>
            <ListItemIcon>
              <ReceiptIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Invoices" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/admin/products')}>
            <ListItemIcon>
              <ShoppingCartIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/admin/status')}>
            <ListItemIcon>
              <AssessmentIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Status" />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default AdminDashboard;
