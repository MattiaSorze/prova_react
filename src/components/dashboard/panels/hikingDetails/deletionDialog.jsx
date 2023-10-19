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
import {Tab, Tabs, Typography, Box} from "@mui/material";
import HikingDetailsPanel from './hikingDetailsPanel';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import HikingImagesPanel from './hikingImagesPanel';
import "./modalDialog.css";
import { deleteHikingsData } from '../../../../redux/services/getHikingsService';


export default function DeletionDialog({open, setOpen, deleteHiking, closePopover}) {
    const dispatch = useDispatch();

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

    const appTheme = useSelector(state => state.complHikings.theme);

  let dialogPaperColor = appTheme === "dark" ? "rgb(36, 36, 36)" : "white";
  let fullWidth = true;
  let maxWidth = 'sm';
  return (
    <div>
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth} 
            open={open}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            PaperProps={{ sx: { backgroundColor: dialogPaperColor, height: "170px"}}}
            keepMounted
            hideBackdrop={false}
        >
        <DialogTitle
            sx={{textAlign: "center", color: appTheme === "dark" ? "white" : "black"}}
        >
            Delete
        </DialogTitle>
        <DialogContent>
        <Box sx={{ width: '100%', display: "flex", justifyContent: "center" }}>
            <Typography variant="h7" color={appTheme === "dark" ? "white" : "black"} >
                Are you sure you want to delete this hiking?
            </Typography>
        </Box>
        </DialogContent>
        <DialogActions sx={{height: "60px"}}>
            <div style={{marginRight: "5px"}}>
                <Button onClick={deleteHiking} variant="contained" className="cancel-button">
                    CONFIRM
                </Button>                
            </div>
            <div style={{marginRight: "5px"}}>
                <Button onClick={handleClose} variant="contained" className="cancel-button">
                    CANCEL
                </Button>
            </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}