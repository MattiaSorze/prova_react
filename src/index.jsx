import "react-app-polyfill/ie11";
import "react-app-polyfill/ie9";
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
//import axiosassetdisposal from "./axios/axios-assetdisposal";
import "typeface-roboto/index.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./index.css";
//import App from "./App";
//import authReducer from "./store/reducers/authReducer";
//import operationReducer from "./store/reducers/operationReducer";
//import facilityReducer from "./store/reducers/facilityReducer";
//import portfolioReducer from "./store/reducers/portfolioReducer";
//import resultReducer from "./store/reducers/resultReducer";
//import parameterOverrideReducer from "./store/reducers/parameterOverrideReducer";
//import importPanelReducer from "./store/reducers/importPanelReducer";
//import theme from "./utility/theme";
import { ThemeProvider } from "@material-ui/core/styles";

// only for testing - see correctness of base url
/*axiosassetdisposal.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  //auth: authReducer,
  //facility: facilityReducer,
  //portfolio: portfolioReducer,
  //result: resultReducer,
  //operation: operationReducer,
  //parameterOverride : parameterOverrideReducer,
  //importPanel: importPanelReducer
});

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter basename="/assetdisposal">
      {/*<ThemeProvider theme={theme}>*/}
        {/*<App />*/}
      {/*</ThemeProvider>*/}
    </BrowserRouter>
  </Provider>
);

var t = document.getElementById("root");

ReactDOM.render(app, t);
