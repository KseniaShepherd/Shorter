import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const redirectToTarget = createAsyncThunk(
    'linkRedirect/redirectToTarget',
    async (key, {rejectWithValue}) => {
        try {
            const response = await axios.get(`https://front-test.hex.team/s/${key}`, {maxRedirects: 0});
            const url = response.headers['location']; // Обратите внимание, что заголовок должен быть в нижнем регистре
            return url; // Возвращаем URL
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const linkRedirectSlice = createSlice({
    name: 'linkRedirect',
    initialState: {
        redirecting: false,
        targetUrl: null,
        error: null,
    },
    reducers: {
        clearRedirectState(state) {
            state.redirecting = false;
            state.targetUrl = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(redirectToTarget.pending, (state) => {
                state.redirecting = true;
                state.targetUrl = null;
                state.error = null;
            })
            .addCase(redirectToTarget.fulfilled, (state, action) => {
                state.redirecting = false;
                state.targetUrl = action.payload.url;
                state.error = null;
            })
            .addCase(redirectToTarget.rejected, (state, action) => {
                state.redirecting = false;
                state.targetUrl = action.payload.url
                state.error = action.payload;
            });
    },
});

export const {clearRedirectState} = linkRedirectSlice.actions;

export default linkRedirectSlice.reducer;