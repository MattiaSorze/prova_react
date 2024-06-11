import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
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
//import "./hikingsTabs.css";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {IconButton} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { deleteHikingsData } from "../../redux/services/getHikingsService";
import { Typography } from "@mui/joy";
import pic from "../../20230707_115639.jpg";
import "./homePage.css";
import Card from "@mui/material/Card";
import {Slide} from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import {Fade} from "react-slideshow-image";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {useTheme, Button} from "@mui/material";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" className="copy-right-home">
      {"Copyright © "}
        Hiking App
      {" "}
      {new Date().getFullYear()}
      {". "}
      {"All Rights Reserved."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //paddingTop: "40px",
    //minHeight: "900px"
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
    background: "#026BF1"
  },
  fixedHeight: {
    height: 200,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  space: {
    maxHeight: "100px"
  },
  tabSpace: {//per spostare al centro i tab nella barra
      //paddingLeft: "480px"
  }
}));

export default function HomePage() {
  const appTheme = useSelector(state => state.complHikings.theme);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [autoCompValue, setAutoCompValue] = React.useState();
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  

  /*const fadeImages = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
  ];*/

  const fileImages = require.context('../../../public/Sfondi', true);
  const imagesLabels = ["Monte Barro", "Monte Cornizzolo", "Monte Sodadura", "Lago di Molveno", "Monte Rai", "Lago di Como", "Lago di Como", "Balcone d'Italia - Lago di Lugano",
    "Balcone d'Italia - Lago di Lugano (2)", "Lago di Montespluga", "Lago di Montespluga (2)", "Lago di Montespluga (3)", "I Giardini di Sissi (Merano)", "Lago di Morasco - Val Formazza",
    "Lago di Cancano - Bormio", "Lago di Cancano (2) - Bormio", "Val Masino", "Val Masino (2)", "Val Masino (3)", "Rifugio Ponti - Val Masino", "Rifugio delle Odle",
    "Rifugio delle Odle (2)", "Rifugio delle Odle (3)", "Sassolungo", "Seceda", "Sciliar", "Lago di Carezza", "Lago di Carezza (2)", "Rifugio Azzoni - Resegone", "Resegone",
    "Lago di Morasco - Val Formazza", "Lago di Morasco - Val Formazza (2)", "Lago di Trona - Val Gerola"];
  const imageList = fileImages.keys().map((image, index) => 
    {return {label: imagesLabels[index], imgData: fileImages(image)}});
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = imageList.length;

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };

  return (
    <div className={classes.root}>
      <Grid container className={classes.space}>
        <Grid item xs={12} className={classes.space}>
          <Typography level="h2" className="homepage-typography">Welcome to Hiking App</Typography>
        </Grid>
      </Grid>
      <Box sx={{ /*width: 1000, height: 708,*/ flexGrow: 1, /*border: appTheme ==="dark" ? "1px solid blue" : "1px solid black",*/ boxShadow: "3px 3px #434343" }}
        className="box-slider-container">
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            //bgcolor: 'background.default',
          }}
          className={classes.paper}
        >
          <Typography level="h4" sx={{textAlign: "center", paddingTop: "10px", paddingBottom: "10px", color: "white"}}>{imageList[activeStep].label}</Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {imageList.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    //height: 600,
                    display: "block",
                    //width: 1000,
                    overflow: 'hidden',
                    //width: '100%',
                  }}
                  src={step.imgData}
                  alt={"ciao"}
                  className="image-container"
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{/*width: 999, height: "42px",*/ background: "#026BF1"}}
          className="slider-container"
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              className="image-slider-button"
              //sx={{color: "white", "&:hover": {cursor: "pointer", color: "white", backgroundColor: "#3DE503"}}}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              className="image-slider-button"
              //sx={{color: "white", "&:hover": {cursor: "pointer", color: "white", backgroundColor: "#3DE503"}}}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
          variant="progress"
          LinearProgressProps={{color: "error", variant: "determinate"}}
        />
      </Box>
      <Box pt={2}>
        <Copyright />
      </Box>
    </div>
  );
}
