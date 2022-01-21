import * as actionTypes from "./actionTypes";
import{formatDate, formatNumber, fitToColumn} from "../../utility/utility";
import XLSXPopulate from "xlsx-populate";

export const updateDocInfo = (docInfo) => {
    return {
        type: actionTypes.UPDATE_DOC_INFO,
        docInfo: docInfo
    };
};

export const loadingStart = () => {
    return {
        type: actionTypes.LOADING_START
    };
};

export const loadingEnd = () => {
    return {
        type: actionTypes.LOADING_END
    };
};

export const loadDbDataSuccess = () => {
  return{
    type: actionTypes.LOAD_DB_DATA_SUCCESS
  };
};

export const loadDbData = () => {
  /*return dispatch => {
    dispatch(loadingStart())
      .then( response => {
        dispatch(loadDbDataSuccess());
        dispatch(loadingEnd());
      }
    ).
    catch(err => {});
  };*/
};

export const downloadAgGridExcel = (fileName, filterData) => { //filterData: lista di facility provenienti dalla ag grid (lista di AnalysisResultsTO)
    let headerObjects = [{key: "title", value: "TITLE"}, {key: "author", value: "AUTHOR"}];
  
      let headerLabels = []; //lista dei nomi delle colonne corrispondenti ai nomi dei campi dell'oggetto AnalysisResultsTO (la singola riga dell'ag grid)
      headerObjects.map(header => headerLabels.push(header.key));
  
      let headerValues = []; //lista dei nomi delle colonne da inserire nell'header dell'excel
      headerObjects.map(header => headerValues.push(header.value));
  
      let gridData = []; //lista di facility che andranno inserite nell'excel
      filterData.map(row => {
        let elem = {
          title: row.title,
          author: row.author
        };
        gridData.push(elem);
      });
      
      return dispatch => {
        dispatch(loadingStart());
        XLSXPopulate.fromBlankAsync().then(workbook => { //creazione del workbook vuoto
        let sheet = workbook.sheet(0);
        let row = sheet.row(1); //la numerazione delle righe e delle colonne è 1-based (si parte dall'indice 1)
        for(let i = 0; i < headerValues.length; ++i){ //vado a riempire l'header con i nomi delle colonne: scorro cella per cella
          let cell = row.cell(i+1);
          cell.value(headerValues[i]);
          cell.style({fontFamily: "Calibri", fontSize: 12, fontColor: "ffffff", bold: true});
          cell.style("fill", "00008b");
        }
        let rowCount = 2;
        for(let i = 0; i < gridData.length; ++i){ //vado a scorrere ogni facility che andrà inserita
          let dataRow = sheet.row(rowCount);
          for(let columnCount = 1; columnCount <= headerLabels.length; ++columnCount){ //scorro cella per cella sulla singola riga
            let cell = dataRow.cell(columnCount);
            let columnLabel = headerLabels[columnCount-1]; //prendo il nome del campo contenuto nella singola facility (AnalysisResultsTO) che andrà inserita su questa riga
            cell.value(gridData[i][columnLabel]); //prendo la singola facility e accedo al valore del campo che andrà inserito nella cella
          }
          ++rowCount;
        }
  
        let columnsWidth = fitToColumn(headerObjects, gridData); //array che contiene le larghezze massime per ciascuna colonna
        for(let i = 0; i < columnsWidth.length; ++i){
          sheet.column(i+1).width(columnsWidth[i]); //setto la larghezza di ciascuna colonna
        }
  
        workbook.outputAsync()
        .then(function (blob) {
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, "out.xlsx");
            }else{
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', fileName);
              document.body.appendChild(link);
              link.click();
            }
          dispatch(loadingEnd());
          });
      });
    }
  }