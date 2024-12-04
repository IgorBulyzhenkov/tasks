import { createSlice } from "@reduxjs/toolkit";
import taskList from './task_list-operation';

const {
    getTaskList,
    getOneTaskList,
    createTaskList,
    updateTaskList,
    destroyTaskList
} = taskList;

const initialState = {
    taskListData: [],
    name: '',
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

const taskListSlice = createSlice({
    name: "taskList",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getTaskList.fulfilled, (state, {payload}) => {
                state.taskListData  = payload.data.data;
                state.userName      = '';
                state.isError       = null;
                state.isLoading     = true;
                state.isRefreshing  = false;
                state.total_records = payload.data.total;
                state.total_pages   = payload.data.total_pages;
                state.limit         = payload.data.limit;
                state.current_page  = payload.data.current_page;

                console.log(payload.data)
            })
            .addCase(getTaskList.rejected, (state, { payload } ) => {
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(getTaskList.pending, (state) => {
                state.isError       = null;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })

        builder
            .addCase(getOneTaskList.fulfilled, (state, {payload}) => {
                state.id            = payload.data.id;
                state.name          = payload.data.name;
                state.description   = payload.data.description;
                state.is_completed  = payload.data.is_completed;
                state.permission    = payload.data.permission;
                state.created_at    = payload.data.created_at;
                state.userName      = payload.data.user;
                state.isError       = null;
                state.isLoading     = true;
                state.isRefreshing  = false;
            })
            .addCase(getOneTaskList.rejected, (state, { payload } ) => {
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(getOneTaskList.pending, (state) => {
                state.isError       = null;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })

        builder
            .addCase(createTaskList.fulfilled, (state, {payload}) => {
                state.id            = payload.data.id;
                state.name          = payload.data.name;
                state.description   = payload.data.description;
                state.is_completed  = payload.data.is_completed;
                state.permission    = payload.data.permission;
                state.created_at    = payload.data.created_at;
                state.userName      = payload.data.user;
                state.isError       = null;
                state.isLoading     = true;
                state.isRefreshing  = false;
            })
            .addCase(createTaskList.rejected, (state, { payload } ) => {
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(createTaskList.pending, (state) => {
                state.isError       = null;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })

        builder
            .addCase(updateTaskList.fulfilled, (state, {payload}) => {
                state.id            = payload.data.id;
                state.name          = payload.data.name;
                state.description   = payload.data.description;
                state.is_completed  = payload.data.is_completed;
                state.permission    = payload.data.permission;
                state.created_at    = payload.data.created_at;
                state.userName      = payload.data.user;
                state.isError       = null;
                state.isLoading     = true;
                state.isRefreshing  = false;
            })
            .addCase(updateTaskList.rejected, (state, { payload } ) => {
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(updateTaskList.pending, (state) => {
                state.isError       = null;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })

        builder
            .addCase(destroyTaskList.fulfilled, (state, {payload}) => {
                state.id            = '';
                state.name          = '';
                state.description   = '';
                state.is_completed  = '';
                state.permission    = '';
                state.created_at    = '';
                state.userName      = '';
                state.isError       = null;
                state.isLoading     = true;
                state.isRefreshing  = false;
            })
            .addCase(destroyTaskList.rejected, (state, { payload } ) => {
                state.isError       = payload?.error || "An unknown error occurred";
                state.isLoading     = false;
                state.isRefreshing  = false;
            })
            .addCase(destroyTaskList.pending, (state) => {
                state.isError       = null;
                state.isLoading     = false;
                state.isRefreshing  = true;
            })
    }
});

export default taskListSlice.reducer;