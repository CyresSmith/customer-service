import { createAsyncThunk } from "@reduxjs/toolkit";
import usersApi from "../../services/usersApi";
import { State } from "hooks/useForm";
import handleError from "helpers/errorHandler";
import { User } from "./types";

const register = createAsyncThunk<{verify: boolean} | undefined, State, {rejectValue: string}>('users/register', async (userData, {rejectWithValue}) => {
    try {
        return await usersApi.register(userData);
    } catch (error) {
        const errorMessage = handleError(error);
        console.log(errorMessage);
        return rejectWithValue(errorMessage);
    }
});

const verify = createAsyncThunk<User, State, {rejectValue: string}>('users/verify', async (code, {rejectWithValue}) => {
    try {
        return await usersApi.verify(code);
    } catch (error) {
        const errorMessage = handleError(error)
        console.log(errorMessage);
        return rejectWithValue(errorMessage);
    }
});

const login = createAsyncThunk<User, State, {rejectValue: string}>('users/login', async (usersData, {rejectWithValue}) => {
    try {
        return await usersApi.login(usersData);
    } catch (error) {
        const errorMessage = handleError(error)
        console.log(errorMessage);
        return rejectWithValue(errorMessage);
    }
});

const current = createAsyncThunk<User, undefined, {rejectValue: string}>('users/current', async (_, {rejectWithValue}) => {
    try {
        return await usersApi.current();
    } catch (error) {
        const errorMessage = handleError(error)
        console.log(errorMessage);
        return rejectWithValue(errorMessage);
    }
});

const logout = createAsyncThunk<boolean, undefined, {rejectValue: string}>('users/logout', async (_, {rejectWithValue}) => {
    try {
        return await usersApi.logout();
    } catch (error) {
        const errorMessage = handleError(error)
        console.log(errorMessage);
        return rejectWithValue(errorMessage);
    }
});

const usersOperations = {
    register,
    verify,
    login,
    current,
    logout
};

export default usersOperations;