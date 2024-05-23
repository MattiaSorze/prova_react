import { AgGridReact } from "ag-grid-react";
import { useRef, useCallback, useState, useEffect } from "react";
import "../../dashboard.css";
import OldDialog from "../../../utility/dialog";
import {openComplHikingDetailDialog, closeComplHikingDetailDialog, selectHikingDetail, changeTheme, changeSearchField, updateFilteredHikingData} from "../../../features/completedHikings/completedHikingsSlice";
import { useDispatch, useSelector } from "react-redux";
import HikingDetailsPanel from "./hikingDetails/hikingDetailsPanel";
import { Card, CardContent, CardMedia, Paper, CardActionArea, CardActions, CardHeader, TextField, Avatar, Accordion, AccordionSummary, AccordionDetails,
    FormControl, MenuItem, Popper, Grow, MenuList, ClickAwayListener, 
    Dialog,
    InputLabel} from "@mui/material";
import Tooltip, {tooltipClasses } from "@mui/material/Tooltip";
import { Grid } from "@material-ui/core";
import { Button, Typography } from "@mui/joy";
import { makeStyles } from "@material-ui/core/styles";
import {Fade} from "react-slideshow-image";
import "./hikingListPage.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import React from "react";
import {styled} from "@mui/material/styles";
import {IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatter, formatDate, checkLoading } from "../../../utility/utility";
import {Popover} from "@mui/material";
import HikingCardMenu from "./hikingCardMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import JoyAutocomplete from "@mui/joy/Autocomplete";
import FormLabel from "@mui/joy/FormLabel";
import { changeSearchValue } from "../../../features/completedHikings/completedHikingsSlice";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import { toMinutes, calcDistance, calcElevation, toHours, calcAvgSpeed } from "../../../utility/utility";
import { deleteHikingsData } from "../../../redux/services/getHikingsService";
import { Close, Delete } from "@mui/icons-material";
import DeletionDialog from "./hikingDetails/deletionDialog";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "row",
      //alignItems: "center",
      paddingTop: "30px"
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
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
      paddingTop: "20px",
      //paddingBottom: "20px",
      maxHeight: "100px"
    },
    tabSpace: {//per spostare al centro i tab nella barra
        //paddingLeft: "480px"
    }
  }));

  const fadeImages = require.context('../../../../public/Sfondi', true);
  const imageList = fadeImages.keys().map(image => fadeImages(image));

