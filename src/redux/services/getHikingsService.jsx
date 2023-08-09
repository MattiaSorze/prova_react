import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHikingApp from "../../axios/axiosHikingApp";

export const getHikingsData = createAsyncThunk("getHiking/getHikingData",
    async() => {
        const response = await axiosHikingApp.get("data/loadHikingData");
        return {hikingData: response.data};
});

export const deleteHikingsData = createAsyncThunk("deleteHiking/deleteHikingData",
async(id, {dispatch}) => {
    console.log(id);
    const response = await axiosHikingApp.post("data/deleteHikingDataFromId/" +id);
    dispatch(getHikingsData());
    return response.data;
})