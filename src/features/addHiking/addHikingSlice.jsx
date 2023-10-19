import { createSlice } from "@reduxjs/toolkit";
import { fetchCountryList, fetchRegionList, getSettings, saveHikingData } from "../../redux/services/addHikingsService";
import { toast } from 'react-toastify';
import "../../components/dashboard/addHiking.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const initialState = {
    hikingInfo: {
        name: "",
        region: "",
        country: "",
        status: "",
        hikingDate: null
    },
    loading: false,
    settings: {
        regionList: [],
        countryList: [],
        statusList: []
    },
    hikingData: []
};

export const addHikingSlice = createSlice({
    name: "addHikingSlice",
    initialState: initialState,
    reducers: {
        updateHikingInfo: (state, action) => {
            let propertyName = action.payload.propertyName;
            let value = action.payload.value;
            state.hikingInfo[propertyName] = value;
        },
        clearHikingInfo: (state, action) => {
            state.hikingInfo = initialState.hikingInfo;
        },
        fileParsingFinished: (state, action) => {
            toast.success("GPX File Parsing Done!", {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-progress-bar", icon: <CheckCircleIcon className="toast-success-icon"/>, className: "toast-message"});
        },
        fileParsingFailed: (state, action) => {
            toast.error("GPX File Parsing Failed!", {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-error-progress-bar", icon: <ErrorIcon className="toast-error-icon"/>, className: "toast-message"});
        },
        imageUploadFinished: (state, action) => {
            toast.success("Image Upload Done!", {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-progress-bar", icon: <CheckCircleIcon className="toast-success-icon"/>, className: "toast-message"});
        },
        imageUploadFailed: (state, action) => {
            toast.error("Image Upload Failed!", {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-error-progress-bar", icon: <ErrorIcon className="toast-error-icon"/>, className: "toast-message"});
        },
    },
    extraReducers:
        builder => {
            builder
                .addCase(getSettings.pending, (state, action) => {
                    state.loading = true;
                })
                .addCase(getSettings.fulfilled, (state, action) => {
                    state.loading = false;
                    state.settings = action.payload.settings;
                })
                .addCase(getSettings.rejected, (state, action) => {
                    state.loading = false;
                })
                .addCase(saveHikingData.pending, (state, action) => {
                    state.loading = true;
                })
                .addCase(saveHikingData.fulfilled, (state, action) => {
                    state.loading = false;
                    state.hikingInfo = initialState.hikingInfo;
                    toast.success("Data Saved!", {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-progress-bar", icon: <CheckCircleIcon className="toast-success-icon"/>, className: "toast-message"});
                })
                .addCase(saveHikingData.rejected, (state, action) => {
                    state.loading = false;
                    toast.error("Error in saving data: " +action.error, {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-error-progress-bar", icon: <ErrorIcon className="toast-error-icon"/>, className: "toast-message"});
                })
        }
});

export const {updateHikingInfo, clearHikingInfo, fileParsingFinished, fileParsingFailed, imageUploadFinished, imageUploadFailed} = addHikingSlice.actions;
export default addHikingSlice.reducer;