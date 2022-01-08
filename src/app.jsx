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
import Backdrop from "@material-ui/core/Backdrop";
import {CircularProgress, Typography} from "@material-ui/core";
import {checkLoading} from "./utility/utility";

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
    const dispatch = useDispatch();
    const [docInfo, setDocInfo] = React.useState({title: null, author: null});
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

    const onBlurEffect = (obj, propertyName) => {
        let value = obj;
        let docInfoClone = {...docInfo};
        docInfoClone[propertyName] = value;
        setDocInfo(docInfoClone);
        dispatch(actions.updateDocInfo(docInfo));
    };

    const onChangeEffect = (ev, propertyName) => {

    };

    const onChangeTextArea = (ev) => {
        let value = ev.target.value;
        setTextAreaString(value);
    }

    let columns = [
        {
            headerName: "Title",
            field: "title",
            hide: false,
            sortable: true,
            filter: true,
            cellStyle: {textAlign: "center"}
        },
        {
            headerName: "Author",
            field: "author",
            hide: false,
            sortable: true,
            filter: true,
            cellStyle: {textAlign: "center"}
        },
    ];

    let gridData = [{title: docInfo.title, author: docInfo.author}];

    const downloadExcel = () => {
        dispatch(actions.downloadAgGridExcel("download.xlsx", gridData));
    };

    const MyDocument = () => {
        return(
            <Document title="PDF">
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>{docInfo.title}</Text>
                        <Text>Author: {docInfo.author}</Text>
                        <Text>{textAreaString}</Text>
                        <Note>This document has been created with React JS</Note>
                    </View>
                </Page>
            </Document>
    )};

    return (
        <div>
            <Backdrop open={checkLoading()}>
                <CircularProgress color="inherit"></CircularProgress>
            </Backdrop>
            <Grid item xs={2} className={classes.item}>
                <TextFieldCustom label="Title" object={docInfo.title} propertyName={"title"} disabled={false} onBlurEffect={onBlurEffect} id={1} labelColor="black" valueColor="black"/>
            </Grid>
            <Grid item xs={2} className={classes.item}>
            <TextFieldCustom label="Author" object={docInfo.author} propertyName={"author"} disabled={false} onBlurEffect={onBlurEffect} id={1} labelColor="black" valueColor="black"/>
            </Grid>
            <Grid item xs={8} className={classes.item}></Grid>

            <Grid item xs={12} className={classes.item}>
                <TextareaAutosize disabled={false} className={classes.textArea} minRows={10} maxRows={30} aria-label="minimum width" defaultValue={textAreaString} 
                    placeHolder="Inserisci il testo" onChange={onChangeTextArea} />
            </Grid>
            
            <Grid item xs={12} className={classes.space}></Grid>
            <AgGrid columns={columns} data={gridData} sortable={true} heightSize={30} fit={false}></AgGrid>

            <Grid item xs={12} className={classes.space}></Grid>
            <Grid container>
                <Grid item xs={1} className={classes.item}>
                    <Button variant="contained" color="default" component="label" disabled={false} className={classes.button}>
                        <PDFDownloadLink document={<MyDocument/>} fileName="prova.pdf" style={{color: "black", textDecorationLine: "none"}}>
                            {({ blob, url, loading, error }) =>
                                /*loading ? 'Loading document...' : */'Download PDF'
                            }
                        </PDFDownloadLink>
                    </Button>
                </Grid>
                <Typography className={classes.typography}>cfsdfs</Typography>
                <Grid item xs={2} className={classes.item}>
                    <Button variant="contained" color="default" component="label" disabled={false} className={classes.button}
                        onClick={() => downloadExcel()}>
                            Download Excel
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default App;