import * as React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";
import {Tab, Tabs, Typography, Box} from "@mui/material";
import HikingDetailsPanel from '../components/dashboard/panels/hikingDetailsPanel';
import "../components/dashboard/panels/hikingDetailsPanel.css";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import HikingImagesPanel from '../components/dashboard/panels/hikingDetails/hikingImagesPanel';

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
    let size = null;
    const handleClickOpen = () => {
        setOpen(true);
        openComplHikingDetail();
    };

    const handleClose = () => {
        setOpen(false);
        closePopover();
    };
    const PaperComponent = props => {
        //const classes = useStyles();
        return (
            <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} style={{boxShadow: "#b0aeae 1px 1px 1px 1px"}} />
            </Draggable>
    );
};
const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const appTheme = useSelector(state => state.complHikings.theme);

  let dialogPaperColor = appTheme === "dark" ? "rgb(36, 36, 36)" : "white";
  let fullWidth = true;
  let maxWidth = size && size.width ? size.width : 'lg';
  const fileImages = [hikingElem.imageData];
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className="view-details-style">
        View Details
      </Button>
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth} 
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            PaperProps={{ sx: { backgroundColor: dialogPaperColor, width: "1100px", height: "650px"} }}
            keepMounted
            hideBackdrop={false}
        >
        <DialogTitle
            sx={{textAlign: "center", color: appTheme === "dark" ? "white" : "black"}}
        >
            {hikingElem.gpxData?.title}
        </DialogTitle>
        <DialogContent>
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
            value={value} onChange={handleChange}
            aria-label="basic tabs example"
            indicatorColor="primary"
            textColor="primary"
        >
            <Tab 
                icon={<AutoGraphIcon />}
                label="Altimetry" {...a11yProps(0)}
                sx={{color: appTheme === "dark" ? "white" : "black", minWidth: "180px"}}
            />
            <Tab
                icon={<PhotoLibraryIcon />}
                label="Images" {...a11yProps(1)}
                sx={{color: appTheme === "dark" ? "white" : "black", minWidth: "180px"}}
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
            <div style={{paddingRight: "20px", paddingTop: "10px"}}>
                <Button onClick={handleClose} variant="contained" className="cancel-button">
                    CANCEL
                </Button>
            </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}