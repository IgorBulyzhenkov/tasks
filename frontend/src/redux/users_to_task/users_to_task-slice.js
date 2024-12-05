import { createSlice } from "@reduxjs/toolkit";
import users from './users_to_task-operation';

const {
    searchUsers,
    getUsersList,
    bindUserToTask
} = users;

const initialState = {
    usersData: [],
    isLoading: false,
    isError: false
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: ( builder) => {
        builder
            .addCase(searchUsers.fulfilled, (state, {payload}) => {
                state.usersData     = payload.data.data;
                state.isError       = false;
                state.isLoading     = true;
            })
            .addCase(searchUsers.rejected, (state, {payload}) => {
                state.usersData     = [];
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
            })
            .addCase(searchUsers.pending, (state) => {
                state.usersData     = [];
                state.isError       = false;
                state.isLoading     = false;
            })

        builder
            .addCase(getUsersList.fulfilled, (state, {payload}) => {
                state.usersData     = payload.data.data;
                state.isError       = false;
                state.isLoading     = true;
            })
            .addCase(getUsersList.rejected, (state, {payload}) => {
                state.usersData     = [];
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
            })
            .addCase(getUsersList.pending, (state) => {
                state.usersData     = [];
                state.isError       = false;
                state.isLoading     = false;
            })

        builder
            .addCase(bindUserToTask.fulfilled, (state) => {
                state.usersData     = [];
                state.isError       = false;
                state.isLoading     = true;
            })
            .addCase(bindUserToTask.rejected, (state, {payload}) => {
                state.usersData     = [];
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
            })
            .addCase(bindUserToTask.pending, (state) => {
                state.usersData     = [];
                state.isError       = false;
                state.isLoading     = false;
            })
    }
});

export default usersSlice.reducer;