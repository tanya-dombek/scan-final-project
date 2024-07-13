import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/res-utils";
import { transformIdsData } from "../utils/documents-data"; 

const initialState = {
    isLoading: false,
    error: null,
    documents: null
}

export const documentsSearch = createAsyncThunk('documents', async ({ documentsData, countNumber }) => {
      const updatedRequest = transformIdsData(documentsData, countNumber);
      const request = await axiosInstance.post('/documents', updatedRequest);
      return request.data;
});

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(documentsSearch.pending,(state) => {
            return {
                ...state,
                isLoading: true
            }
        })
        .addCase(documentsSearch.fulfilled,(state, action) => {
            return {
                ...state,
                isLoading: false,
                documents: state.documents ? [...state.documents, ...action.payload.map(item => item.ok)] : action.payload.map(item => item.ok)
            }
        })
        .addCase(documentsSearch.rejected,(state, action) => {
            state.isLoading = false;
            state.documents = null;
            state.error = action.error.message; 
            console.log(action.error.message);
        })
    }
})

export default documentsSlice.reducer;