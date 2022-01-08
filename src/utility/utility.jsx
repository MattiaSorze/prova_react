import { useSelector } from "react-redux";

export const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties
    };
};

export const checkLoading = () => {
    let loading = useSelector(state => state.reducer.loading);
    return loading;
};

export const formatNumber = (value, minimumFractionDigits, maximumFractionDigits, thousandSeparator) => {
  if (value != null && value !== "") {
    let minimum = minimumFractionDigits > 20 || minimumFractionDigits < 0 ? 20 : minimumFractionDigits;
    let maximum = maximumFractionDigits > 20 || maximumFractionDigits < 0 ? 20 : maximumFractionDigits;
    let nf = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: minimum,
      maximumFractionDigits: maximum,
      useGrouping: thousandSeparator
    });
    return nf.format(value);
  }
  return "";
};

export const formatDate = (date) =>{
  return  date.getDate()
          + "/" + (date.getMonth() + 1)
          + "/" + date.getFullYear();
};

export const fitToColumn = (header, rows) => {
  let widthArray = [];
  header.map((elem) =>{ //scorro ogni singola colonna dell'excel e calcolo la sua lunghezza massima
    let maxWidth = elem.value.toString().length; //all'inizio setto la larghezza massima della colonna uguale alla lunghezza della label della colonna (header)
    rows.map(row => {
      if(row[elem.key] && row[elem.key].toString().length > maxWidth){ //scorro ogni singolo valore della colonna (row[elem.key]) e controllo se la sua lunghezza supera quella massima
        maxWidth = row[elem.key].toString().length;
      }
      return row;
    }
    );
    widthArray.push(maxWidth + 4); //finito di scorrere la colonna, inserisco la sua larghezza massima nell'array finale
    return elem;
  }
  );
  return widthArray;
};