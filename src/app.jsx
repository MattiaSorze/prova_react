import React from "react";
import Layout from "./components/layout";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    item: {
        padding: "5px"
    },
    space:{
        paddingBottom: "50px"
    },
    textArea: {
        width: "30%",
        textAlign: "left"
    },
    button: {
        padding: "5px",
        minWidth: "150px"
    },
    typography: {
        visibility: "hidden"
    }
}));

const App = () => {
    return (
        <React.Fragment>
            <Layout/>
        </React.Fragment>
    );
};

export default App;