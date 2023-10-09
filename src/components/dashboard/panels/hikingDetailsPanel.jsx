import { useState, useRef } from "react"

import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ArrowUpIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  ForwardIcon
} from "@heroicons/react/24/solid";

import { parseGPX } from "../../../utility/gpxParser";
import SummaryCard from "./graphicComponents/SummaryCard";
import UploadButton from "./graphicComponents/UploadButton"
import AreaChartCard from "./graphicComponents/AreaChartCard"
import ScreenshotButton from "./graphicComponents/ScreenshotButton"
import IntroductionMessage from "./graphicComponents/IntroductionMessage"
import { updateHikingInfo } from "../../../features/addHiking/addHikingSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/joy";
import { AppBar, Toolbar } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "./hikingDetailsPanel.css";
import {Grid} from "@mui/material";
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';

const HikingDetailsPanel = ({fileData}) => {
  const summaryRef = useRef()
  const dispatch = useDispatch();

  //const [fileData, setFileData] = useState(null)
  //const fileData = selectedHikingDetail.gpxData;

  /*const handleFileChange = async (event) => {
    const file = event.target.files[0]
    const parsedData = await parseGPX(file)
    console.log(parsedData)
    setFileData(parsedData)
    dispatch(updateHikingInfo({value: parsedData, propertyName: "gpxData"}));
  }*/

  function toHours(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    return hours;
  }

  function toMinutes(totalMinutes) {
    const minutes = Math.floor(totalMinutes % 60);
    return minutes;
  }

  function calcDistance(distance) {
    const approxDistance = Math.floor(distance);
    return approxDistance;
  }

  function calcAvgSpeed(speed) {
    const approxSpeed = speed.toFixed(2);
    return approxSpeed;
  }

  function calcElevation(elevation) {
    const approxElevation = Math.floor(elevation);
    return approxElevation;
  }

  const appTheme = useSelector(state => state.complHikings.theme);
  let appbarColor = appTheme === "dark" ? "rgb(70, 70, 70)" : "rgb(57, 126, 247)";
  return (
    <div>
      <div>
        {fileData === null && <Typography variant="h3"> No data </Typography>}
      </div>
        {fileData && (
          <>
            <div ref={summaryRef}>

              <Typography level="h4" variant="soft" textAlign="center" padding="10px" style={{backgroundColor: "lightgreen"}}>
                {fileData.title}
              </Typography>
              <div style={{paddingTop: "15px"}}/>
              <Typography level="h6" textAlign="center" variant="soft" style={{color: "white", backgroundColor: "blue"}}>
                Completed on {new Date(fileData.date).toLocaleDateString("it-IT")}
              </Typography>
              <div style={{paddingTop: "15px"}}/>
              <div style={{height: "100px"}}>
              
              <AppBar className="app-bar-details" position="relative" style={{backgroundColor: appbarColor, borderRadius: "10px"}} >
                <Grid container className="app-bar-container">
                
                  <Box className="details-box">
                    <AccessTimeIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                    <Typography level="h7" style={{color: appTheme === "dark" ? "white" : "black"}}>
                      {toHours(fileData.duration)} {"h"} {toMinutes(fileData.duration)} {"min"}
                    </Typography>
                  </Box>
                
                  <Box className="details-box">
                    <MultipleStopIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                    <Typography level="h7" style={{color: appTheme === "dark" ? "white" : "black"}}>
                      {calcDistance(fileData.distance)} {"km"}
                    </Typography>
                  </Box>

                  <Box className="details-box">
                    <ShutterSpeedIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                    <Typography level="h7" style={{color: appTheme === "dark" ? "white" : "black"}}>
                      {calcAvgSpeed(fileData.averageSpeed)} {"km/h"}
                    </Typography>
                  </Box>

                  <Box className="details-box">
                    <NorthEastIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                    <Typography level="h7" style={{color: appTheme === "dark" ? "white" : "black"}}>
                      {calcDistance(fileData.posElevation)} {"m"}
                    </Typography>
                  </Box>

                  <Box className="details-box">
                    <VerticalAlignTopIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                    <Typography level="h7" style={{color: appTheme === "dark" ? "white" : "black"}}>
                      {calcElevation(fileData.maxElevation)} {"m"}
                    </Typography>
                  </Box>

                  <Box className="details-box">
                    <VerticalAlignBottomIcon style={{color: appTheme === "dark" ? "white" : "black"}} />
                    <Typography level="h7" style={{color: appTheme === "dark" ? "white" : "black"}}>
                      {calcElevation(fileData.minElevation)} {"m"}
                    </Typography>
                  </Box>

                </Grid>
              </AppBar>
              
              </div>

              <div className="charts-section grid grid-cols-1 gap-4">
                <AreaChartCard
                  Icon={() => null}
                  data={fileData.speedData}
                  dataKey="speed"
                  stroke="#DC1100"
                  fill="#DC1100"
                  yAxisLabel="Speed (m/h)"
                />
                <AreaChartCard
                  Icon={() => null}
                  data={fileData.elevationData}
                  dataKey="elevation"
                  stroke="#0064DC"
                  fill="#0064DC"
                  yAxisLabel="Elevation (m)"
                />
                <AreaChartCard
                  Icon={() => null}
                  data={fileData.paceData}
                  dataKey="pace"
                  stroke="#23C004"
                  fill="#23C004"
                  yAxisLabel="Pace (min/km)"
                />
              </div>
            </div>
          </>
        )}
    </div>
  )
}

export default HikingDetailsPanel;
