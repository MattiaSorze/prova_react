import * as actionTypes from "./actionTypes";

export const updateTextValue = (value) => {
    return {
        type: actionTypes.UPDATE_TEXT_VALUE,
        value: value
    };
};