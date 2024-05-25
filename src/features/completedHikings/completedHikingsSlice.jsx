import { createSlice } from "@reduxjs/toolkit";
import { deleteHikingsData, getHikingsData } from "../../redux/services/getHikingsService";
import {getSettings, saveHikingData} from "../../redux/services/addHikingsService";
import { toast } from 'react-toastify';
import "../../components/dashboard/hikingsTabs.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const initialState = {
    loading: false,
    hikingData: [],
    openCompHikingDetail: false,
    selectedHikingDetail: null,
    theme: new Date().getHours() >= 6 && new Date().getHours() <= 17 ? "light" : "dark",
    searchValue: "",
    searchField: "",
    filteredHikingData: [],
    zoomLevel: 1,
    hikingInfo: {
        name: "",
        region: "",
        country: "",
        status: "",
        hikingDate: null
    },
    settings: {
        regionList: [],
        countryList: [],
        statusList: []
    },
    totalDistance: 0
};

export const complHikingsSlice = createSlice({
  name: "complHikingsSlice",
  initialState: initialState,
  reducers: {
    openComplHikingDetailDialog: (state, action) => {
        state.openCompHikingDetail = true;
    },
    closeComplHikingDetailDialog: (state, action) => {
        state.openCompHikingDetail = false;
    },
    selectHikingDetail: (state, action) => {
        state.selectedHikingDetail = action.payload;
        state.openCompHikingDetail = true;
    },
    changeTheme: (state, action) => {
        state.theme = action.payload;
    },
    changeSearchValue: (state, action) => {
        state.searchValue = action.payload;
    },
    changeSearchField: (state, action) => {
        state.searchField = action.payload;
    },
    updateFilteredHikingData: (state, action) => {
        state.filteredHikingData = action.payload.filter(elem => elem.status === "Completed" || elem.status === "Planned" || elem.gpxData);
    },
    setZoomLevel: (state, action) => {
        state.zoomLevel = action.payload;
    },
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
        toast.success("Images Upload Done!", {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-progress-bar", icon: <CheckCircleIcon className="toast-success-icon"/>, className: "toast-message"});
    },
    imageUploadFailed: (state, action) => {
        toast.error("Images Upload Failed!", {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-error-progress-bar", icon: <ErrorIcon className="toast-error-icon"/>, className: "toast-message"});
    }
  },
  extraReducers: 
    builder => {
        builder
        .addCase(getHikingsData.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(getHikingsData.fulfilled, (state, action) => {
            state.loading = false;
            state.hikingData = action.payload.hikingData.filter(elem => elem.status === "Completed" || elem.status === "Planned" || elem.gpxData);
            state.filteredHikingData = action.payload.hikingData.filter(elem => elem.status === "Completed" || elem.status === "Planned" || elem.gpxData);
            /*state.totalDistance = action.payload.hikingData.filter(elem => elem.status === "Completed" || elem.status === "Planned" || elem.gpxData)
                                    .reduce((a, b) => (a.gpxData && b.gpxData ? a.gpxData.distance + b.gpxData.distance : 0), 0);*/
            let totalDistance = 0;
            for(let i = 0; i < state.filteredHikingData.length; ++i){
                totalDistance += state.filteredHikingData[i].gpxData.distance;
            }
            state.totalDistance = totalDistance.toFixed(2);
        })
        .addCase(getHikingsData.rejected, (state, action) => {
            state.loading = false;
        })
        .addCase(deleteHikingsData.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(deleteHikingsData.fulfilled, (state, action) => {
            state.loading = false;
            state.hikingData = action.payload.hikingData.filter(elem => elem.status === "Completed" || elem.status === "Planned" || elem.gpxData);
            state.filteredHikingData = action.payload.hikingData.filter(elem => elem.status === "Completed" || elem.status === "Planned" || elem.gpxData);
            let totalDistance = 0;
            for(let i = 0; i < state.filteredHikingData.length; ++i){
                totalDistance += state.filteredHikingData[i].gpxData.distance;
            }
            state.totalDistance = totalDistance.toFixed(2);
            toast.success("Data Deleted!", {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-progress-bar", icon: <CheckCircleIcon className="toast-success-icon"/>, className: "toast-message"});
        })
        .addCase(deleteHikingsData.rejected, (state, action) => {
            state.loading = false;
            toast.error("Error in deleting data: " +action.error, {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-error-progress-bar", icon: <ErrorIcon className="toast-error-icon"/>, className: "toast-message"});
        })
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
            //state.loading = true;
            state.loading = false;
        })
        .addCase(saveHikingData.fulfilled, (state, action) => {
            state.loading = false;
            state.hikingInfo = initialState.hikingInfo;
            state.hikingData = action.payload.hikingData.filter(elem => elem.status === "Completed" || elem.status === "Planned" || elem.gpxData);
            state.filteredHikingData = action.payload.hikingData.filter(elem => elem.status === "Completed" || elem.status === "Planned" || elem.gpxData);
            let totalDistance = 0;
            for(let i = 0; i < state.filteredHikingData.length; ++i){
                totalDistance += state.filteredHikingData[i].gpxData.distance;
            }
            state.totalDistance = totalDistance.toFixed(2);
            toast.success("Data Saved!", {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-progress-bar", icon: <CheckCircleIcon className="toast-success-icon"/>, className: "toast-message"});
        })
        .addCase(saveHikingData.rejected, (state, action) => {
            state.loading = false;
            toast.error("Error in saving data: " +action.error, {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-error-progress-bar", icon: <ErrorIcon className="toast-error-icon"/>, className: "toast-message"});
        })
    }
});

export const {openComplHikingDetailDialog, closeComplHikingDetailDialog, selectHikingDetail, changeTheme, changeSearchValue, changeSearchField, updateFilteredHikingData, setZoomLevel,
    updateHikingInfo, clearHikingInfo, fileParsingFinished, fileParsingFailed, imageUploadFinished, imageUploadFailed
} = complHikingsSlice.actions;
export default complHikingsSlice.reducer;