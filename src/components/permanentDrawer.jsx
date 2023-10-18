import * as React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch, useSelector} from 'react-redux';
import { getSettings } from '../redux/services/addHikingsService';
import { getHikingsData } from '../redux/services/getHikingsService';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { changeSearchField, changeSearchValue, changeTheme, updateFilteredHikingData } from '../features/completedHikings/completedHikingsSlice';
import "../App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "./drawerRight.css";
import { Tooltip } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar from '@mui/material/AppBar';
import AppBarProps from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Navigation from './navigation';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Backdrop} from '@mui/material';
import { PacmanLoader } from 'react-spinners';
import { checkLoading } from '../utility/utility';
import {Grid} from "@mui/material";
import { clearHikingInfo } from '../features/addHiking/addHikingSlice';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 15px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
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

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3)
  }));

export default function PermanentDrawer({toggleTheme, themeParent}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const loadSettings = () => {
    dispatch(getSettings());
    dispatch(getHikingsData());
    dispatch(clearHikingInfo());
  }

  const loadHikingsData = () => {
    dispatch(getHikingsData());
  }

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

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  const list = () => (
    <Box
      role="presentation"
    >
        {open ? <Divider className="divider-style"/> : null}
        <List>
          {!open ?
            <Box className="custom-list-item" component={Link} to="/" onClick={() => {loadHikingsData(); resetSearchHikingFilter();}}>
              <FontAwesomeIcon icon={faHouse} size="lg" style={{paddingTop: "5px"}} className="custom-list-item-icon" />
              <Typography variant="subtitle2" style={{paddingTop: "8px"}} className="custom-list-item-icon">Home</Typography>
            </Box> 
          :
          <Box className="custom-list-item-open" component={Link} to="/" onClick={() => {loadHikingsData(); resetSearchHikingFilter();}}>
            <FontAwesomeIcon icon={faHouse} size="lg" style={{paddingTop: "5px", paddingLeft: "16px"}} className="custom-list-item-icon"/>
            <Typography variant="subtitle1" style={{paddingTop: "4px"}} className="custom-list-item-icon">Home</Typography>
          </Box>
          }
          {!open ?
            <Box className="custom-list-item" component={Link} to="/hikings" onClick={() => {loadHikingsData(); resetSearchHikingFilter();}}>
              <FontAwesomeIcon icon={faPersonHiking} size="lg" style={{paddingTop: "5px"}} className="custom-list-item-icon" />
              <Typography variant="subtitle2" style={{paddingTop: "8px"}} className="custom-list-item-icon">Hikings</Typography>
            </Box> 
          :
          <Box className="custom-list-item-open" component={Link} to="/hikings" onClick={() => {loadHikingsData(); resetSearchHikingFilter();}}>
            <FontAwesomeIcon icon={faPersonHiking} size="lg" style={{paddingTop: "5px", paddingLeft: "18px"}} className="custom-list-item-icon"/>
            <Typography variant="subtitle1" style={{paddingTop: "3px", paddingLeft: "5px"}} className="custom-list-item-icon">Hikings List</Typography>
          </Box>
          }
          {!open ?
            <Box className="custom-list-item" component={Link} to="/add" onClick={() => {loadSettings(); resetSearchHikingFilter();}}>
              <FontAwesomeIcon icon={faCirclePlus} size="lg" style={{paddingTop: "5px"}} className="custom-list-item-icon"/>
              <Typography variant="subtitle2" style={{paddingTop: "8px"}} className="custom-list-item-icon">Add</Typography>
            </Box> 
          :
          <Box className="custom-list-item-open" component={Link} to="/add" onClick={() => {loadSettings(); resetSearchHikingFilter();}}>
            <FontAwesomeIcon icon={faCirclePlus} size="lg" style={{paddingTop: "5px", paddingLeft: "18px"}} className="custom-list-item-icon"/>
            <Typography variant="subtitle1" style={{paddingTop: "3px"}} className="custom-list-item-icon">Add Hiking</Typography>
          </Box>
          }
        </List>
    </Box>
  );

  let addHikingLoading = useSelector(state => state.addHiking.loading);
  let complHikingsLoading = useSelector(state => state.complHikings.loading);

  return (
    <div className="App" id={themeParent}>
      <Box sx={{ display: 'flex', minWidth: "1500px" }}>
        <CssBaseline />
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000}} open={checkLoading(addHikingLoading, complHikingsLoading)}>
          <PacmanLoader color={themeParent === "dark" ? "#005DFF" : "#01A012"}/>
        </Backdrop>
        <AppBar position="fixed" open={open} className="app-bar-style">
          <Toolbar style={{/*display: "flex", flexDirection: "row", justifyContent: "space-between",*/ paddingLeft: "8px"}}>
            <Grid container>
              <Grid item xs={2}>
                <IconButton
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    sx={{"&:hover": {backgroundColor: themeParent === "dark" ? "#4d4f4d" : "#09bd09"}, marginLeft: "12px", marginTop: "5px", scale: "1.1"}}
                >
                  {!open ? <MenuIcon style={{color: "white"}}/> : <div/>}
                </IconButton>
              </Grid>
              <Grid item xs={9}/>
              <Grid item xs={1}>
                <FormControlLabel style={{paddingLeft: "15px"}}
                  control={<MaterialUISwitch sx={{ m: 1 }} checked={themeParent === "dark"} onChange={changeToggleTheme}  />}
                  label={themeParent === "dark" ? "Dark" : "Light"}
                />
              </Grid>
            </Grid> 
          </Toolbar>
        </AppBar>
        <Drawer 
          variant="permanent"
          open={open}
          PaperProps={{
              sx: {
                backgroundColor: themeParent === "dark" ? "rgb(36, 36, 36)" : "white",
                color: themeParent === "dark" ? "white" : "rgb(36, 36, 36)",
                borderRight: "1px solid",
                borderColor: themeParent === "dark" ? "#5B5B5B" : "#E1DFDF",
                boxShadow: themeParent === "dark" ? "1px 1px 1px 1px black" : "1px 1px 1px 1px rgb(245, 245, 245)"
              }
            }}
          >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} sx={{"&:hover": {backgroundColor: themeParent === "dark" ? "#4d4f4d" : "lightgray"}}} >
              <ChevronLeftIcon sx={{color: themeParent === "dark" ? "lightgray" : "gray"}}/>
            </IconButton>
          </DrawerHeader>
          {list()}
          <Divider className="divider-style" />
        </Drawer>
        <Main open={open} style={{minHeight: "1000px"}}>
          <Container maxWidth={false} >
            <Navigation />
          </Container>
        </Main>
        <ToastContainer autoClose={3000}/>
      </Box>
    </div>
  );
}
