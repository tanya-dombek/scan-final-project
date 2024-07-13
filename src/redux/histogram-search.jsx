import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateRequest } from "../utils/histogram-data";
import { axiosInstance } from "../utils/res-utils";

const initialState = {
    isLoading: false,
    error: null,
    histogramData: null
}

export const histogramSearch = createAsyncThunk('objectsearch/histograms', async ({ searchData }) => {
    const updatedRequest = updateRequest(searchData);
    const request = await axiosInstance.post('/objectsearch/histograms', updatedRequest);
    return request.data.data;
});

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