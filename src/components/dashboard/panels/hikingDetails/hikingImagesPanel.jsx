import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@mui/joy";
import 'react-slideshow-image/dist/styles.css';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {useTheme, Button} from "@mui/material";
import "./hikingImagesPanel.css";

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
    alignItems: "center"
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
    background: "#026BF1",
    //width: "650px"
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

export default function HikingImagesPanel({fileImages}) {
  const appTheme = useSelector(state => state.complHikings.theme);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [autoCompValue, setAutoCompValue] = React.useState();
  const dispatch = useDispatch();
  const theme = useTheme();
  
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const imageList = fileImages.map((elem, index) => 
    {return {label: "ciao", imgData: elem}});
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
        <Box sx={{flexGrow: 1}}
        className="box-slider-container-image">
        {/*<Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2
          }}
          className={classes.paper}
        >
          <Typography level="h4" sx={{textAlign: "center", paddingTop: "10px", paddingBottom: "10px", color: "white"}}>{imageList[activeStep].label}</Typography>
        </Paper>*/}
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
                    //width: '100%'
                  }}
                  src={`data:image/jpeg;base64,${step.imgData}`}
                  alt={"ciao"}
                  className="image-container-detail"
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{background: "#026BF1", textAlign: "left"}}
          className="slider-container-detail"
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
          variant="text"
          LinearProgressProps={{color: "error", variant: "determinate"}}
        />
        </Box>
      </div>
  );
}
