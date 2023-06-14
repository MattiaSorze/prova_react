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
import AgGrid from "../../utility/agGrid";
import { Autocomplete } from "@mui/material";
import {TextField} from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        PDF Creator
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
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
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [autoCompValue, setAutoCompValue] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let tabsData = [
    {
      tabTitle: 'Tab 1',
      index: 0
    },
    {
      tabTitle: 'Tab 2',
      index: 1
    }
  ];

  let style = {
    textAlign: "center"
  };
  let columns = [
    {
      headerName: "ID",
      field: "id",
      hide: false,
      sortable: false,
      filter: false,
      cellStyle: style
    },
    {
      headerName: "Nome",
      field: "name",
      hide: false,
      sortable: false,
      filter: false,
      cellStyle: style
    },
    {
      headerName: "Age",
      field: "age",
      hide: false,
      sortable: false,
      filter: false,
      cellStyle: style
    }
  ];

  const agGridData = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
    // Altri dati...
  ];

  const clickHandler = (row) => {
    return null;
  }

  const dbData = useSelector(state => state.reducer.dbData);
  console.log(dbData);



    const currencyList = [
      { title: "EUR"},
      { title: "USD" },
      { title: "JPY" }
    ];
  
    const defaultProps = {
      options: currencyList,
      getOptionLabel: (option) => option.title,
    };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Grid item xs={12} className={classes.space}></Grid>
          <AppBar position="static" color="transparent">
            <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="secondary" variant="scrollable"
              scrollButtons="auto" aria-label="scrollable auto tabs example" className={classes.tabSpace}
            >
              {tabsData.map((tabInfo, index) => (
                    <Tab label={tabInfo.tabTitle} id={`vertical-tab-${index}`} key={tabInfo.tabTitle}
                        aria-controls={`vertical-tabpanel-${index}`}
                    />
              ))}
                     
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>  
            {<AgGrid
                  columns={columns}
                  data={agGridData}
                  sortable={true}
                  clickHandler={clickHandler}
                  fit={true}
                  heightSize={100}/>}
          </TabPanel>
          <TabPanel value={value} index={1}>  
            {<Autocomplete
                        {...defaultProps}
                        id="controlled-demo"
                        value={autoCompValue}
                        onChange={(event, newValue) => {
                          setAutoCompValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="controlled" variant="standard" />
                        )}
                      />}
          </TabPanel>
          <Box pt={2}>
            <Copyright />
          </Box>
      </main>
    </div>
  );
}
