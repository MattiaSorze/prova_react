import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {Typography} from "@mui/joy";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import { Autocomplete } from "@mui/material";
import {TextField} from "@mui/material";
import JoyAutocomplete from "@mui/joy/Autocomplete";
import { clearHikingInfo, fileParsingFailed, fileParsingFinished, updateHikingInfo, waitFileParsing } from "../../features/addHiking/addHikingSlice";
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Input from "@mui/joy/Input";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";
import {DemoItem} from "@mui/x-date-pickers/internals/demo";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import { Button } from "@mui/joy";
import { saveHikingData } from "../../redux/services/addHikingsService";
import "./addHiking.css";
import GpxReader from "../../utility/gpxReader";
import HikingDetailsPanel from "./panels/hikingDetailsPanel";
import { useState } from "react";
import { parseGPX } from "../../utility/gpxParser";
import UploadButton from "./panels/graphicComponents/UploadButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" className="copy-right-add">
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
    flexDirection: "row",
    justifyContent: "center"
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    //flexGrow: 1,
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  space: {
      paddingTop: "30px"
  },
  typography: {
    padding: "5px",
    textAlign: "center",
    color: "#46494C",
    fontWeight: "normal",
  },
  gridItem: {
    paddingTop: "10px"
  },
  gridSeparator: {
    padding: "10px"
  },
  comboItem: {
    padding: "0px"
  },
  div: {
    paddingLeft: "60px"
  },
  title: {
    paddingBottom: "20px"
  },
  formLabel: {
    paddingLeft: "5px"
  },
  datePicker: {
    padding: "0px",
    height: "30px"
  },
  MuiDesktopDatePicker: {
    styleOverrides: {
      root: {
        height: "50px", // Altezza desiderata
      },
    },
  },
  uploadButton: {
    paddingTop: "24px",
    minWidth: "160px"
  }
}));

