import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import { Autocomplete } from "@mui/material";
import {TextField} from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Hiking App
      </Link>{" "}
      {new Date().getFullYear()}
      {". "}
      {"All Rights Reserved."}
    </Typography>
  );
}

const drawerWidth = 240;

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
  }

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
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
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
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    paddingBottom: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 200,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  space: {
      paddingTop: "30px"
  },
  tabSpace: {//per spostare al centro i tab nella barra
      //paddingLeft: "480px"
  },
  typography: {
    padding: "5px",
    textAlign: "center",
    color: "#46494C",
    fontWeight: "normal",
  }
}));

export default function PlannedHikings() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [autoCompValue, setAutoCompValue] = React.useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let style = {
        textAlign: "center"
    };
  

    const regionList = [
      { value: "EUR"},
      { value: "USD" },
      { value: "JPY" }
    ];
  
    const regionProps = {
      options: regionList,
      getOptionLabel: (option) => option.value,
    };

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Grid item xs={12} className={classes.space}></Grid>
                    <Paper className={classes.paper}>
                        <Grid container className={classes.container}>
                            <Grid item xs={12}>
                                <Typography variant="h5" className={classes.typography}>Add Hiking</Typography>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                                <TextField label={"Name"} object={null}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    {...regionProps}
                                    id="controlled-demo"
                                    value={autoCompValue}
                                    onChange={(event, newValue) => {
                                        setAutoCompValue(newValue);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Region" variant="standard" />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                <Box pt={2}>
                    <Copyright />
                </Box>
            </main>
        </div>
  );
}
