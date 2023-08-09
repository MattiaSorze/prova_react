import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SimulationIcon from "@material-ui/icons/ShowChart";
import ToysIcon from "@material-ui/icons/Toys";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import  { useDispatch, useSelector } from "react-redux";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CheckIcon from '@mui/icons-material/Check';
import {fetchCountryList, fetchRegionList, getSettings} from "../redux/services/addHikingsService";
import {getHikingsData} from "../redux/services/getHikingsService";
import HikingIcon from '@mui/icons-material/Hiking';
import { Tooltip } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function MenuItems() {
  const dispatch = useDispatch();

  const loadSettings = () => {
    dispatch(getSettings());
    dispatch(getHikingsData());
  }

  const loadHikingsData = () => {
    dispatch(getHikingsData());
  }

  return (
    <div>
      <Tooltip title="Hikings List" placement="right">
        <ListItem button component={Link} to="/" onClick={() => loadHikingsData()}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faPersonHiking} size="2x" />
          </ListItemIcon>
          <ListItemText primary="Hikings"/>
        </ListItem>
      </Tooltip>
      <Tooltip title="Add Hiking" placement="right">
        <ListItem button component={Link} to="/add" onClick={() => loadSettings()}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faCirclePlus} size="2x"/>
          </ListItemIcon>
          <ListItemText primary="Add"/>
        </ListItem>
      </Tooltip>
    </div>
  );
}
