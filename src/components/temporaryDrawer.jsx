import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDispatch} from 'react-redux';
import { getSettings } from '../redux/services/addHikingsService';
import { getHikingsData } from '../redux/services/getHikingsService';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { changeSearchField, changeSearchValue, changeTheme, updateFilteredHikingData } from '../features/completedHikings/completedHikingsSlice';
import "../App.css";
import "react-toggle/style.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Toggle from 'react-toggle';
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
import Container from "@mui/material/Container";
import Navigation from './navigation';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function TemporaryDrawer({toggleTheme, themeParent}) {
    const theme = useTheme();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  let anchor = "left";

  const dispatch = useDispatch();

  const loadSettings = () => {
    dispatch(getSettings());
    dispatch(getHikingsData());
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

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
  })(({ theme, open }) => ({
    backgroundColor: "#52CA04"
  }));

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3)
  }));

  const toggleDrawer =
    (anchor, open) =>
    (event) => {
      if (
        event.type === 'keydown' &&
        ((event).key === 'Tab' ||
          (event).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const resetSearchHikingFilter = () => {
        dispatch(updateFilteredHikingData([]));
        dispatch(changeSearchField(""));
        dispatch(changeSearchValue(null));
    }
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <DrawerHeader>
          <IconButton onClick={toggleDrawer(anchor, false)}>
            <MenuIcon style={{color: "white"}}/>
          </IconButton>
        </DrawerHeader>
        <Divider className="divider-style"/>
        <List>
          <ListItem button component={Link} to="/" onClick={() => {loadHikingsData(); resetSearchHikingFilter();}} sx={{"&:hover": {backgroundColor: themeParent === "dark" ? "gray" : "lightgray"}}}>
            <ListItemIcon style={{color: themeParent === "dark" ? "white" : "gray"}}>
            <FontAwesomeIcon icon={faHouse} size="lg" />
            </ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
          <Tooltip title="Hikings List" placement="right">
            <ListItem button component={Link} to="/hikings" onClick={() => {loadHikingsData(); resetSearchHikingFilter();}} sx={{"&:hover": {backgroundColor: themeParent === "dark" ? "gray" : "lightgray"}}}>
              <ListItemIcon style={{color: themeParent === "dark" ? "white" : "gray"}}>
                <FontAwesomeIcon icon={faPersonHiking} size="lg" />
              </ListItemIcon>
              <ListItemText primary="Hikings"/>
            </ListItem>
        </Tooltip>
        <Tooltip title="Add Hiking" placement="right">
          <ListItem button component={Link} to="/add" onClick={() => {loadSettings(); resetSearchHikingFilter();}} sx={{"&:hover": {backgroundColor: themeParent === "dark" ? "gray" : "lightgray"}}}>
            <ListItemIcon style={{color: themeParent === "dark" ? "white" : "gray"}}>
              <FontAwesomeIcon icon={faCirclePlus} size="lg"/>
            </ListItemIcon>
            <ListItemText primary="Add"/>
          </ListItem>
        </Tooltip>
        </List>
    </Box>
  );

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

  return (
    <div className="App" id={themeParent}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{
                sx: {
                  backgroundColor: themeParent === "dark" ? "rgb(36, 36, 36)" : "white",
                  color: themeParent === "dark" ? "white" : "rgb(36, 36, 36)",
                  borderRight: "1px solid",
                  borderColor: themeParent === "dark" ? "gray" : "rgb(36, 36, 36)"
                }
              }}
          >
            {list(anchor)}
          </Drawer>
          <AppBar position="fixed" open={state[anchor]} className="app-bar-style">
        <Toolbar style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <IconButton
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer(anchor, true)}
              sx={{/* ...(state[anchor] && { display: 'none' }),*/ "&:hover": {backgroundColor: themeParent === "dark" ? "#4d4f4d" : "#09bd09"}}}
            >
              <MenuIcon style={{color: "white"}}/>
            </IconButton> 
          <Typography variant="h5" noWrap className="app-bar-title-typography" component={Link} to="/">
            Hiking App
          </Typography>
          {/*<Toggle onChange={changeToggleTheme} checked={themeParent === "dark"} style={{color: "blue"}}/>*/}
          <FormControlLabel
            control={<MaterialUISwitch sx={{ m: 1 }} checked={themeParent === "dark"} onChange={changeToggleTheme}  />}
            label={themeParent === "dark" ? "Dark" : "Light"}
          />
        </Toolbar>
      </AppBar>
      <Main open={state[anchor]} style={{minHeight: "1000px"}}>
        <Container maxWidth={false} >
          <Navigation />
        </Container>
      </Main>
      <ToastContainer/>
        </Box>
    </div>
  );
}
