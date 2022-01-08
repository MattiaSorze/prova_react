import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../utility/utility";

const initialState = {
    docInfo: null,
    loading: false
};

const updateDocInfo = (state, action) => {
    return updateObject(state, {
        docInfo: {...action.docInfo}
    })
};

const loadingStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const loadingEnd = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_DOC_INFO:
            return updateDocInfo(state, action);
        case actionTypes.LOADING_START:
            return loadingStart(state, action);
        case actionTypes.LOADING_END:
            return loadingEnd(state, action);
    }
    return true;
};

export default reducer;