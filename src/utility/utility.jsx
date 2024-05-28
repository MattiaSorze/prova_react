import * as dataType from "../constants/dataType";

export const updateObject = (oldObject, updatedProperties) => {
    return {
      ...oldObject,
      ...updatedProperties
    };
};

export const checkLoading = (addHikingLoading, complHikingsLoading) => {
    return (addHikingLoading);
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

export const formatter = (type, decimal) => { //funzione che formatta i valori delle colonne delle varie AgGrid
  let precision = decimal ? decimal : 17;
  return params => {
    let value = params.value;
    if (value) {
      switch (type){
        case dataType.PERCENTAGE:  value = formatNumber(value, 0, 4, true);
                                   value = value + "%";
                                   break;
        case dataType.PERCENTAGE_100:  value = formatNumber(value * 100, 0, 4, true);
                                   value = value + "%";
                                   break;
        case dataType.DOUBLE:
        case dataType.INTEGER: value = formatNumber(value, 0, precision, true);
                               break;
        case dataType.DATE: value = formatDate(new Date(value))
                            break;
        default: break;
      }
    }
    return value;
  };
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

export function toHours(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  return hours;
}

export function toMinutes(totalMinutes) {
  const minutes = Math.floor(totalMinutes % 60);
  return minutes;
}

export function calcDistance(distance) {
  const approxDistance = Math.floor(distance);
  return approxDistance;
}

export function calcAvgSpeed(speed) {
  const approxSpeed = speed ? speed.toFixed(2) : "";
  return approxSpeed;
}

export function calcElevation(elevation) {
  const approxElevation = Math.floor(elevation);
  return approxElevation;
}