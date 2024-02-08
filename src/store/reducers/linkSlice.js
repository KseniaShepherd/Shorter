import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    error: null,
    shortLink: null,
    userLinksStats: [],
    totalCount: null
};

export const squeezeLink = createAsyncThunk('link/squeezeLink', async ({ link }, { getState, dispatch }) => {
    try {
        const state = getState();
        const accessToken = state.auth.accessToken;

        const response = await axios.post(
            `https://front-test.hex.team/api/squeeze?link=${link}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        if (response.status === 200) {
            dispatch(getUserStatistics({ order:'asc_short', offset: 0, limit: 5 }));
        }

        return response.data;
    } catch (error) {
        return { error: error.response.data };
    }
});

export const getUserStatistics = createAsyncThunk(
    'link/getUserStatistics',
    async ({ order, offset, limit }, { getState }) => {
        try {
            const state = getState();
            const accessToken = state.auth.accessToken;

            const response = await axios.get(
                `https://front-test.hex.team/api/statistics`,
                {
                    params: { order, offset, limit },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const totalCount = response.headers['x-total-count'];
            return { data: response.data, totalCount };
        } catch (error) {
            return { error: error.response.data };
        }
    }
);

const linkSlice = createSlice({
    name: 'link',
    initialState,
    reducers: {
        setOrder(state, action) {
            state.order = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(squeezeLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(squeezeLink.fulfilled, (state, action) => {
                if (action.payload.error && action.payload.error.detail === "token not found/has been expired") {
                    state.loading = false;
                    state.error = "Unauthorized";
                } else {
                    state.loading = false;
                    state.shortLink = action.payload.shortLink;
                }
            })
            .addCase(squeezeLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error.detail;
            })
            .addCase(getUserStatistics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserStatistics.fulfilled, (state, action) => {
                state.loading = false;
                state.userLinksStats = action.payload.data;
                state.totalCount = action.payload.totalCount; // Присваиваем значение totalCount из payload
            })
            .addCase(getUserStatistics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setOrder } = linkSlice.actions;

export default linkSlice.reducer;