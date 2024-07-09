import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const initialState = {
    isLoading: false,
    info: {usedCompanyCount: 0, companyLimit: 0},
    error: null
}

export const getUserInfo = createAsyncThunk('user/userInfo', async(token) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    const request = await axios.get(BASE_URL + '/account/info', {headers});
    return request.data
})

const getUserInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getUserInfo.pending,(state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        .addCase(getUserInfo.fulfilled,(state, action) => {
            return {
                ...state,
                isLoading: false,
                info: action.payload.eventFiltersInfo
            }
        })
        .addCase(getUserInfo.rejected,(state, action) => {
            console.log(action.error.message);
            return {
                ...state,
                error: action.error.message,
                info: initialState.info
            }
        })
    }
})

export default getUserInfoSlice.reducer;