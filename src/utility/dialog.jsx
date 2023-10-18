import React from 'react';
import {Button} from "@mui/joy";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from "react-draggable";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import "../components/dashboard/panels/hikingDetailsPanel.css";
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';

export const PaperComponent = props => {
    //const classes = useStyles();
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} style={{boxShadow: "#b0aeae 1px 1px 1px 1px"}} />
        </Draggable>
    );
};

const OldDialog = ({ closeFunc, modalFunctions, open, title, size, component, importFunc }) => { //importFunc è la funzione di import file e viene passata in ingresso a questo componente soltanto quando necessaria (es: parameter override)
    const useStyles = makeStyles(theme => ({
        /*"@global": {
            body: {
                backgroundColor: theme.palette.common.white
            }
        },

        button: {
            marginRight: theme.spacing(2)
        },
        paper: {
            minHeight: size && size.height ? size.height : '95vh',
            maxHeight: size && size.height ? size.height : '95vh'
        },
        input: {
            display: "none"
        }*/
    }));

    const Transition = React.forwardRef(function Transition(
        props,
        ref
      ) {
        return <Slide direction="down" ref={ref} {...props} />;
      });

    let fullWidth = true;
    let maxWidth = size && size.width ? size.width : 'lg';
    const classes = useStyles();
    const appTheme = useSelector(state => state.complHikings.theme);
    let dialogPaperColor = appTheme === "dark" ? "rgb(36, 36, 36)" : "white";

    return (
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={closeFunc}
            //classes={{ paper: classes.paper }}
            PaperComponent={PaperComponent}
            PaperProps={{ sx: { backgroundColor: dialogPaperColor} }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-slide-description"
            TransitionComponent={Transition}
            keepMounted
            hideBackdrop={true}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent 
                sx={{
                    overflow:"auto",
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                        width: '0.5em',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: "#f1f1f1",
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555'
                    }
                }}
            >
              
                    {component}

            </DialogContent>
            <DialogActions>
            <div style={{paddingRight: "20px", paddingTop: "10px"}}>
                <Button onClick={closeFunc} variant="contained" className="cancel-button">
                    CANCEL
                </Button>
            </div>
            {modalFunctions && modalFunctions.length > 0 ? 
                modalFunctions.map(f => {
                    
                        return <Button key={f.label} onClick={f.func} color="primary" variant="contained" className={classes.button} disabled={f.disabled}>
                             {f.label}
                        </Button>
                    
                })
            : null}
                        
            </DialogActions>
        </Dialog>
    );
}
export default OldDialog;