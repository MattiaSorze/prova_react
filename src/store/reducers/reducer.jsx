import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../utility/utility";

const initialState = {
    textValue: null
};

const updateTextValue = (state, action) => {
    return updateObject(state, {
        textValue: action.value
    })
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_TEXT_VALUE:
            return updateTextValue(state, action);
    }
    return true;
};

export default reducer;