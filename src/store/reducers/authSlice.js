import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    loading: false,
    error: null,
    accessToken: null,
    isLoggedIn: false,
};

export const registerUser = createAsyncThunk('auth/registerUser', async ({username, password}, {rejectWithValue}) => {
    try {
        const response = await axios.post(`https://front-test.hex.team/api/register?username=${username}&password=${password}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data); // Возвращаем только данные ошибки
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({username, password}) => {
    try {
        const response = await axios.post(`https://front-test.hex.team/api/login`, {username, password});
        return response.data;
    } catch (error) {
        return {error: error.response.data};
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.accessToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true; // Добавлено обновление для успешной регистрации
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                if (action.payload.detail.includes("already exists")) {
                    state.error = "Пользователь с таким именем уже существует";
                } else {
                    state.error = action.payload.detail;
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.access_token;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;