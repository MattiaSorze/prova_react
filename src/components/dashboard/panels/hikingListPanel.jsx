import { AgGridReact } from "ag-grid-react";
import { useRef, useCallback, useState, useEffect } from "react";
import "../../dashboard.css";
import ModalDialog from "../../../utility/dialog";
import {openComplHikingDetailDialog, closeComplHikingDetailDialog, selectHikingDetail, changeTheme, changeSearchField, updateFilteredHikingData} from "../../../features/completedHikings/completedHikingsSlice";
import { useDispatch, useSelector } from "react-redux";
import HikingDetailsPanel from "./hikingDetails/hikingDetailsPanel";
import { Card, CardContent, CardMedia, Paper, CardActionArea, CardActions, CardHeader, TextField } from "@mui/material";
import Tooltip, {tooltipClasses } from "@mui/material/Tooltip";
import { Grid } from "@material-ui/core";
import { Button, Typography } from "@mui/joy";
import { makeStyles } from "@material-ui/core/styles";
import {Fade} from "react-slideshow-image";
import "./hikingListPanel.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import React from "react";
import {styled} from "@mui/material/styles";
import {IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatter, formatDate } from "../../../utility/utility";
import {Popover} from "@mui/material";
import HikingCardMenu from "./hikingCardMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import JoyAutocomplete from "@mui/joy/Autocomplete";
import FormLabel from "@mui/joy/FormLabel";
import { changeSearchValue } from "../../../features/completedHikings/completedHikingsSlice";

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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

export default function HikingListPanel({columns, createDeleteButton}) {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const dispatch = useDispatch();
    const classes = useStyles();
    // Example of consuming Grid Event
    const cellClickedListener = useCallback( event => {
        console.log('cellClicked', event);
    }, []);

    const appTheme = useSelector(state => state.complHikings.theme);

    const [expanded, setExpanded] = React.useState([]);
    const handleExpandClick = (index) => {
      let expandedClone = [...expanded];
      expandedClone[index] = !expandedClone[index];
      setExpanded(expandedClone);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [cardMenuToOpen, setCardMenuToOpen] = useState(null);
    const complHikingDetailOpen = useSelector(state => state.complHikings.openCompHikingDetail);
    const selectedHikingDetail = useSelector(state => state.complHikings.selectedHikingDetail);
    const hikingData = useSelector(state => state.complHikings.hikingData);

    const hikingsList = hikingData.filter(elem => elem.status === "Completed" || elem.status === "Planned");
    //const [filteredHikingData, setFilteredHikingData] = useState([...hikingsList]);
    const filteredHikingData = useSelector(state => state.complHikings.filteredHikingData);
    const [selectedHikingIndex, setSelectedHikingIndex] = useState(-1);

    useEffect(() => {
      //setFilteredHikingData(hikingsList);
      console.log("ciao");  
    },
    [hikingData]);
    
    const handleClick = (event, hikingElem, hikingIndex) => {
      setAnchorEl(event.currentTarget);
      setCardMenuToOpen(hikingElem);
      setSelectedHikingIndex(hikingIndex);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setSelectedHikingIndex(-1);
    };

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

    return (
        <div className={classes.root}>
          <Grid item xs={12} className={classes.space}>
            <Typography level="h2" className="title-typography" variant="solid">Hikings List</Typography>
          </Grid>
          <Grid container style={{paddingTop: "10px"}}>
            <Grid item xs={1} sm={2}></Grid>
            <Grid item xs={3} sm={2}>
              <FormLabel className="field-style-add">Field</FormLabel>
              <JoyAutocomplete
                id="controlled-demo"
                value={{label: searchField}}
                options={[{label: "Name"}, {label: "Region"}, {label: "Status"}, {label: "Country"}]}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                  dispatch(changeSearchValue(""));
                  //setSearchValue(null);
                  //setSearchField(newValue ? newValue.label : "");
                  dispatch(changeSearchField(newValue ? newValue.label : ""));
                  //setFilteredHikingData(hikingsList);
                  dispatch(updateFilteredHikingData(hikingsList));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Region" variant="outlined" />
                )}
                sx={{height: "50px", width: "240px"}}
              />
            </Grid>
            <Grid item xs={1} sm={1}/>
            <Grid item xs={3} sm={2}/*style={{paddingTop: "22px"}}*/>
              <FormLabel className="field-style-add">Value</FormLabel>
              <TextField
                //label="search"
                value={searchValue}
                variant="outlined"
                onChange={(e) => searchHikingElement(e)}
                style={{backgroundColor: "white", borderRadius: "5px"}}
                InputLabelProps={{
                  style: {color: "blue"}
                }}
                disabled={searchField ? false : true}
                sx={{height: "48px", 
                  "& .MuiOutlinedInput-root": {
                    height: "48px"
                  }
                }}
              ></TextField>
            </Grid>
            <Grid item xs={1} sm={1}/>
            <Grid item xs={2} sm={2} style={{paddingTop: "30px"}}>
              <Button onClick={() => {resetSearchHikingFilter()}}className="clear-list-button">CLEAR</Button>
            </Grid>
          </Grid>
          
          <div style={{/*display: "flex", flexDirection: "row", justifyContent: "space-around",*/ minWidth: "1100px", maxWidth: "1200px", flexWrap: "wrap"}}>
            <Grid container spacing={8}>
            {filteredHikingData.map((elem, index) =>
              (<Grid item xs={4}>
                <Card className="hiking-card" variant="outlined"
                  sx={{
                    backgroundColor: index === selectedHikingIndex ? (appTheme === "dark" ? "rgb(0, 69, 217)" : "#5de900") : (appTheme === "dark" ? "#676767" : "white")
                  }}
                >
                    <CardHeader
                      action={
                        <IconButton aria-label="settings" onClick={(e) => handleClick(e, elem, index)}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={
                        <BootstrapTooltip title={elem.name} placement="top">
                          <Typography level="h5" className="hiking-card-title-typography">
                            {elem.name.length <= 20 ? elem.name : (elem.name.substr(0, 20) + "...")}
                          </Typography>
                        </BootstrapTooltip>
                      }
                      subheader={
                        <Typography level="h6" className="hiking-card-title-typography">
                          {formatDate(new Date(elem.hikingDate))}
                        </Typography>
                      }
                    />
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      className="hiking-card-popover"
                      PaperProps={{
                        style: {
                          boxShadow: "#b0aeae 2px 2px 4px"
                        }
                      }}
                    >
                      <HikingCardMenu hikingElem={cardMenuToOpen} closePopover={handleClose}/>
                    </Popover>
                <CardActionArea>
                <CardMedia
                  height="200"
                  component="img"
                  image={`data:image/jpeg;base64,${elem.imageData ? elem.imageData[0] : ""}`}
                >
                  </CardMedia>
                  <CardContent style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                    <div>
                    <Typography level="h5" className="hiking-card-typography">
                      Status: {elem.status}
                    </Typography>
                    </div>
                    <div>
                      {elem.status === "Completed" ?
                        <FontAwesomeIcon icon={faCircleCheck} size="2xl" className="status-completed-icon" />
                      : <FontAwesomeIcon icon={faListCheck} size="2xl" style={{color: "black"}}/>
                      } 
                    </div>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                  </CardActionArea>
              </Card></Grid>)
            )}</Grid>
          </div>
    </div>
    );
}