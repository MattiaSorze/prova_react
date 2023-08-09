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
import "./hikingsTabs.css";
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" className="copy-right-home">
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px",
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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [autoCompValue, setAutoCompValue] = React.useState();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /*const fadeImages = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
  ];*/

  const fadeImages = require.context('../../../public/Sfondi', true);
  const imageList = fadeImages.keys().map(image => fadeImages(image));

  const showImages = () => {
    return (<Fade>
    {imageList.map(image => {return
      <div className="each-fade">
          <img src={image} className="img" />
        </div>})}
    </Fade>);
    };

  return (
    <div className={classes.root}>
          <Grid container className={classes.space}>
          <Grid item xs={12} className={classes.space}>
            <Typography level="h2" className="homepage-typography">Welcome to Hiking App</Typography>
          </Grid>
          </Grid>
          <Card className="homepage-card">
            <div style={{paddingBottom: "25px", paddingTop: "32px"}}>
            <Fade
              duration={3000}
              transitionDuration={1000}
              pauseOnHover={true}
              nextArrow={<ArrowForwardIosIcon className="show-right-image"/>}
              prevArrow={<ArrowBackIosIcon className="show-left-image"/>}>
            {imageList.map((image, index) => (
            <div key={index} className="each-fade">
          <img src={image} className="img" />
        </div>
      ))}
      </Fade>
        </div>
          </Card>
          <Box pt={2}>
            <Copyright />
          </Box>
    </div>
  );
}
