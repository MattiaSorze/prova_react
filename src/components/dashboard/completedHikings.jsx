import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useCallback } from "react";
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
import {formatter} from "../../utility/utility";
import * as dataType from "../../constants/dataType";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import CompletedHikingsPanel from "./panels/completedHikingsPanel";
import PlannedHikingsPanel from "./panels/plannedHikingsPanel";
import "./hikingsTabs.css";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {IconButton} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { deleteHikingsData } from "../../redux/services/getHikingsService";

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
    overflow: "visible",
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
  }
}));

export default function CompletedHikings() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [autoCompValue, setAutoCompValue] = React.useState();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const hikingData = useSelector(state => state.complHikings.hikingData);
  let plannedHikings = hikingData.filter(elem => elem.status === "Planned");
  let completedHikings = hikingData.filter(elem => elem.status === "Completed");

  let tabsData = [
    {
      tabTitle: 'Planned',
      index: 0
    },
    {
      tabTitle: 'Completed',
      index: 1
    }
  ];

  let style = {
    textAlign: "left"
  };
  let columns = [
    {
      hide: false,
      sortable: false,
      filter: false,
      resizable: true,
      width: 70,
      minWidth: 70,
      maxWidth: 70,
      cellStyle: style,
      cellRenderer: "actionCellRendererDeleteButton"
    },
    {
      headerName: "Name",
      field: "name",
      hide: false,
      sortable: false,
      filter: true,
      cellStyle: style,
      resizable: true,
      width: "300px"
    },
    {
      headerName: "Country",
      field: "country",
      hide: false,
      sortable: false,
      filter: true,
      cellStyle: style,
      resizable: true
    },
    {
      headerName: "Region",
      field: "region",
      hide: false,
      sortable: false,
      filter: true,
      cellStyle: style,
      resizable: true
    },
    {
      headerName: "Status",
      field: "status",
      hide: false,
      sortable: false,
      filter: false,
      cellStyle: style,
      resizable: true
    },
    {
      headerName: "Date",
      field: "hikingDate",
      hide: false,
      sortable: false,
      filter: false,
      cellStyle: style,
      valueFormatter: formatter(dataType.DATE),
      resizable: true
    },
  ];

  const clickHandler = (row) => {
    return null;
  }



    const currencyList = [
      { title: "EUR"},
      { title: "USD" },
      { title: "JPY" }
    ];
  
    const defaultProps = {
      options: currencyList,
      getOptionLabel: (option) => option.title,
    };

    // Example of consuming Grid Event
  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);

  const gridRef = useRef(); // Optional - for accessing Grid's API

  const createDeleteButton = (params) => {
    return (
      <span>
        <div>
          <IconButton size="small" onClick={() => {dispatch(deleteHikingsData(params.data.id))}} disabled={false}>
            <Delete className="delete-icon"/>
          </IconButton>
        </div>
      </span>
    );
  };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Grid item xs={12} className={classes.space}></Grid>
          <AppBar position="static" color="transparent" className="app-bar-tabs">
            <Tabs value={value} onChange={handleChange} /*indicatorColor="primary" textColor="secondary"*/ variant="scrollable"
              scrollButtons="auto" aria-label="scrollable auto tabs example" /*className="tab-style"*/ TabIndicatorProps={{className: "tab-indicator-style"}}
            >
              {tabsData.map((tabInfo, index) => (
                    <Tab label={tabInfo.tabTitle} id={`vertical-tab-${index}`} key={tabInfo.tabTitle}
                        aria-controls={`vertical-tabpanel-${index}`} className={index === value ? "selected-tab-style" : "tab-style"}
                    />
              ))}
                     
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>  
            <PlannedHikingsPanel plannedHikings={plannedHikings} columns={columns} createDeleteButton={createDeleteButton}/>
          </TabPanel>
          <TabPanel value={value} index={1}>  
            <CompletedHikingsPanel completedHikings={completedHikings} columns={columns} createDeleteButton={createDeleteButton}/>
          </TabPanel>
          <Box pt={2}>
            <Copyright />
          </Box>
      </main>
    </div>
  );
}
