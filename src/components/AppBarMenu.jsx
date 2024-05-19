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
import { changeSearchField, changeSearchValue, changeTheme, setZoomLevel, updateFilteredHikingData } from '../features/completedHikings/completedHikingsSlice';
import "../App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "./AppBarMenu.css";
import { Paper, Tooltip } from "@mui/material";
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
import {Backdrop, Popover} from '@mui/material';
import { PacmanLoader, PropagateLoader } from 'react-spinners';
import { checkLoading } from '../utility/utility';
import {Grid, CircularProgress} from "@mui/material";
import { clearHikingInfo } from '../features/addHiking/addHikingSlice';
import { Close, Landscape, Settings, ZoomIn, ZoomOut } from '@mui/icons-material';

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
    padding: theme.spacing(4)
  }));

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 60,
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

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
}));

const CustomSpinner = ({ imageUrl, size = 30 }) => {
  return (
    <Box position="relative" >
      <CircularProgress size={size} />
      <div style={{position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -55%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "60px",
        height: "60px"}}
      >
        {<img src="./icons8-mountain-60.png" alt="centered" style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: "white" }} />}
      </div>
    </Box>
  );
};

export default function AppBarMenu({toggleTheme, themeParent}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const zoomLevel = useSelector(state => state.complHikings.zoomLevel);
  const [anchorPopover, setAnchorPopover] = React.useState(null);
  const openPopover = Boolean(anchorPopover);
  const id = openPopover ? 'simple-popover' : undefined;

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

  const list = () => (
    <div
      style={{display: "inline-flex", gap: "20px"}}
    >
          <Box className="appbar-list-item" component={Link} to="/" onClick={() => {loadHikingsData(); resetSearchHikingFilter();}}>
            <div className="appbar-list-item-div">
                <FontAwesomeIcon icon={faHouse} size="md" style={{paddingTop: "8px"}} className="custom-list-item-icon"/>
                <Typography variant="subtitle1" style={{paddingTop: "4px"}} className="custom-list-item-icon">Home</Typography>
            </div>
          </Box>
          <Box className="appbar-list-item" component={Link} to="/hikings" onClick={() => {loadHikingsData(); resetSearchHikingFilter(); loadSettings();}}>
            <div className="appbar-list-item-div">
                <FontAwesomeIcon icon={faPersonHiking} size="md" style={{paddingTop: "8px"}} className="custom-list-item-icon"/>
                <Typography variant="subtitle1" style={{paddingTop: "3px", paddingLeft: "5px"}} className="custom-list-item-icon">Hikings List</Typography>
            </div>
          </Box>
          <Box className="appbar-list-item" component={Link} to="/add" onClick={() => {loadSettings(); resetSearchHikingFilter();}}>
            <div className="appbar-list-item-div">
                <FontAwesomeIcon icon={faCirclePlus} size="md" style={{paddingTop: "8px"}} className="custom-list-item-icon"/>
                <Typography variant="subtitle1" style={{paddingTop: "3px"}} className="custom-list-item-icon">Add Hiking</Typography>
            </div>
          </Box>
    </div>
  );

  let addHikingLoading = useSelector(state => state.addHiking.loading);
  let complHikingsLoading = useSelector(state => state.complHikings.loading);

  const zoomIn = () => {
    let zoomL = zoomLevel;
    if(Number((zoomL+0.2).toFixed(2)) <= 1.6){
      zoomL = Number((zoomL+0.2).toFixed(1));
    }
    else{
      zoomL = Number((zoomL).toFixed(1));
    }
    document.body.style.zoom = zoomL;
    dispatch(setZoomLevel(zoomL));
  }

  const zoomOut = () => {
    let zoomL = zoomLevel;
    if(Number((zoomL-0.2).toFixed(2)) >= 0.6){
      zoomL = Number((zoomL-0.2).toFixed(1));
    }
    else{
      zoomL = Number((zoomL).toFixed(1));
    }
    document.body.style.zoom = zoomL;
    dispatch(setZoomLevel(zoomL));
  }

  const handleOpenPopover = (event) => {
    setAnchorPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorPopover(null);
  };
  

  return (
    <div className="App" id={themeParent}>
      <Box sx={{ display: 'flex'/*, minWidth: "1500px" */}}>
        <CssBaseline />
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000}} open={checkLoading(addHikingLoading, complHikingsLoading)}>
          <CustomSpinner imageUrl="https://via.placeholder.com/50" size={72} />
        </Backdrop>
        <AppBar position="absolute" open={open} className="app-bar-style">
          <Toolbar style={{/*display: "flex", flexDirection: "row", justifyContent: "space-between",*/ paddingLeft: "8px"}}>
            <Grid container>
              <div style={{paddingTop: "5px", display: "inline-flex", paddingRight: "20px"}}>
                <img src="./icons8-mountain-60.png" alt="centered" style={{ width: "40px", height: "40px", borderRadius: '50%', backgroundColor: "white" }}/>
                <Typography variant="h6" style={{paddingLeft: "15px", paddingTop: "5px", color: "#40a100"}}>
                    Hiking App
                </Typography>
              </div>
              <Grid item xs={8}>
                {list()}
              </Grid>

              <Grid item xs={1}>
                <FormControlLabel style={{paddingLeft: "15px", color: themeParent === "dark" ? "white" : "gray"}}
                  control={<MaterialUISwitch sx={{ m: 1 }} checked={themeParent === "dark"} onChange={changeToggleTheme}  />}
                  label={themeParent === "dark" ? "Dark" : "Light"}
                />
              </Grid>
            </Grid> 
          </Toolbar>
        </AppBar>
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