export default function AddHiking() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [autoCompValue, setAutoCompValue] = React.useState();
    const hikingInfo = useSelector(state => state.addHiking.hikingInfo);
    const settings = useSelector(state => state.addHiking.settings);
    const dispatch = useDispatch();
    const [fileData, setFileData] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let style = {
        textAlign: "center"
    };
  
    const regionProps = {
      options: settings.regionList ? settings.regionList : [],
      getOptionLabel: (option) => option.label,
    };

    const updateHikingInformation = (object, propertyName) => {
        let value = object && object.label ? object.label : object;
        if(!value){
          value = "";
        }
        dispatch(updateHikingInfo({value: value, propertyName: propertyName}));
    };

    const updateHikingCountryInfo = (object, propertyName) => {
        let value = object ? object.label : object;
        if(!value){
          value = "";
        }
        dispatch(updateHikingInfo({value: value, propertyName: propertyName}));
    }

    const updateHikingDate = (object, propertyName) => {
      let value = object;
      dispatch(updateHikingInfo({value: value, propertyName: propertyName}));
    }

    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      let parsedData;
      try{
        parsedData = await parseGPX(file);
        dispatch(fileParsingFinished());
        setFileData(parsedData);
        dispatch(updateHikingInfo({value: parsedData, propertyName: "gpxData"}));
      }
      catch(error){
        console.log(error);
        dispatch(fileParsingFailed());
      }
    }

    return (
            <div className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Grid item xs={12} className={classes.space}></Grid>
                    <Paper className="paper-style-add">
                        <Grid container className={classes.container}>
                            <Grid item xs={12} className={classes.title}>
                                <Typography level="h4" className="typography-style-add">Add Hiking</Typography>
                            </Grid>
                            <div className={classes.div}></div>
                            <Grid item xs={3}>
                                {/*<TextFieldCustom label={"Name"} object={hikingInfo.name} onBlurEffect={updateHikingInformation} propertyName={"name"}/>*/}
                              <FormControl>
                                <FormLabel className="field-style-add">Name</FormLabel>
                                <Input
                                  color="info"
                                  variant="outlined"
                                  size="md"
                                  onChange={(event) => updateHikingInformation(event.target.value, "name")}
                                  value={hikingInfo.name}
                                  disabled={false}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3} className={classes.comboItem}>
                            <FormControl>
                              <FormLabel className="field-style-add">Region</FormLabel>
                              <JoyAutocomplete
                                  id="controlled-demo"
                                  value={{label: hikingInfo.region}}
                                  options={settings.regionList}
                                  autoHighlight
                                  getOptionLabel={(option) => option.label}
                                  onChange={(event, newValue) => {
                                    updateHikingInformation(newValue, "region");
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} label="Region" variant="standard" />
                                  )}
                              />
                            </FormControl>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3} className={classes.comboItem}>
                              <FormControl>
                                <FormLabel className="field-style-add">Country</FormLabel>
                                <JoyAutocomplete
                                    id="country-select-demo"
                                    value={{label: hikingInfo.country}}
                                    slotProps={{
                                        input: {
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        },
                                    }}
                                    sx={{ width: 300 }}
                                    options={settings.countryList}
                                    autoHighlight
                                    getOptionLabel={(option) => option.label}
                                    renderOption={(props, option) => (
                                        <AutocompleteOption {...props}>
                                            <ListItemDecorator>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                    alt=""
                                                />
                                            </ListItemDecorator>
                                            <ListItemContent sx={{ fontSize: 'sm' }}>
                                                {option.label}
                                                <Typography level="body3">
                                                    ({option.code}) +{option.phone}
                                                </Typography>
                                            </ListItemContent>
                                        </AutocompleteOption>
                                    )}
                                    onChange={(event, newValue) => {
                                        updateHikingCountryInfo(newValue, "country");
                                    }}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} className={classes.gridSeparator}/>
                            <div className={classes.div}></div>
                            <Grid item xs={3}>
                              <FormControl>
                                <FormLabel className="field-style-add">Date</FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DesktopDatePicker
                                    value={hikingInfo ? hikingInfo.hikingDate : hikingInfo}
                                    slotProps={{ textField: { size: "small"}}}
                                    format="dd/MM/yyyy"
                                    onChange={(newValue) => {
                                      updateHikingDate(newValue, "hikingDate");
                                    }}
                                    sx={{backgroundColor: "white"}}
                                  />
                                </LocalizationProvider>
                              </FormControl>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3} className={classes.comboItem}>
                              <FormControl>
                                <FormLabel className="field-style-add">Status</FormLabel>
                                <JoyAutocomplete
                                  id="controlled-demo"
                                  value={hikingInfo ? hikingInfo.status : null}
                                  options={settings.statusList}
                                  autoHighlight
                                  getOptionLabel={(option) => option}
                                  onChange={(event, newValue) => {
                                    updateHikingInformation(newValue, "status");
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} label="Status" variant="standard" />
                                  )}
                                  /*sx={{
                                      '.MuiAutocomplete-popupIndicator:hover': {
                                        backgroundColor: "#04B504"
                                      },
                                      '.MuiAutocomplete-popupIndicatorOpen': {          
                                        backgroundColor: "green"
                                      },
                                      '.MuiAutocomplete-clearIndicator': {          
                                        backgroundColor: "#04B504"
                                      }
                                  }}*/
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={1} className={classes.uploadButton}>
                              <UploadButton
                                onFileChange={handleFileChange}
                                fileName={fileData && fileData.fileName}
                                label="UPLOAD GPX"
                              />
                            </Grid>
                            <Grid item xs={1} className={classes.uploadButton}>
                              <UploadButton
                                onFileChange={handleFileChange}
                                fileName={fileData && fileData.fileName}
                                label="UPLOAD IMAGES"
                              />
                            </Grid>
                            <Grid item xs={12} className={classes.appBarSpacer}></Grid>
                            <Grid item xs={5} className={classes.gridItem}></Grid>
                            <Grid item xs={1} className={classes.gridItem}>
                              <Button className="button-style" onClick={() => dispatch(saveHikingData({hikingData: hikingInfo}))}>SAVE</Button>
                            </Grid>
                            <div style={{minWidth: "20px"}}/>
                            <Grid item xs={1} className={classes.gridItem}>
                              <Button className="button-style" onClick={() => dispatch(clearHikingInfo())}>CLEAR</Button>
                            </Grid>
                            <Grid item xs={4} className={classes.gridItem}></Grid>
                        </Grid>
                    </Paper>
                <Box pt={2}>
                    <Copyright />
                </Box>
            </div>
  );
}
