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
import { Close } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

export default function DeletionDialog({open, setOpen, deleteHiking, closePopover}) {
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        if(closePopover){
            closePopover();
        }
    };

    const PaperComponent = props => {
        //const classes = useStyles();
        return (
            <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} style={{boxShadow: "#b0aeae 1px 1px 1px 1px", width: "385px", height: "220px"}} />
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
            PaperProps={{ sx: { backgroundColor: dialogPaperColor, /*minHeight: "200px"*/}}}
            keepMounted
            hideBackdrop={false}
        >
        <DialogTitle
            sx={{textAlign: "center", color: appTheme === "dark" ? "white" : "black", display: "inline-flex"}}
        >
            <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Typography variant="h5">Elimina Tour</Typography>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={1}>
                <IconButton sx={{transform: "translate(10px, -5px)", padding: "0px"}}>
                    <Close onClick={handleClose} sx={{color: "white", backgroundColor: "red", borderRadius: "15px",
                        "&:hover": {backgroundColor: "#c00101"}}}/>
                </IconButton>
            </Grid>
            </Grid>
        </DialogTitle>
        <DialogContent sx={{minHeight: "50px"}}>
            <Box sx={{ width: '100%', display: "flex", justifyContent: "center" }}>
                <Typography variant="h7" color={appTheme === "dark" ? "white" : "black"} >
                    Vuoi cancellare davvero questo tour? L'azione non può essere annullata
                </Typography>
            </Box>
        </DialogContent>
        <DialogActions sx={{minHeight: "70px"}}>
            <div style={{marginRight: "5px"}}>
                <Button onClick={deleteHiking} variant="outlined" className="delete-button">
                    ELIMINA
                </Button>                
            </div>
            <div style={{marginRight: "5px"}}>
                <Button onClick={handleClose} variant="outlined" className="cancel-button"
                    sx={{color: appTheme === "dark" ? "white" : "rgb(0, 69, 196)", borderColor: appTheme === "dark" ? "white" : "rgb(0, 69, 196)",
                        "&:hover": {
                            backgroundColor: appTheme === "dark" ? "blue" : "rgb(175, 230, 255)"
                        }
                        }
                    }>
                    ANNULLA
                </Button>
            </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}