import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import {token} from "../axios";

const getTaskList = createAsyncThunk('taskList/getTaskList', async ({ page, limit } ,{rejectWithValue, getState}) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    try {
        const { data } = await axios.get('/task-list', {
            params: {
                page,
                limit
            }
        });

        if(data.data.length === 0){
            getToastSuccess('No tasks!');
        }

        return data;
    }catch(error) {
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

const getOneTaskList = createAsyncThunk('taskList/getOneTaskList', async ({ id }, {rejectWithValue, getState}) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    try {
        const { data } = await axios.get(`/task-list/${id}`);
        return data;
    }catch(error) {
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

const createTaskList = createAsyncThunk('taskList/createTaskList', async ({ name, description, is_completed, reset, setToggle }, {rejectWithValue, getState}) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    const body = {
        name,
        description,
        is_completed
    }

    try {
        const { data } = await axios.post(`/task-list/`, body);
        getToastSuccess('Create task list successfully!');

        setToggle(false);
        reset();

        return data;
    }catch(error) {
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

const updateTaskList = createAsyncThunk('taskList/updateTaskList', async ({ id, name, description, is_completed, reset }, {rejectWithValue, getState}) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    const body = {
        name,
        description,
        is_completed
    }

    try {
        const { data } = await axios.put(`/task-list/${id}`, body);
        getToastSuccess('Update task list successfully!');
        reset();
        return data;
    }catch(error) {
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

const destroyTaskList = createAsyncThunk('taskList/destroyTaskList', async ({ id } ,{rejectWithValue, getState}) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    try {
        const { data } = await axios.delete(`/task-list/${id}`);

        getToastSuccess('Deleted task list successfully!');

        return data;
    }catch(error) {
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

function getCheckoutError(error){
    if(error.response.data.errors){
        for (const e in error.response.data.errors) {
            error.response.data.errors[e].map(item => getToastError(item));
        }
    }else{
        getToastError(error.response.data.error);
    }

    if(error.response.data.message){
        getToastError(error.response.data.message);
    }
}

function getToastError(message){
    toast.error( message  , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

function getToastSuccess(message){
    toast.success( message   , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

const taskList = {
    getTaskList,
    getOneTaskList,
    createTaskList,
    updateTaskList,
    destroyTaskList
};

export default taskList;