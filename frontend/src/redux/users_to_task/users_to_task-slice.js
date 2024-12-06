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
    isError: false,
    isRefreshing: false
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: ( builder) => {
        builder
            .addCase(searchUsers.fulfilled, (state, {payload}) => {
                state.usersData     = payload.data;
                state.isError       = false;
                state.isLoading     = true;
                state.isRefreshing  = false;
            })
            .addCase(searchUsers.rejected, (state, {payload}) => {
                state.usersData     = [];
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(searchUsers.pending, (state) => {
                state.usersData     = [];
                state.isError       = false;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })

        builder
            .addCase(getUsersList.fulfilled, (state, {payload}) => {
                state.usersData     = payload.data;
                state.isError       = false;
                state.isLoading     = true;
                state.isRefreshing  = false;
            })
            .addCase(getUsersList.rejected, (state, {payload}) => {
                state.usersData     = [];
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(getUsersList.pending, (state) => {
                state.usersData     = [];
                state.isError       = false;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })

        builder
            .addCase(bindUserToTask.fulfilled, (state) => {
                state.isError       = false;
                state.isLoading     = true;
                state.isRefreshing  = false;
            })
            .addCase(bindUserToTask.rejected, (state, {payload}) => {
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(bindUserToTask.pending, (state) => {
                state.isError       = false;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })
    }
});

export default usersSlice.reducer;