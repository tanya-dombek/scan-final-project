import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import {  updateRequest } from "../utils/histogram-data";

const initialState = {
    isLoading: false,
    error: null,
    objectSearchData: null
}

export const objectSearch = createAsyncThunk('objectsearch', async({token, searchData}) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const updatedRequest = updateRequest(searchData)
    const request = await axios.post(BASE_URL + '/objectsearch', updatedRequest, {headers});
    return request.data.items;
})

const objectSearchSlice = createSlice({
    name: 'objectSearch',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(objectSearch.pending,(state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        .addCase(objectSearch.fulfilled,(state, action) => {
            return {
                ...state,
                isLoading: false,
                objectSearchData: action.payload
            }
        })
        .addCase(objectSearch.rejected,(state, action) => {
            state.isLoading = false;
            state.objectSearchData = null;
            state.error = action.error.message; 
            console.log(action.error.message);
        })
    }
})

export default objectSearchSlice.reducer;