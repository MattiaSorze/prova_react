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
import * as actions from "../store/actions/indexActions";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

export default function MenuItems() {
const dispatch = useDispatch();

const loadPanelDbData = () => {
  //dispatch(actions.loadDbData());
  dispatch(actions.loadDbDataSuccess());
}

  return (
    <div>
      <ListItem button component={Link} to="/" onClick={() => loadPanelDbData()}>
        <ListItemIcon>
          <PictureAsPdfIcon />
        </ListItemIcon>
        <ListItemText primary="PDF"/>
      </ListItem>
    </div>
  );
}
