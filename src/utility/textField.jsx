import React from "react";
import {TextField, InputAdornment} from "@material-ui/core";

const TextFieldCustom  = ({label, object, propertyName, disabled, onBlurEffect, id, labelColor, onChangeEffect, valueColor})=>{
    const [obj, setObj] = React.useState(object);
    let func = () => {return null};
    React.useEffect(() => {
        setObj(object);
    }, [object])

    const changeTextHandler  = (propertyName, ev) =>{
        let value = ev.target.value;
        setObj(value);
    }

    const onBlur = (ev) =>{
        onBlurEffect(obj, propertyName);
        func(ev);
    }

    if(onChangeEffect){
        func = onChangeEffect;
    }

    const createTextField = (label, value, suffix, onChange, onBlur, marginLabelField, disabled, id, labelColor, valueColor) => {
        let disable = disabled ? disabled : false;
        let val = value == null ? "" : value;
        let margin = marginLabelField ? marginLabelField : null;
        let borderColor = disabled ? "white" : "gray";
        return (<TextField
          disabled={disable}
          variant='standard'
          fullWidth={true}
          value={val}
          id={id ? id : label}
          label={label}
          InputLabelProps={{
            style: {
              fontSize: 17,
              color: labelColor ? labelColor : "#46494C",
              marginTop: margin,
              minWidth: "300px"
            },
            shrink:true
          }}
          InputProps={{
            endAdornment: suffix ? <InputAdornment position="start">suffix</InputAdornment> : null,
            disableUnderline: true,
            style: {
              height: 30,
              color: valueColor ? valueColor : "#46494C",
              borderBottomStyle: 'groove',
              borderBottomColor: borderColor
            },
          }}
          onChange={onChange}
          onBlur={onBlur}
        />)
    };

    return(  
        <React.Fragment>
           {createTextField(label, obj, null, (e) => changeTextHandler(propertyName, e), onBlur, null, disabled, id, labelColor, valueColor)}
        </React.Fragment>
    )
}

export default TextFieldCustom;