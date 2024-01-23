import { createSlice } from "@reduxjs/toolkit";
import usersOperations from "./usersOperations";
import { UsersState } from "./types";

const initialState: UsersState = {
    user: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
    verify: undefined
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(usersOperations.register.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(usersOperations.register.fulfilled, (state, {payload}) => {
                state.verify = payload?.verify;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(usersOperations.register.rejected, (state, {payload}) => {
                state.isLoading = false;
                state.error = payload
            })
            .addCase(usersOperations.verify.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(usersOperations.verify.fulfilled, (state, {payload}) => {
                state.user = payload;
                state.verify = payload.verify;
                state.isLoggedIn = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(usersOperations.verify.rejected, (state, {payload}) => {
                state.isLoggedIn = false;
                state.isLoading = false;
                state.error = payload
            })
            .addCase(usersOperations.login.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(usersOperations.login.fulfilled, (state, {payload}) => {
                state.user = payload;
                state.verify = payload.verify;
                state.isLoggedIn = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(usersOperations.login.rejected, (state, {payload}) => {
                state.isLoggedIn = false;
                state.isLoading = false;
                state.error = payload
            })
            .addCase(usersOperations.current.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(usersOperations.current.fulfilled, (state, {payload}) => {
                state.user = payload;
                state.verify = payload.verify;
                state.isLoggedIn = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(usersOperations.current.rejected, (state, {payload}) => {
                state.isLoggedIn = false;
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(usersOperations.logout.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(usersOperations.logout.fulfilled, (state, {payload}) => {
                if (payload) {
                    state.error = null;
                    state.user = null;
                    state.isLoading = false;
                    state.isLoggedIn = false;
                }
            })
            .addCase(usersOperations.logout.rejected, (state, {payload}) => {
                state.isLoggedIn = false;
                state.isLoading = false;
                state.error = payload;
            })
    }
});

export default usersSlice.reducer;