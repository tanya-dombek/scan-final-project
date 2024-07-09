import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const initialState = {
    isLoading: false,
    error: null
}

export const loginUser = createAsyncThunk('user/loginUser', async(user) => {
    const request = await axios.post(BASE_URL + '/account/login', user);
    return request.data
})

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending,(state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        .addCase(loginUser.fulfilled,(state, action) => {
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("expire", action.payload.expire);
            return {
                ...state,
                isLoading: false
            }
        })
        .addCase(loginUser.rejected,(state, action) => {
            state.isLoading = false;
            if (action.error.message === 'Request failed with status code 401') {
                state.error = 'Неправильное имя или пароль';
            } else {
                state.error = action.error.message; 
            }
            console.log(action.error.message);
        })
    }
})

export const { resetError } = loginSlice.actions;
export default loginSlice.reducer;