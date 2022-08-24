import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "../models/IUserState";
import { IUser } from "../models/IUser";
import { changeTheme, login, logout, refresh, registration, setPreviousPage } from "./UserActionCreator";
import { IUserData } from "../models/IUserData";

const initialState: IUserState = {
    userData: {} as IUser,
    currentPage: 'stats',
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers:{},
    extraReducers:{
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled.type]: (state, action: PayloadAction<IUserData>) => {
            state.isLoading = false;
            state.userData = action.payload.user;
            state.error = '';
        },
        [login.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [registration.pending.type]: (state) => {
            state.isLoading = true;
        },
        [registration.fulfilled.type]: (state, action: PayloadAction<IUserData>) => {
            state.isLoading = false;
            state.userData = action.payload.user;
            state.error = '';
        },
        [registration.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [refresh.pending.type]: (state) => {
            state.isLoading = true;
        },
        [refresh.fulfilled.type]: (state, action: PayloadAction<IUserData>) => {
            state.isLoading = false;
            state.userData = action.payload.user;
            state.error = '';
        },
        [refresh.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [logout.pending.type]: (state) => {
            state.isLoading = true;
        },
        [logout.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.userData = {} as IUser;
            state.error = '';
        },
        [logout.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [setPreviousPage.pending.type]: (state) => {
            state.isLoading = true;
        },
        [setPreviousPage.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.currentPage = action.payload;
            state.error = '';
        },
        [setPreviousPage.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [changeTheme.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.userData = action.payload;
            state.error = '';
        },
        [changeTheme.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default userSlice.reducer