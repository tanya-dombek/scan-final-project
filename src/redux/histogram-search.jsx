import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { updateRequest } from "../utils/histogram-data";

const initialState = {
    isLoading: false,
    error: null,
    histogramData: null
}

export const histogramSearch = createAsyncThunk('objectsearch/histograms', async({token, searchData}) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const updatedRequest = updateRequest(searchData)
    const request = await axios.post(BASE_URL + '/objectsearch/histograms', updatedRequest, {headers});
    return request.data.data;
})

const histogramSlice = createSlice({
    name: 'histograms',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(histogramSearch.pending,(state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        .addCase(histogramSearch.fulfilled,(state, action) => {
            return {
                ...state,
                isLoading: false,
                histogramData: action.payload
            }
        })
        .addCase(histogramSearch.rejected,(state, action) => {
            state.isLoading = false;
            state.histogramData = null;
            state.error = action.error.message; 
            console.log(action.error.message);
        })
    }
})

export default histogramSlice.reducer;