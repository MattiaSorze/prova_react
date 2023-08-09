import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import "./App.css";
import  {Provider}  from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core';
import Dashboard from "./components/dashboard";
import PersistentDrawerRight from "./components/drawerRight";
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import {createContext} from "react";
import TemporaryDrawer from './components/temporaryDrawer';
import PermanentDrawer from './components/permanentDrawer';

export const ThemeContext = createContext(null);

export default function App() {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {field: 'make', filter: true},
    {field: 'model', filter: true},
    {field: 'price'}
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
      sortable: true
    }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);

  // Example load data from server
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  let todayHour = new Date().getHours();
  const [theme, setTheme] = useState(todayHour >= 17 ? "dark" : "light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <Provider store={store}>
    <BrowserRouter basename="/">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <PermanentDrawer toggleTheme={toggleTheme} themeParent={theme}/>
        </ThemeContext.Provider>
    </BrowserRouter>
    </Provider>
  );
}
