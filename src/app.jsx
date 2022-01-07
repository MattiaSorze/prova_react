import React from "react";
import TextFieldCustom from "./utility/textField";
import {useState, useDispatch} from "react-redux";
import * as actions from "./store/actions/indexActions";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {Document, Page, View, Text, PDFDownloadLink, StyleSheet, Font, Note } from "@react-pdf/renderer";
import AgGrid from "./utility/agGrid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

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
    }
}));

const App = () => {
    const dispatch = useDispatch();
    const [textValue, setTextValue] = React.useState("");
    const [textAreaString, setTextAreaString] = React.useState("");

    const classes = useStyles();

    Font.register({ family: 'Roboto', src: "https://fonts.google.com/specimen/Roboto" });

    const styles = StyleSheet.create({
        title: {
            fontFamily: "Arial"
        },
        page: { 
            backgroundColor: 'tomato' 
        },
        section: {
            color: 'white',
            textAlign: 'center',
            margin: 30 
        }
    });

    const onBlurEffect = () => {
        dispatch(actions.updateTextValue(textValue));
    };

    const onChangeEffect = (ev) => {
        let value = ev.target.value;
        setTextValue(value);
    };

    const onChangeTextArea = (ev) => {
        let value = ev.target.value;
        setTextAreaString(value);
    }

    let columns = [
        {
            headerName: "Text Value",
            field: "textValue",
            hide: false,
            sortable: true,
            filter: true,
            cellStyle: {textAlign: "center"}
        }
    ];

    let gridData = [{textValue: textValue}];

    const MyDocument = () => {
        return(
            <Document title="PDF">
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>{textValue}</Text>
                        <Text>{textAreaString}</Text>
                        <Note>This document has been created with React JS</Note>
                    </View>
                </Page>
            </Document>
    )};

    return (
        <div>
            <Grid item xs={2} className={classes.item}>
                <TextFieldCustom label="Titolo" object={textValue} propertyName={"value"} disabled={false} onBlurEffect={onBlurEffect} id={1} labelColor="black" onChangeEffect={onChangeEffect} valueColor="black"/>
            </Grid>
            <Grid item xs={10} className={classes.item}></Grid>

            <Grid item xs={12} className={classes.item}>
                <TextareaAutosize disabled={false} className={classes.textArea} minRows={10} maxRows={30} aria-label="minimum width" defaultValue={textAreaString} 
                    placeHolder="Inserisci il testo" onChange={onChangeTextArea} />
            </Grid>
            
            <Grid item xs={12} className={classes.space}></Grid>
            <AgGrid columns={columns} data={gridData} sortable={true} heightSize={30} fit={false}></AgGrid>

            <Grid item xs={12} className={classes.space}></Grid>
            <Button variant="contained" color="default" component="label" className={classes.button} disabled={false}>
                <PDFDownloadLink document={<MyDocument/>} fileName="prova.pdf" style={{color: "black", textDecorationLine: "none"}}>
                {({ blob, url, loading, error }) =>
                    /*loading ? 'Loading document...' : */'Download PDF'
                }
            </PDFDownloadLink>
            </Button>
            
        </div>
    );
};

export default App;