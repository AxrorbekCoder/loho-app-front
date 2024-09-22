import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Box, CssBaseline, IconButton, Menu, MenuItem, Avatar, Badge, Popover, List as MuiList } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

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

const AgentHome = () => {
  const [open, setOpen] = useState(true);
  const [pageTitle, setPageTitle] = useState('Dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0); // State for notifications
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null); // Anchor for notifications popover
  const [notifications, setNotifications] = useState([]); // Notifications list
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/agent/AgentDash':
        setPageTitle('Dashboard');
        break;
      case '/agent/AgentInvoices':
        setPageTitle('Invoices');
        break;
      default:
        setPageTitle('Dashboard');
    }
  }, [location.pathname]);

  // Simulate receiving new notifications
  useEffect(() => {
    // Replace this with your logic to update notification count
    const fetchNotifications = () => {
      // Example: Simulate fetching notifications
      setNotifications([
        { id: 1, message: 'New invoice received!' },
        { id: 2, message: 'Reminder: Update your profile.' },
      ]);
      setNotificationCount(0); // Example count
    };

    fetchNotifications();
  }, []);

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
    setOpen(prevOpen => !prevOpen);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const openNotification = Boolean(notificationAnchorEl);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#ecf0f1', color: '#000' }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={notificationCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
          <ListItem button onClick={() => handleNavigation('/agent/AgentDash')}>
            <ListItemIcon>
              <DashboardIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/agent/AgentInvoices')}>
            <ListItemIcon>
              <ReceiptIcon sx={{ color: '#fff' }} />
            </ListItemIcon>
            <ListItemText primary="Invoices" />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet /> {/* This will render the nested routes */}
      </Main>
      <Popover
        anchorEl={notificationAnchorEl}
        open={openNotification}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          {notifications.length > 0 ? (
            <MuiList>
              {notifications.map(notification => (
                <ListItem key={notification.id}>
                  <ListItemIcon>
                    <NotificationImportantIcon />
                  </ListItemIcon>
                  <ListItemText primary={notification.message} />
                </ListItem>
              ))}
            </MuiList>
          ) : (
            <Typography>No new notifications</Typography>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default AgentHome;
