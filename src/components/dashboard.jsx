import React, { useEffect } from "react";
import  { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { checkLoading } from "../utility/utility";
import { CircularProgress } from "@material-ui/core";
import MenuItems from "./menuItems";
import Navigation from "./navigation";
import { fetchCountryList, fetchRegionList, getSettings } from "../redux/services/addHikingsService";
import { getHikingsData } from "../redux/services/getHikingsService";
import PacmanLoader from "react-spinners/PacmanLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./dashboard.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#005ce6",
    color: "white"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    textAlign: "center"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    color: "#fff",
  },
}));

export default function Layout() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

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

  let addHikingLoading = useSelector(state => state.addHiking.loading);
  let complHikingsLoading = useSelector(state => state.complHikings.loading);

  return (
    <div className={classes.root}>
        <CssBaseline />
        {<Backdrop className={classes.backdrop} open={checkLoading(addHikingLoading, complHikingsLoading)}>
          <PacmanLoader/>
        </Backdrop>}
        <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
        >
            <Toolbar className="toolbar">
                <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>
                    Hiking App
                </Typography>
            </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <MenuItems />
            </List>
        </Drawer>
        <main className={classes.content}>
            <Container maxWidth={false} >
                <Navigation />
            </Container>
        </main>
        <ToastContainer/>
    </div>
  );
}
