import axiosHikingApp from "../../axios/axiosHikingApp";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCountryList = createAsyncThunk("addHiking/getCountryList",
    async() => {
        const requestBody = {
            method: "get",
            url: "settings/loadCountries/"
        };
      
        const response = await axiosHikingApp.get("settings/loadCountries");
        return {response: response.data};
});

export const fetchRegionList = createAsyncThunk("addHiking/getRegionList",
    async() => {
        const requestBody = {
            method: "get",
            url: "settings/loadRegions/"
        };
      
        const response = await axiosHikingApp.get("settings/loadRegions");
        return {response: response.data};
});

export const getSettings = createAsyncThunk("addHiking/getSettings",
    async() => {
        const response = await axiosHikingApp.get("settings/loadSettings");
        return {settings: response.data};
});

export const saveHikingData = createAsyncThunk("addHiking/saveHikingData",
async(hikingData) => {
    const requestBody = {
        method: "post",
        url: "data/saveHikingData",
        data: JSON.stringify(hikingData),
        headers: { "Content-Type" : "application/json" }
    };
    const response = await axiosHikingApp(requestBody);
    return {hikingData: response.data};
})