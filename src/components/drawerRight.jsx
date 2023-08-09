import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import AppBarProps from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Container from "@mui/material/Container";
import Navigation from './navigation';
import MenuItems from './menuItems';
import {makeStyles} from '@mui/styles';
import { Link } from "react-router-dom";
import  { useDispatch, useSelector } from "react-redux";
import {getHikingsData} from "../redux/services/getHikingsService";
import { Tooltip } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import {getSettings} from "../redux/services/addHikingsService";
import "./drawerRight.css";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import "../App.css";
import { changeTheme, changeSearchField, changeSearchValue, updateFilteredHikingData } from '../features/completedHikings/completedHikingsSlice';
import {Grid} from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth
  }),
  backgroundColor: "#52CA04"
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  }
}));

export default function PersistentDrawerRight({toggleTheme, themeParent}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();

  const loadSettings = () => {
    dispatch(getSettings());
    dispatch(getHikingsData());
  }

  const loadHikingsData = () => {
    dispatch(getHikingsData());
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let windowUrl = window.location.href;
  useEffect(() => { //chiamato a ogni ricarica della pagina
    if(windowUrl && windowUrl.includes("/add")){
      dispatch(getSettings());
    }
    else if(windowUrl){
      dispatch(getHikingsData());
    }
  }, []);

  const changeToggleTheme = () => {
    let themeChanged = themeParent === "dark" ? "light" : "dark";
    dispatch(changeTheme(themeChanged));
    toggleTheme();
  }

  const resetSearchHikingFilter = () => {
    dispatch(updateFilteredHikingData([]));
    dispatch(changeSearchField(""));
    dispatch(changeSearchValue(null));
}

  return (
    <div className="App" id={themeParent}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="app-bar-style">
        <Toolbar style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Toggle onChange={changeToggleTheme} checked={themeParent === "dark"}/>
          <Typography variant="h5" noWrap className="app-bar-title-typography" component={Link} to="/">
            Hiking App - {themeParent === "dark" ? "Dark" : "Light"}
          </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              //sx={{ ...(open && { display: 'none' }) }}
            >
              {!open ? <MenuIcon style={{color: "white"}}/> : <div/>}
            </IconButton> 
        </Toolbar>
      </AppBar>
      <Main open={open} style={{minHeight: "1000px"}}>
        <Container maxWidth={false} >
          <Navigation />
        </Container>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: themeParent === "dark" ? "rgb(36, 36, 36)" : "white",
            color: themeParent === "dark" ? "white" : "rgb(36, 36, 36)",
            borderLeft: "1px solid",
            borderColor: themeParent === "dark" ? "white" : "rgb(36, 36, 36)"
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon/> : <ChevronRightIcon className="drawer-right-icon"/>}
          </IconButton>
        </DrawerHeader>
        <Divider className="divider-style"/>
        <List>
          <ListItem button component={Link} to="/" onClick={() => {loadHikingsData(); handleDrawerClose(); resetSearchHikingFilter();}} sx={{"&:hover": {backgroundColor: themeParent === "dark" ? "gray" : "lightgray"}}}>
            <ListItemIcon className="menu-item-icon">
            <FontAwesomeIcon icon={faHouse} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
          <Tooltip title="Hikings List" placement="right">
            <ListItem button component={Link} to="/hikings" onClick={() => {loadHikingsData(); handleDrawerClose(); resetSearchHikingFilter();}} sx={{"&:hover": {backgroundColor: themeParent === "dark" ? "gray" : "lightgray"}}}>
              <ListItemIcon className="menu-item-icon">
                <FontAwesomeIcon icon={faPersonHiking} size="lg" />
              </ListItemIcon>
              <ListItemText primary="Hikings"/>
            </ListItem>
        </Tooltip>
        <Tooltip title="Add Hiking" placement="right">
          <ListItem button component={Link} to="/add" onClick={() => {loadSettings(); handleDrawerClose(); resetSearchHikingFilter();}} sx={{"&:hover": {backgroundColor: themeParent === "dark" ? "gray" : "lightgray"}}}>
            <ListItemIcon className="menu-item-icon">
              <FontAwesomeIcon icon={faCirclePlus} size="lg"/>
            </ListItemIcon>
            <ListItemText primary="Add"/>
          </ListItem>
        </Tooltip>
        </List>
      </Drawer>
      <ToastContainer/>
    </Box>
    </div>
  );
}