export default function HikingListPage({columns, createDeleteButton}) {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const dispatch = useDispatch();
    const classes = useStyles();
    // Example of consuming Grid Event
    const cellClickedListener = useCallback( event => {
        console.log('cellClicked', event);
    }, []);

    const appTheme = useSelector(state => state.complHikings.theme);
    const settings = useSelector(state => state.addHiking.settings);
    let addHikingLoading = useSelector(state => state.addHiking.loading);
    let complHikingsLoading = useSelector(state => state.complHikings.loading);
    const [openDeletionDialog, setOpenDeletionDialog] = React.useState(false); 
    const [selectedHiking, setSelectedHiking] = React.useState(null);
    const [expanded, setExpanded] = React.useState([]);
    const handleExpandClick = (index) => {
      let expandedClone = [...expanded];
      expandedClone[index] = !expandedClone[index];
      setExpanded(expandedClone);
    };

    const anchorRef = useRef(null);
    const [anchorRefArray, setAnchorRefArray] = useState([]);
    const [open, setOpen] = useState(false);
    const [openArray, setOpenArray] = useState([]);
    const [hikingDetailToOpen, setHikingDetailToOpen] = useState(null);
    const id = open ? 'simple-popover' : undefined;

    const [cardMenuToOpen, setCardMenuToOpen] = useState(null);
    const complHikingDetailOpen = useSelector(state => state.complHikings.openCompHikingDetail);
    const selectedHikingDetail = useSelector(state => state.complHikings.selectedHikingDetail);
    const hikingData = useSelector(state => state.complHikings.hikingData);

    const hikingsList = hikingData.filter(elem => elem.status === "Completed" || elem.status === "Planned");
    //const [filteredHikingData, setFilteredHikingData] = useState([...hikingsList]);
    const filteredHikingData = useSelector(state => state.complHikings.filteredHikingData);
    const [selectedHikingIndex, setSelectedHikingIndex] = useState(-1);
    
    const handleClick = (event, hikingElem, hikingIndex) => {
      //setAnchorEl(event.currentTarget);
      setCardMenuToOpen(hikingElem);
      setSelectedHikingIndex(hikingIndex);
    };
  
    /*const handleClose = () => {
      setAnchorEl(null);
      setSelectedHikingIndex(-1);
    };*/

    const handleClose = (event, index) => {
      //if (anchorRefArray[index] && anchorRefArray[index].current && anchorRefArray[index].current.contains(event.target)) {
        //return;
      //}
      setSelectedHikingIndex(-1);
      let openArr = [...openArray];
      openArr[index] = false;
      setOpenArray(openArr);
      //setOpen(false);
      setCardMenuToOpen(null);
      let anchorElArr = [...anchorRefArray];
      anchorElArr[index] = null;
      setAnchorRefArray(anchorElArr);
      setHikingDetailToOpen(null);
    };

    /*const handleOpenDetailDialog = (elem, index) => {
      setHikingDetailToOpen(elem);
    }*/

    const clickHandler = (row) => {
        return null;
    }

    const openComplHikingDetail = (row) => {
        dispatch(selectHikingDetail(row.data));
        //dispatch(openComplHikingDetailDialog());
    }

    const closeComplHikingDetail = (row) => {
        dispatch(closeComplHikingDetailDialog());
    }

    const ExpandMore = styled((props) => {
      const { expand, ...other } = props;
      return <IconButton {...other} />;
    })(({ theme, expand }) => ({
      transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    }));

    //const [searchValue, setSearchValue] = useState(null);
    const searchValue = useSelector(state => state.complHikings.searchValue);
    const searchField = useSelector(state => state.complHikings.searchField);
    //const [searchField, setSearchField] = useState("");

    const searchHikingElement = (e) => {
      let value = e.target.value;
      if(value === null){
        value = "";
      }
      if(searchField === null){
        searchField = "";
      }
      let filteredData = [];
      hikingsList.map((elem) => {
        if(elem[searchField.toLowerCase()].toLowerCase().includes(value.toLowerCase())){
          filteredData.push(elem);
        }
      });
      //setFilteredHikingData(filteredData);
      dispatch(updateFilteredHikingData(filteredData));
      dispatch(changeSearchValue(value));
      //setSearchValue(value);
    }

    const searchRegion = (objectValue) => {
        let value = objectValue && objectValue.label ? objectValue.label : objectValue;
        if(value === null){
          value = "";
        }
        if(searchField === null){
          searchField = "";
        }
        let filteredData = [];
        hikingsList.map((elem) => {
          if(elem[searchField.toLowerCase()].toLowerCase().includes(value.toLowerCase())){
            filteredData.push(elem);
          }
        });
        dispatch(updateFilteredHikingData(filteredData));
        dispatch(changeSearchValue(value));
    }

    const resetSearchHikingFilter = () => {
      dispatch(updateFilteredHikingData(hikingsList));
      dispatch(changeSearchField(""));
      dispatch(changeSearchValue(""));
    }

    const BootstrapTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} arrow classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
          color: theme.palette.common.black,
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.black,
          fontSize: 14,
          fontFamiliy: "Arial",
          fontWeight: "bold",
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingLeft: "8px",
          paddingRight: "8px",
          borderRadius: "10px"
        },
    }));

    const handleDeleteHiking = () => {
        dispatch(deleteHikingsData(selectedHiking.id));
        setOpenDeletionDialog(false);
    }

    const handleOpenDeletionDialog = (hikingElem) => {
        setSelectedHiking(hikingElem);
        setOpenDeletionDialog(true);
    }

    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    const handleToggle = (ev, hikingElem, hikingIndex) => {
      let anchorEl = ev.currentTarget;
      let anchorElArr = [...anchorRefArray];
      anchorElArr[hikingIndex] = anchorEl;
      setAnchorRefArray(anchorElArr);
      let openArr = [...openArray];
      openArr[hikingIndex] = true;
      setOpenArray(openArr);
      setOpen(false);
      setOpen(!open);
      setSelectedHikingIndex(hikingIndex);
      setCardMenuToOpen(hikingElem);
      setHikingDetailToOpen(hikingElem);
    };

    const handleOpenDetailDialog = (e, elem) => {
      setHikingDetailToOpen(elem);
    }
    
    return (
        <div className={classes.root}>
            {/*<div style={{display: "flex", marginTop: "30px"}}>*/}
            {!checkLoading(addHikingLoading, complHikingsLoading) ? 
            <div style={{display: "flex"}}>
            <Paper elevation={2}
                sx={{
                    backgroundColor: appTheme === "dark" ? "rgb(36, 36, 36)" : "white",
                    //color: themeParent === "dark" ? "white" : "rgb(36, 36, 36)",
                    borderRight: "1px solid",
                    borderColor: appTheme === "dark" ? "#5B5B5B" : "#E1DFDF",
                    boxShadow: appTheme === "dark" ? "1px 1px 1px 1px black" : "1px 1px 1px 1px rgb(245, 245, 245)",
                    //padding: "30px",
                    //minWidth: "400px",
                    maxWidth: "900px"
                }}
                className="user-info-paper"
            >
                <div style={{display: "flex", flexDirection: "column", gap: "20px", padding: "30px"}}>
                    <Avatar alt="Remy Sharp" src="https://d2exd72xrrp1s7.cloudfront.net/www/15/15uit9rdvabg4th9tzp5mbpcw4fjy7r19-u2696130762198-full/1891759a7cb?width=100&height=100&crop=true&q=75&quot"
                        sx={{width: "100px", height: "100px"}}
                    />
                    <Typography level="h6" style={{color: appTheme === "dark" ? "white" : "black"}}>
                        Mattia
                    </Typography>
                    <div>
                        <Accordion style={{backgroundColor: appTheme === "dark" ? "#494949" : "white", color: appTheme === "dark" ? "white" : "#494949",
                          minWidth: "220px"
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{color: appTheme === "dark" ? "white" : "black"}}/>}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                style={{fontWeight: "bold"}}
                            >
                                Tour
                            </AccordionSummary>
                            <AccordionDetails>
                                <div style={{padding: "10px", display: "flex", justifyContent: "space-between"}}>
                                    <Typography level="h7">Completati</Typography>
                                    <Typography level="h7" sx={{fontWeight: "bold"}}>
                                      {filteredHikingData.filter(hik => hik.status === "Completed").length}
                                    </Typography>
                                </div>
                                <div style={{padding: "10px", display: "flex", justifyContent: "space-between"}}>
                                  <Typography level="h7">Pianificati</Typography>
                                  <Typography level="h7" sx={{fontWeight: "bold"}}>
                                    {filteredHikingData.filter(hik => hik.status === "Planned").length}
                                  </Typography>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </Paper>
          <Paper elevation={2}
            sx={{
                backgroundColor: appTheme === "dark" ? "rgb(36, 36, 36)" : "white",
                borderRight: "1px solid",
                borderColor: appTheme === "dark" ? "#5B5B5B" : "#E1DFDF",
                boxShadow: appTheme === "dark" ? "1px 1px 1px 1px black" : "1px 1px 1px 1px rgb(245, 245, 245)",
                //padding: "48px",
                //paddingLeft: "100px"
            }}
            className="hiking-list-paper"
            >
              <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap:"10px"}}>
              <FormLabel className="field-style-add">Filtra per</FormLabel>
              <JoyAutocomplete
                id="controlled-demo"
                value={{label: searchField}}
                options={[{label: "Name"}, {label: "Region"}, {label: "Status"}, {label: "Country"}]}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  dispatch(changeSearchValue(""));
                  dispatch(changeSearchField(newValue ? newValue.label : ""));
                  dispatch(updateFilteredHikingData(hikingsList));
                }}
                sx={{
                  height: "40px", width: "240px"
                }}
                renderInput={(params) => (
                  <TextField{...params}
                    label="Region"
                    variant="outlined"
                    />
                )}
              />
            {searchField === "Region" ? 
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                <FormLabel className="field-style-add">Region</FormLabel>
                <JoyAutocomplete
                    id="controlled-demo"
                    value={{label: searchValue}}
                    options={settings.regionList}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    onChange={
                        (e, value) => searchRegion(value)
                    }
                    renderInput={(params) => (
                    <TextField {...params} label="Region" variant="standard" />
                    )}
                    sx={{
                        height: "40px", width: "240px"
                    }}
                />
                </div>
            :
            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
            <FormLabel className="field-style-add">Value</FormLabel>
            <TextField
              value={searchValue}
              variant="outlined"
              onChange={(e) => searchHikingElement(e)}
              style={{backgroundColor: "white", borderRadius: "10px"}}
              InputLabelProps={{
                style: {color: "blue"}
              }}
              disabled={searchField ? false : true}
              sx={{height: "40px", width: "240px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  borderRadius: "10px"
                },
                "& .MuiOutlinedInput-root.Mui-focused": { //quando si clicca dentro l'autocomplete
                  "& fieldset": {
                    borderRadius: "10px",
                    border: "2px solid red"
                  },
                },
              }}
            ></TextField>
            </div>
            }
            </div>
            <div style={{display: "flex", flexDirection: "row-reverse", paddingTop: "20px"}}>
              <Button onClick={() => {resetSearchHikingFilter()}}className="clear-list-button">CLEAR</Button>
            </div>
          
          <div style={{ /*minWidth: "1100px",*/ flexWrap: "wrap"}}>
            {filteredHikingData.map((elem, index) =>
              (<Grid item xs={4}>
                <div className="hiking-strip"
                  sx={{
                    backgroundColor: index === selectedHikingIndex ? (appTheme === "dark" ? "rgb(0, 69, 217)" : "#5de900") : (appTheme === "dark" ? "#676767" : "white"),
                  }}
                >
                    <img src={`data:image/jpeg;base64,${elem.imageData ? elem.imageData[0] : ""}`} width="150px" height="120px"/>
                    <div style={{/*minWidth: "500px",*/ paddingLeft: "20px"}}>
                        <BootstrapTooltip title={elem.name} placement="top">
                            <Typography level="h5" className="hiking-strip-title-typography">
                                {elem.name.length <= 20 ? elem.name : (elem.name.substr(0, 20) + "...")}
                            </Typography>
                        </BootstrapTooltip>
                        <div style={{display: "inline-flex", paddingTop: "10px", paddingRight: "10px"}}>
                            <div style={{display: "inline-flex", minWidth: "100px", gap: "10px"}}>
                                <AccessTimeIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                                <InputLabel style={{color: appTheme === "dark" ? "white" : "black"}}>
                                    {toHours(elem.gpxData.duration)} {":"} {toMinutes(elem.gpxData.duration)}
                                </InputLabel>
                            </div>
                            <div style={{display: "inline-flex", paddingRight: "10px", minWidth: "100px", gap: "10px"}}>
                                <MultipleStopIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                                <InputLabel style={{color: appTheme === "dark" ? "white" : "black"}}>
                                  {calcDistance(elem.gpxData.distance)} {"km"}
                                </InputLabel>
                            </div>
                            <div style={{display: "inline-flex", paddingRight: "10px", minWidth: "100px", gap: "10px"}}>
                                <ShutterSpeedIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                                <InputLabel style={{color: appTheme === "dark" ? "white" : "black"}}>
                                  {calcAvgSpeed(elem.gpxData.averageSpeed)} {"km/h"}
                                </InputLabel>
                            </div>
                            <div style={{display: "inline-flex", paddingRight: "10px", minWidth: "100px", gap: "10px"}}>
                                <NorthEastIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                                <InputLabel style={{color: appTheme === "dark" ? "white" : "black"}}>
                                  {calcDistance(elem.gpxData.posElevation)} {"m"}
                                </InputLabel>
                            </div>
                        </div>
                        <InputLabel className="hiking-strip-title-typography" style={{paddingTop: "20px"}}>
                            {formatDate(new Date(elem.hikingDate))}
                        </InputLabel>
                    </div>
                    <div style={{display: "flex", flexDirection: "column-reverse"/*, justifyContent: "space-between"*/}}>
                      {/*<div>
                      <IconButton
                        //ref={anchorRefArray[elem]}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={(event) => handleToggle(event, elem, index)}
                      >
                        <MoreVertIcon/>
                      </IconButton>
                      <Popper
                        open={openArray[index]}
                        anchorEl={anchorRefArray[index]}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={(e) => handleClose(e, index)}>
                                <MenuList
                                  autoFocusItem={open}
                                  id="composition-menu"
                                  aria-labelledby="composition-button"
                                  onKeyDown={handleListKeyDown}
                                >
                                  <MenuItem onClick={(e) => handleClose(e, index)}>Profile</MenuItem>
                                  <MenuItem onClick={(e) => handleClose(e, index)}>My account</MenuItem>
                                  <MenuItem onClick={(e) => handleClose(e, index)}>Logout</MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                        
                      </Popper>
                      </div>*/}
                      <div>
                            <BootstrapTooltip placement="top" title={"Elimina"}>
                                <Button onClick={() => handleOpenDeletionDialog(elem)} sx={{backgroundColor: "red"}}>
                                    Elimina
                                </Button>
                            </BootstrapTooltip>
                      </div>
                    </div>
              </div></Grid>)
            )}
          </div>
          </Paper>
        <DeletionDialog open={openDeletionDialog} setOpen={setOpenDeletionDialog} deleteHiking={handleDeleteHiking} closePopover={null}/>
        </div>
      : null}
      </div>
    );
}