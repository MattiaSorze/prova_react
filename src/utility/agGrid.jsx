import React,  { Component } from "react";
import { AgGridReact } from "ag-grid-react";

class AgGrid extends Component  {
    //{columns, data, sortable, clickHandler, heightSize, fit, onFilterChanged, onRowDataChanged, getRowStyle}

    state={
        rowIndex:0
    }

  

    listIsChanged(prev, next){
        let changed=false;
        prev.map((row,index) =>{
            Object.keys(row).forEach(key => {
                if(key === 'edited'){
                 if(row[key] !== next[index][key]){
                    changed=true;
                    }
                }
                if(key === 'selected'){
                  if(row[key] !== next[index][key]){
                    changed=true;
                 }
                }
                if(row[key] !== next[index][key]){
                    changed=true;
                }
            })
            return row;    
         })
         return changed;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(!this.props.data || !nextProps.data 
            || this.props.data.length !== nextProps.data.length
            || this.listIsChanged(this.props.data, nextProps.data)){
            return true;
        }
       return false;
    }

  
    render() {

        const  changeColor = (params) => {

            if(params.data.edited)
               return {background: 'lightCoral'};
     
        }
        //const[rowIndex, setRowIndex] = React.useState(0);
        const onViewportChanged = params => {
            if (params.api.gridPanel.eBodyViewport.clientWidth !== 0) {
             /* var columnNumber = 10;
              var allColumnIds = [];
              params.columnApi.getAllColumns().forEach(function(column) {
                allColumnIds.push(column.colId);
              });
              if (allColumnIds.length <= columnNumber) {
                params.api.sizeColumnsToFit();
              }*/ /*else{
                        params.columnApi.autoSizeColumns(allColumnIds, false);
                    }*/
                 if(this.props.fit){
                   params.api.sizeColumnsToFit();
                }
            }
        };
    
        const clickHandlerEvent = (row) =>{
            this.setState({
                rowIndex: row.rowIndex
              });
           // setRowIndex(row.rowIndex);
           this.props.clickHandler(row);
        }
    
        const rowDataChanged = (params) =>{
            onViewportChanged(params);
            //params.api.ensureIndexVisible(index, 'bottom');
            params.api.ensureIndexVisible(this.state.rowIndex);
            this.setState({
                rowIndex: 0
              });
            if(this.props.onRowDataChanged){
                this.props.onRowDataChanged(params.api.rowModel.rowsToDisplay);
            }
        }
    
        let style;
        if (this.props.heightSize) {
            style = {
                height: this.props.heightSize + "vh",
                // padding:"0px"
            };
        }
        let filterChanged = !this.props.onFilterChanged ? () =>{return} : this.props.onFilterChanged;

    return (
        <div className="ag-theme-balham"  style={style}>
            <AgGridReact
                columnDefs={this.props.columns}
                rowData={this.props.data}
                sortable={this.props.sortable}
                resizable={true}
                onCellDoubleClicked={ev => clickHandlerEvent(ev)}
                pagination={true}
                paginationPageSize="1000"
                defaultColDef={{ resizable: true }}
                onGridReady={onViewportChanged}
                onGridSizeChanged={onViewportChanged}
                onRowDataChanged={rowDataChanged}
                onFilterChanged= {(ev) => filterChanged(ev)}
                getRowStyle= {changeColor}
            />
        </div>
    )
    }
}

export default AgGrid;