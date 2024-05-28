import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@material-ui/core";
import Dashboard from "./dashboard/completedHikings";
import CompletedHikings from "./dashboard/completedHikings";
import PlannedHikings from "./dashboard/plannedHikings";
import AddHiking from "./dashboard/addHiking";
import GpxReader from "../utility/gpxReader";
import HomePage from "./dashboard/homePage";
import HikingListPanel from "./dashboard/panels/hikingListPanel";
import HikingListPage from "./dashboard/panels/hikingListPage";
import HikingDetail from "./dashboard/panels/hikingDetail";

export default function Navigation() {
  return (
    <Box>
      <Routes>
      <Route path="/" exact element={<HomePage/>} />
      <Route path="/hikings" exact element={<HikingListPage/>} />
      <Route path="/add" exact element={<AddHiking/>} />
      <Route path="/hiking/:id" exact element={<HikingDetail/>}/>
      </Routes>
    </Box>
  );
}