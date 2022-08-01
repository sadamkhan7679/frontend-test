import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import {User} from "../../types";




export interface AuthState {
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'failed';
    user: User | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    status: 'idle',
    user: null,
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{token: string, user: User}>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },

        logout : (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})

// Actions
export const {login, logout} = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;

