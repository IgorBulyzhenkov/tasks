import { createSlice } from "@reduxjs/toolkit";
import tasks from './task_s-operation';

const {
    getTasks,
    getOneTasks,
    createTasks,
    updateTasks,
    destroyTasks
} = tasks;

const initialState = {
    tasksData: [],
    title: '',
    description: "",
    is_completed: false,
    permission: false,
    userName: '',
    isError: null,
    isLoading: false,
    isRefreshing: false,
    id: null,
    created_at: null,
    limit: null,
    total_records: null,
    total_pages: null,
    current_page: null
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, {payload}) => {
                state.tasksData     = payload.data.data;
                state.userName      = '';
                state.isError       = null;
                state.isLoading     = true;
                state.isRefreshing  = false;
                state.total_records = payload.data.total;
                state.total_pages   = payload.data.total_pages;
                state.limit         = payload.data.limit;
                state.current_page  = payload.data.current_page;
            })
            .addCase(getTasks.rejected, (state, { payload } ) => {
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(getTasks.pending, (state) => {
                state.isError       = null;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })

        builder
            .addCase(getOneTasks.fulfilled, (state, {payload}) => {
                state.id            = payload.data.id;
                state.title         = payload.data.title;
                state.description   = payload.data.description;
                state.is_completed  = payload.data.is_completed;
                state.permission    = payload.data.permission;
                state.created_at    = payload.data.created_at;
                state.userName      = payload.data.user;
                state.isError       = null;
                state.isLoading     = true;
                state.isRefreshing  = false;
            })
            .addCase(getOneTasks.rejected, (state, { payload } ) => {
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(getOneTasks.pending, (state) => {
                state.isError       = null;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })

        builder
            .addCase(createTasks.fulfilled, (state, {payload}) => {
                state.id            = payload.data.id;
                state.title         = payload.data.title;
                state.description   = payload.data.description;
                state.is_completed  = payload.data.is_completed;
                state.permission    = payload.data.permission;
                state.created_at    = payload.data.created_at;
                state.userName      = payload.data.user;
                state.isError       = null;
                state.isLoading     = true;
                state.isRefreshing  = false;
            })
            .addCase(createTasks.rejected, (state, { payload } ) => {
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(createTasks.pending, (state) => {
                state.isError       = null;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })

        builder
            .addCase(updateTasks.fulfilled, (state, {payload}) => {
                state.id            = payload.data.id;
                state.title         = payload.data.title;
                state.description   = payload.data.description;
                state.is_completed  = payload.data.is_completed;
                state.permission    = payload.data.permission;
                state.created_at    = payload.data.created_at;
                state.userName      = payload.data.user;
                state.isError       = null;
                state.isLoading     = true;
                state.isRefreshing  = false;
            })
            .addCase(updateTasks.rejected, (state, { payload } ) => {
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(updateTasks.pending, (state) => {
                state.isError       = null;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })

        builder
            .addCase(destroyTasks.fulfilled, (state) => {
                state.id            = '';
                state.title         = '';
                state.description   = '';
                state.is_completed  = '';
                state.permission    = '';
                state.created_at    = '';
                state.userName      = '';
                state.isError       = null;
                state.isLoading     = true;
                state.isRefreshing  = false;
            })
            .addCase(destroyTasks.rejected, (state, { payload } ) => {
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(destroyTasks.pending, (state) => {
                state.isError       = null;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })
    }
});

export default tasksSlice.reducer;