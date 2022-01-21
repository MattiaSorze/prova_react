import { createTheme } from "@material-ui/core/styles";

const Theme = createTheme({
  palette: {
    primary: { 500: "#c1c2c8" },
    secondary: { main: "#46494C" },
  },
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 13,
    textAlign: "center",
   
  },
  overrides: {
    /*MuiInputLabel: {
      root: {
          fontSize: 17,
        
      }
    },*/
    MuiFormLabel: {
      root: {
          fontSize: 13,
          fontWeight:"bold",
          fontFamily: "Arial",
          color:"#46494C",
          textAlign:"left"
      }
    },
    MuiSelect:{
      root: {
        fontSize: 13,
        fontFamily: "Arial",
        color:"#46494C",
        textAlign:"left"
      },
    },
    MuiFormControlLabel:{
      label:{
        fontSize: 13,
        fontWeight:"bold",
        fontFamily: "Arial",
        color:"#46494C",
        textAlign:"left",
        float: "left",
        paddingLeft:"5px"
      }
    }
  }
});

export default Theme;
