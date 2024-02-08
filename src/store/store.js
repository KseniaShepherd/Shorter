import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {createLogger} from 'redux-logger';
import authSlice from "./reducers/authSlice";
import linkSlice from "./reducers/linkSlice";
import linkRedirectSlice from "./reducers/linkRedirectSlice";

const logger = createLogger();

const rootReducer = combineReducers({
    auth: authSlice,
    link: linkSlice,
    linkRedirect: linkRedirectSlice
});

export const setupStore = () => {
    const store = configureStore({
        devTools: true,
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    });

    return {store};
}