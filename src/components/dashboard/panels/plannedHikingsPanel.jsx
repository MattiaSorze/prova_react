import { AgGridReact } from "ag-grid-react";
import { useRef, useCallback } from "react";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import "../../dashboard.css";
import { Paper } from "@mui/material";

export default function PlannedHikingsPanel({plannedHikings, columns, createDeleteButton}) {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    
    // Example of consuming Grid Event
    const cellClickedListener = useCallback( event => {
        console.log('cellClicked', event);
    }, []);

    const clickHandler = (row) => {
        return null;
    }

    return (
        <div className="App">
            <Paper>
            <div className="ag-theme-alpine" style={{minWidth: 1050, height: 500}}>

              <AgGridReact
                ref={gridRef} // Ref for accessing Grid's API
                rowData={plannedHikings} // Row Data for Rows
                columnDefs={columns} // Column Defs for Columns
                defaultColDef={columns} // Default Column Properties
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='multiple' // Options - allows click selection of rows
                onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                resizable={true}
                components={{
                    actionCellRendererDeleteButton: createDeleteButton,
                }}
              />
        </div>
        </Paper>
        </div>
    );
}