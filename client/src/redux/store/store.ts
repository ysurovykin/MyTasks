import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userSlice } from "../reducers/UserSlice";
import { playlistAPI } from "../services/PlaylistService";
import { taskAPI } from "../services/TaskService";


const rootReducer = combineReducers({
    userSlice: userSlice.reducer,
    [playlistAPI.reducerPath]: playlistAPI.reducer,
    [taskAPI.reducerPath]: taskAPI.reducer

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(playlistAPI.middleware).concat(taskAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']