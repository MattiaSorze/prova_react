import { createSlice } from "@reduxjs/toolkit";
import { deleteHikingsData, getHikingsData } from "../../redux/services/getHikingsService";
import { toast } from 'react-toastify';
import "../../components/dashboard/hikingsTabs.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const initialState = {
    loading: false,
    hikingData: [],
    openCompHikingDetail: false,
    selectedHikingDetail: null,
    theme: new Date().getHours() >= 17 ? "dark" : "light",
    searchValue: "",
    searchField: "",
    filteredHikingData: []
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
        state.filteredHikingData = action.payload;
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
            state.hikingData = action.payload.hikingData;
            state.filteredHikingData = action.payload.hikingData.filter(elem => elem.status === "Completed" || elem.status === "Planned");
        })
        .addCase(getHikingsData.rejected, (state, action) => {
            state.loading = false;
        })
        .addCase(deleteHikingsData.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(deleteHikingsData.fulfilled, (state, action) => {
            state.loading = false;
            toast.success("Data Deleted!", {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-progress-bar", icon: <CheckCircleIcon className="toast-success-icon"/>, theme: "dark"});
        })
        .addCase(deleteHikingsData.rejected, (state, action) => {
            state.loading = false;
            toast.error("Error in deleting data: " +action.error, {position: toast.POSITION.BOTTOM_RIGHT, progressClassName:"toast-error-progress-bar", icon: <ErrorIcon className="toast-error-icon"/>, theme: "dark"});
        });
    }
});

export const {openComplHikingDetailDialog, closeComplHikingDetailDialog, selectHikingDetail, changeTheme, changeSearchValue, changeSearchField, updateFilteredHikingData} = complHikingsSlice.actions;
export default complHikingsSlice.reducer;