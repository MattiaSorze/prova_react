import { IconButton, Paper, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import HikingIcon from '@mui/icons-material/Hiking';
import { calcDistance, calcAvgSpeed, calcElevation, toHours, toMinutes } from "../../../utility/utility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {InputLabel} from "@mui/material";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import DeletionDialog from "./hikingDetails/deletionDialog";
import { deleteHikingsData, getHikingsData } from "../../../redux/services/getHikingsService";
import "./hikingDetails.css";
import AreaChartCard from "./graphicComponents/AreaChartCard";
import { Delete, Download } from "@mui/icons-material";
import { setHikingDetail } from "../../../features/completedHikings/completedHikingsSlice";
import { useNavigate } from "react-router-dom";

export default function HikingDetail() {
    const id = window.location.href.substring(window.location.href.length - 2);
    const dispatch = useDispatch();
    const appTheme = useSelector(state => state.complHikings.theme);
    const hikingDetail = useSelector(state => state.complHikings.selectedHikingDetail);
    const [openDeletionDialog, setOpenDeletionDialog] = useState(false);
    const filteredHikingData = useSelector(state => state.complHikings.filteredHikingData);
    const navigate = useNavigate();

    useEffect(() => {
        let refHiking = filteredHikingData.filter((elem) => elem.id === Number(id));
        if(refHiking && refHiking.length > 0){
            dispatch(setHikingDetail(refHiking[0]));
        }
    }, [filteredHikingData]);

    const handleOpenDeletionDialog = (hikingElem) => {
        setOpenDeletionDialog(true);
    }

    const handleDeleteHiking = () => {
        dispatch(deleteHikingsData(hikingDetail.id));
        setOpenDeletionDialog(false);
        navigate("/hikings");
    }

    return(
        <div style={{display: "flex", paddingTop: "30px"}}>
            <Paper
                sx={{
                    backgroundColor: appTheme === "dark" ? "rgb(60, 60, 60)" : "white",
                    marginRight: "30px",
                    marginLeft: "30px",
                    borderRadius: "5px"
                }}
                elevation={2}
            >
                <div style={{display: "flex"}}>
                    <div style={{paddingRight: "3px"}}>
                        <img
                            src={`data:image/jpeg;base64,${hikingDetail && hikingDetail.imageData ? hikingDetail.imageData[0] : ""}`}
                            width="480px"
                            height="303px"
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "3px"}}>
                        <img
                            src={`data:image/jpeg;base64,${hikingDetail && hikingDetail.imageData ? hikingDetail.imageData[1] : ""}`}
                            width="300px"
                            height="150px"
                        />
                        <img
                            src={`data:image/jpeg;base64,${hikingDetail && hikingDetail.imageData ? hikingDetail.imageData[2] : ""}`}
                            width="300px"
                            height="150px"
                        />
                    </div>
                </div>
                
                <div style={{display: "flex", gap: "10px", padding: "15px"}}>
                    <IconButton
                        sx={{
                            color: appTheme === "dark" ? "rgb(36, 36, 36)" : "white",
                            backgroundColor: appTheme === "dark" ? "white" : "rgb(36, 36, 36)",
                        }}
                    >
                        <HikingIcon/>
                    </IconButton>
                    <Typography variant="h4" sx={{color: appTheme === "dark" ? "white" : "rgb(36, 36, 36)"}}>
                        {hikingDetail.name}
                    </Typography>
                </div>
                <div style={{display: "inline-flex", padding: "10px"}}>
                            <div style={{display: "inline-flex", minWidth: "100px", gap: "10px"}}>
                                <AccessTimeIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                                <InputLabel style={{color: appTheme === "dark" ? "white" : "black"}}>
                                    {toHours(hikingDetail.gpxData.duration) + "h : " +toMinutes(hikingDetail.gpxData.duration) + "m"}
                                </InputLabel>
                            </div>
                            <div style={{display: "inline-flex", paddingRight: "10px", minWidth: "100px", gap: "10px"}}>
                                <MultipleStopIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                                <InputLabel style={{color: appTheme === "dark" ? "white" : "black"}}>
                                  {calcDistance(hikingDetail.gpxData.distance)} {"km"}
                                </InputLabel>
                            </div>
                            <div style={{display: "inline-flex", paddingRight: "10px", minWidth: "100px", gap: "10px"}}>
                                <ShutterSpeedIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                                <InputLabel style={{color: appTheme === "dark" ? "white" : "black"}}>
                                  {calcAvgSpeed(hikingDetail.gpxData.averageSpeed)} {"km/h"}
                                </InputLabel>
                            </div>
                            <div style={{display: "inline-flex", paddingRight: "10px", minWidth: "100px", gap: "10px"}}>
                                <NorthEastIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                                <InputLabel style={{color: appTheme === "dark" ? "white" : "black"}}>
                                  {calcDistance(hikingDetail.gpxData.posElevation)} {"m"}
                                </InputLabel>
                            </div>
                        </div>
                        <div style={{padding: "10px", color: appTheme === "dark" ? "white" : "black"}}>
                            <Typography variant="h6">
                                Dati del Tour
                            </Typography>
                        </div>
                        <div className="elevation-graphic">
                            <AreaChartCard
                                Icon={() => null}
                                data={hikingDetail.gpxData.elevationData}
                                dataKey="elevation"
                                stroke="#0064DC"
                                fill="#0064DC"
                                yAxisLabel="Dislivello (m)"
                                graphicTitle={""}
                            />
                        </div>
            </Paper>
            <Paper
                sx={{
                    backgroundColor: appTheme === "dark" ? "rgb(50, 50, 50)" : "white",
                    marginRight: "30px",
                    minWidth: "350px",
                    padding: "20px",
                    borderRadius: "5px"
                }}
                elevation={2}
            >
                <div className="right-menu">
                    <div className="right-menu-options" /*onClick={() => handleOpenDeletionDialog(hikingDetail)}*/>
                        <IconButton sx={{marginRight: "10px", color: appTheme === "dark" ? "white" : "rgb(36, 36, 36)"}}>
                            <Download/>
                        </IconButton>
                        <div style={{paddingTop: "9px", color: appTheme === "dark" ? "white" : "rgb(36, 36, 36)"}}>Download GPX</div>
                    </div>
                    <div className="right-menu-options" onClick={() => handleOpenDeletionDialog(hikingDetail)}>
                        <IconButton sx={{marginRight: "10px", color: appTheme === "dark" ? "white" : "rgb(36, 36, 36)"}}>
                            <Delete/>
                        </IconButton>
                        <div style={{paddingTop: "9px", color: appTheme === "dark" ? "white" : "rgb(36, 36, 36)"}}>Elimina</div>
                    </div>
                </div>
                <div style={{display: "flex", gap: "10px"}}>
                    
                </div>
            </Paper>
            <DeletionDialog open={openDeletionDialog} setOpen={setOpenDeletionDialog} deleteHiking={handleDeleteHiking} closePopover={null}/>
        </div>
    )
};