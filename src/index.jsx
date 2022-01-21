import "react-app-polyfill/ie11";
import "react-app-polyfill/ie9";
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "typeface-roboto/index.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./index.css";
import App from "./app";
import reducer from "../src/store/reducers/reducer";
import theme from "./utility/theme";
import { ThemeProvider } from "@material-ui/core/styles";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  reducer: reducer,
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter basename="/pdfcreator">
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

var t = document.getElementById("root");

ReactDOM.render(app, t);
