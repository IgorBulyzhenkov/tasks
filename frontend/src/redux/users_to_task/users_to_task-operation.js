import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import axios from "axios";
import { token } from '../axios';

const searchUsers = createAsyncThunk('users_to_task/searchUsers', async ({ name }, { rejectWithValue, getState }) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    try {
        const { data } = await axios.get('/users/search', {
            params: {
                name
            }
        });

        if(data.data.length === 0){
            getToastSuccess('User not find!');
        }

        return data;
    }catch(error) {
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

const getUsersList = createAsyncThunk('users_to_task/getUsersList', async ({ fk_task_list }, { rejectWithValue, getState }) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    const { data } = await axios.get('/users', {
        params: {
            fk_task_list
        }
    });

    if(data.data.length === 0){
        getToastSuccess('User not find!');
    }

    return data;
})

const bindUserToTask = createAsyncThunk('users_to_task/bindUserToTask', async ({ fk_user, fk_task_list, permission }, { rejectWithValue, getState }) => {
    const state = getState();
    const persistorToken = state.user.token;
    if (persistorToken !== null ) token.set(persistorToken);

    const body = {
        fk_user,
        fk_task_list,
        permission
    };
    try {
        const { data } = await axios.post('/users/bind', body);

        if(data.data.message){
            getToastSuccess(data.data.message);
        }

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

const users  = {
    searchUsers,
    getUsersList,
    bindUserToTask
}

export default users;