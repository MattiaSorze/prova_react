import React, {useEffect} from "react";
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
import { Autocomplete, IconButton } from "@mui/material";
import {TextField} from "@mui/material";
import JoyAutocomplete from "@mui/joy/Autocomplete";
import { clearHikingInfo, fileParsingFailed, fileParsingFinished, imageUploadFailed, imageUploadFinished, updateHikingInfo, waitFileParsing } from "../../../features/completedHikings/completedHikingsSlice";
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
import { saveHikingData } from "../../../redux/services/addHikingsService";
import "./addHikingDrawer.css";
import { useState } from "react";
import { parseGPX } from "../../../utility/gpxParser";
import UploadButton from "../panels/graphicComponents/UploadButton";
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import RouteIcon from '@mui/icons-material/Route';
import { Add } from "@mui/icons-material";
import { getHikingsData } from "../../../redux/services/getHikingsService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" className="copy-right-add">
      {"Copyright © "}
        Hiking App
      {" "}
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
    flexGrow: 1,
    //height: "100vh",
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

export default function AddHikingDrawer() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const hikingInfo = useSelector(state => state.complHikings.hikingInfo);
    const settings = useSelector(state => state.complHikings.settings);
    const loading = useSelector(state => state.complHikings.loading);
    const dispatch = useDispatch();
    const [fileData, setFileData] = useState(null);
    const [imageData, setImageData] = useState(null);
    const appTheme = useSelector(state => state.complHikings.theme);

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

    const handleImageUpload = async (event) => {
      const files = event.target.files;
      const fileStringsArray = [];
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
  
        reader.onload = async (e) => {
          let fileString = e.target.result;
          fileString = fileString.replace(/^data:image\/[a-z]+;base64,/, '');
          fileStringsArray.push(fileString);
  
          if (fileStringsArray.length === files.length) {
            // All files have been processed, update state with base64 strings
            dispatch(imageUploadFinished());
            setImageData(fileStringsArray);
            dispatch(updateHikingInfo({value: fileStringsArray, propertyName: "imageData"}));
          }
        };
  
        reader.readAsDataURL(file);
      }
    }

    const isFileGpxLoaded = fileData ? true : false;
    const isFileImagesLoaded = imageData ? true : false;

    function disableSave() {
      if(hikingInfo.region && hikingInfo.country && hikingInfo.name && hikingInfo.hikingDate && hikingInfo.status)
        return false;
      else
        return true;
    }

    function clearHiking() {
      dispatch(clearHikingInfo());
      setFileData(null);
      setImageData(null);
    }

    useEffect(() => {
      if(hikingInfo.gpxData !== fileData && fileData){
        setFileData(hikingInfo.gpxData);
      }
      if(hikingInfo.imageData !== imageData && imageData){
        setImageData(hikingInfo.imageData);
      }
    }, [hikingInfo.gpxData, hikingInfo.imageData])

    function saveHiking() {
      dispatch(saveHikingData({hikingData: hikingInfo}));
      setFileData(null);
      setImageData(null);
    }

    const isSaveDisabled = disableSave();

    return (
            <div className={classes.content}>
                        <Grid container className={classes.container}>
                            <Grid item xs={2}/>
                            <Grid item xs={8}>
                                <FormLabel style={{color: appTheme === "dark" ? "white" : "black", marginBottom: "4px"}}>Titolo</FormLabel>
                                <TextField
                                  color="info"
                                  variant="outlined"
                                  size="md"
                                  onChange={(event) => updateHikingInformation(event.target.value, "name")}
                                  value={hikingInfo.name}
                                  disabled={false}
                                  sx={{
                                    width: "332px",
                                    ".MuiFormControl-root": {
                                        height: "40px"
                                    },
                                    ".MuiInputBase-root": {
                                        backgroundColor: "white",
                                        height: "40px"
                                    }
                                  }}
                                />
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8} className={classes.comboItem}>
                            <FormControl>
                              {<FormLabel style={{color: appTheme === "dark" ? "white" : "black"}}>Regione</FormLabel>}
                              <Autocomplete
                                  id="controlled-demo"
                                  value={{label: hikingInfo.region}}
                                  options={settings && settings.regionList ? settings.regionList : []}
                                  autoHighlight
                                  getOptionLabel={(option) => option.label}
                                  onChange={(event, newValue) => {
                                    updateHikingInformation(newValue, "region");
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params}
                                        InputLabelProps={{style: {color: appTheme === "dark" ? "white" : "black", shrink: false}}}
                                    />
                                  )}
                                  sx={{
                                    ".MuiFormControl-root": {
                                        height: "40px"
                                    },
                                    ".MuiInputBase-root": {
                                        backgroundColor: "white",
                                        paddingTop: "2px",
                                        height: "40px"
                                    }
                                  }}
                              />
                              </FormControl>
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8} className={classes.comboItem}>
                                <FormLabel style={{color: appTheme === "dark" ? "white" : "black"}}>Paese</FormLabel>
                                <Autocomplete
                                    id="country-select-demo"
                                    value={{label: hikingInfo.country}}
                                    options={settings && settings.countryList ? settings.countryList : []}
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
                                    renderInput={(params) => (
                                        <TextField {...params} InputLabelProps={{style: {color: appTheme === "dark" ? "blue" : "black", shrink: false}}}/>
                                    )}
                                    onChange={(event, newValue) => {
                                        updateHikingCountryInfo(newValue, "country");
                                    }}
                                    sx={{
                                        ".MuiFormControl-root": {
                                            height: "40px"
                                        },
                                        ".MuiInputBase-root": {
                                            backgroundColor: "white",
                                            paddingTop: "2px",
                                            height: "40px",
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={4}>
                              <FormControl>
                                <FormLabel style={{color: appTheme === "dark" ? "white" : "black"}}>Data</FormLabel>
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
                            <Grid item xs={5} className={classes.comboItem} style={{marginTop: "4px"}}>
                                <FormLabel style={{color: appTheme === "dark" ? "white" : "black"}}>Stato</FormLabel>
                                <Autocomplete
                                  id="controlled-demo"
                                  value={hikingInfo ? hikingInfo.status : null}
                                  options={settings.statusList}
                                  autoHighlight
                                  getOptionLabel={(option) => option}
                                  onChange={(event, newValue) => {
                                    updateHikingInformation(newValue, "status");
                                  }}
                                  renderInput={(params) => (
                                    <TextField {...params} InputLabelProps={{style: {color: appTheme === "dark" ? "blue" : "black", shrink: false}}}/>
                                  )}
                                  sx={{
                                    ".MuiFormControl-root": {
                                        height: "40px"
                                    },
                                    ".MuiInputBase-root": {
                                        backgroundColor: "white",
                                        paddingTop: "2px",
                                        height: "40px",
                                    }
                                  }}
                                />
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={12} className={classes.gridSeparator}></Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={5} className={classes.uploadButton}>
                              <UploadButton
                                onFileChange={handleFileChange}
                                fileName={fileData && fileData.fileName}
                                label="Importa GPX"
                                isFileLoaded={isFileGpxLoaded}
                                leftIcon={
                                  <IconButton style={{backgroundColor: "white", marginRight: "15px", scale: "0.8"}}>
                                    <Add/>
                                  </IconButton>
                                }
                                disabled={isSaveDisabled || loading}
                              />
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={4} className={classes.uploadButton}>
                              <UploadButton
                                onFileChange={handleImageUpload}
                                fileName={fileData && fileData.fileName}
                                label="Carica Foto"
                                isFileLoaded={isFileImagesLoaded}
                                leftIcon={
                                  <IconButton style={{backgroundColor: "white", marginRight: "15px", scale: "0.8"}}>
                                    <PhotoSizeSelectActualIcon/>
                                  </IconButton>
                                }
                                disabled={isSaveDisabled || loading}
                              />
                            </Grid>
                            <Grid item xs={1} className={classes.gridItem}></Grid>
                            <Grid item xs={12} className={classes.appBarSpacer}/>
                            <Grid item xs={3} className={classes.gridItem}></Grid>
                            <Grid item xs={3} className={classes.gridItem}>
                              <Button 
                                className="button-style-drawer" 
                                onClick={() => saveHiking()}
                                disabled={isSaveDisabled || loading}
                              >
                                AGGIUNGI
                              </Button>
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs={3} className={classes.gridItem}>
                              <Button className="button-style-drawer" onClick={() => clearHiking()}>RESET</Button>
                            </Grid>
                            <Grid item xs={2} className={classes.gridItem}></Grid>
                        </Grid>
            </div>
  );
}
