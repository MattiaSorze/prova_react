import { AgGridReact } from "ag-grid-react";
import { useRef, useCallback } from "react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import "../../dashboard.css";
import ModalDialog from "../../../utility/dialog";
import {openComplHikingDetailDialog, closeComplHikingDetailDialog, setHikingDetail} from "../../../features/completedHikings/completedHikingsSlice";
import { useDispatch, useSelector } from "react-redux";
import HikingDetailsPanel from "./hikingDetails/hikingDetailsPanel";
import { Paper } from "@mui/material";

export default function CompletedHikingsPanel({completedHikings, columns, createDeleteButton}) {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const dispatch = useDispatch();
    // Example of consuming Grid Event
    const cellClickedListener = useCallback( event => {
        console.log('cellClicked', event);
    }, []);

    const complHikingDetailOpen = useSelector(state => state.complHikings.openCompHikingDetail);
    const selectedHikingDetail = useSelector(state => state.complHikings.selectedHikingDetail);

    const clickHandler = (row) => {
        return null;
    }

    const openComplHikingDetail = (row) => {
        dispatch(setHikingDetail(row.data));
        //dispatch(openComplHikingDetailDialog());
    }

    const closeComplHikingDetail = (row) => {
        dispatch(closeComplHikingDetailDialog());
    }

    return (
        <div className="App">
            <Paper>
            <div className="ag-theme-alpine" style={{minWidth: 1050, height: 500}}>

              <AgGridReact
                ref={gridRef} // Ref for accessing Grid's API
                rowData={completedHikings} // Row Data for Rows
                columnDefs={columns} // Column Defs for Columns
                defaultColDef={columns} // Default Column Properties
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='multiple' // Options - allows click selection of rows
                onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                resizable={true}
                onCellDoubleClicked={openComplHikingDetail}
                components={{
                    actionCellRendererDeleteButton: createDeleteButton,
                }}
              />
              <ModalDialog
                closeFunc={closeComplHikingDetail} open={complHikingDetailOpen} component={<HikingDetailsPanel fileData={selectedHikingDetail ? selectedHikingDetail.gpxData : null}/>}
              />
        </div>
        </Paper>
        </div>
    );
}