import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import {token} from "../axios";

const getTasks = createAsyncThunk('tasks/getTasks', async ({ page, limit } ,{rejectWithValue, getState}) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    try {
        const { data } = await axios.get('/tasks', {
            params: {
                page,
                limit
            }
        });
        return data;
    }catch(error) {
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

const getOneTasks = createAsyncThunk('tasks/getOneTasks', async ({ id }, {rejectWithValue, getState}) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    try {
        const { data } = await axios.get(`/tasks/${id}`);
        return data;
    }catch(error) {
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

const createTasks = createAsyncThunk('tasks/createTasks', async ({ name, description, is_completed, reset, setToggle }, {rejectWithValue, getState}) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    const body = {
        name,
        description,
        is_completed
    }

    try {
        const { data } = await axios.post(`/tasks/`, body);
        getToastSuccess('Create task s successfully!');

        setToggle(false);
        reset();

        return data;
    }catch(error) {
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

const updateTasks = createAsyncThunk('tasks/updateTasks', async ({ id, name, description, is_completed, reset }, {rejectWithValue, getState}) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    const body = {
        name,
        description,
        is_completed
    }

    try {
        const { data } = await axios.put(`/tasks/${id}`, body);
        getToastSuccess('Update task s successfully!');
        reset();
        return data;
    }catch(error) {
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

const destroyTasks = createAsyncThunk('tasks/destroyTasks', async ({ id } ,{rejectWithValue, getState}) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    try {
        const { data } = await axios.delete(`/tasks/${id}`);

        getToastSuccess('Deleted task s successfully!');

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

const tasks = {
    getTasks,
    getOneTasks,
    createTasks,
    updateTasks,
    destroyTasks
};

export default tasks;