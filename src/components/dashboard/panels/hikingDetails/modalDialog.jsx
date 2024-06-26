import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";
import {Tab, Tabs, Typography, Box, Grid} from "@mui/material";
import HikingDetailsPanel from './hikingDetailsPanel';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import HikingImagesPanel from './hikingImagesPanel';
import "./modalDialog.css";
import { deleteHikingsData } from '../../../../redux/services/getHikingsService';
import DeletionDialog from './deletionDialog';
import IconButton from '@mui/material/IconButton';
import Close from "@mui/icons-material/Close";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


export default function ModalDialog({component, openComplHikingDetail, hikingElem, closePopover}) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    let size = null;
    const handleClickOpen = () => {
        setOpen(true);
        openComplHikingDetail();
    };

    const handleClose = () => {
        setOpen(false);
        if(closePopover){
          closePopover();
        }
    };

    const handleDeleteHiking = () => {
      dispatch(deleteHikingsData(hikingElem.id));
      if(closePopover){
        closePopover();
      }
      setOpenDeletionDialog(false);
    }
    const PaperComponent = props => {
        //const classes = useStyles();
        return (
            <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} style={{boxShadow: "#b0aeae 1px 1px 1px 1px"}} />
            </Draggable>
    );
};
  const [value, setValue] = React.useState(0);
  const [openDeletionDialog, setOpenDeletionDialog] = React.useState(false); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const appTheme = useSelector(state => state.complHikings.theme);

  let dialogPaperColor = appTheme === "dark" ? "rgb(36, 36, 36)" : "white";
  let fullWidth = true;
  let maxWidth = size && size.width ? size.width : 'lg';
  const fileImages = hikingElem.imageData;
  return (
    <div>
      <div style={{display:"flex", flexDirection: "column"}}>
      <Button variant="standard" onClick={handleClickOpen} sx={{"&:hover": {backgroundColor: appTheme === "dark" ? "#0087FF" : "#5de900"}}}>
        View Details
      </Button>
      {/*<Button variant="standard" onClick={() => setOpenDeletionDialog(true)} sx={{"&:hover": {backgroundColor: appTheme === "dark" ? "#0087FF" : "#5de900"}}}>
        Delete
      </Button>*/}
      </div>
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth} 
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            PaperProps={{ sx: { backgroundColor: dialogPaperColor}, className: "modal-dialog-paper" }}
            keepMounted
            hideBackdrop={false}
        >
        <DialogTitle
            sx={{textAlign: "center", color: appTheme === "dark" ? "white" : "black", display: "inline-flex"}}
        >
          <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Typography variant="h5">{hikingElem.gpxData?.title}</Typography>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={1}>
                <IconButton sx={{transform: "translate(10px, -5px)", scale: "1.2"}}>
                    <Close onClick={handleClose} sx={{color: "white", backgroundColor: "red", borderRadius: "15px",
                        "&:hover": {backgroundColor: "#c00101"}}}/>
                </IconButton>
            </Grid>
            
        </DialogTitle>
        <DialogContent>
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
            value={value} onChange={handleChange}
            aria-label="basic tabs example"
            //indicatorColor="secondary"
            //textColor="inherit"
            TabIndicatorProps={{
              sx:{
                backgroundColor: "red",
                maxWidth: "150px",
                marginLeft: "14px",
                height: "2px"
              }
            }}
        >
            <Tab 
                icon={<AutoGraphIcon />}
                label="Altimetry" {...a11yProps(0)}
                sx={{
                  color: appTheme === "dark" ? "white" : "black",
                  minWidth: "180px", 
                  "&.MuiButtonBase-root": {
                    borderRadius: "10px"
                  },
                  "&.Mui-selected": {
                    color: appTheme === "dark" ? "white" : "black",
                    backgroundColor: appTheme === "dark" ? "rgb(70, 70, 70)" : "#5de900"
                  }
                }}
            />
            <Tab
                icon={<PhotoLibraryIcon />}
                label="Images" {...a11yProps(1)}
                sx={{
                  color: appTheme === "dark" ? "white" : "black",
                  minWidth: "180px", 
                  "&.MuiButtonBase-root": {
                    borderRadius: "10px"
                  },
                  "&.Mui-selected": {
                    color: appTheme === "dark" ? "white" : "black",
                    backgroundColor: appTheme === "dark" ? "rgb(70, 70, 70)" : "#5de900"
                  }
                }}
            />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {component}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box sx={{display: "flex", justifyContent: "center"}}>
            {/*<img src={`data:image/jpeg;base64,${hikingElem.imageData}`} width="750px" height="450px"/>*/}
            <HikingImagesPanel fileImages={fileImages}/>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
        </DialogContent>
        <DialogActions>
            {/*<div style={{paddingRight: "20px", paddingTop: "10px"}}>
                <Button onClick={handleClose} variant="contained" className="cancel-button">
                    CLOSE
                </Button>
            </div>*/}
        </DialogActions>
      </Dialog>
      <DeletionDialog open={openDeletionDialog} setOpen={setOpenDeletionDialog} deleteHiking={handleDeleteHiking} closePopover={closePopover}/>
    </div>
  );
}