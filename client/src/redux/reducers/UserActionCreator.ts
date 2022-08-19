import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api, { API_URL } from "../../http/index";
import { IUserData } from "../models/IUserData";

export const login = createAsyncThunk(
    'user/login',
    async (user: { email: string, password: string }, thunkApi) => {
        try {
            const response = await api.post<IUserData>(`${API_URL}/user/login`, user);
            localStorage.setItem('token', response.data.accessToken)
            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)
export const registration = createAsyncThunk(
    'user/registration',
    async (user: { email: string, password: string, name: string }, thunkApi) => {
        try {
            const response = await api.post<IUserData>(`${API_URL}/user/registration`, user);
            localStorage.setItem('token', response.data.accessToken)
            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)
export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkApi) => {
        try {
            await api.post(`${API_URL}/user/logout`);
            localStorage.removeItem('token')
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)
export const refresh = createAsyncThunk(
    'user/refresh',
    async (_, thunkApi) => {
        try {
            const response = await api.get<IUserData>("http://localhost:5000/api/user/refresh", { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken)
            return response.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)