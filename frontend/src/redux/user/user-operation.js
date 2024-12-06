import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import axios from "axios";
import { token } from '../axios';

const regUser = createAsyncThunk('user/regUser', async ({name, nickName, email, password, reset}, {rejectWithValue}) => {
    const body = {
        name, nickName, email, password
    };

    try {
        const { data } = await axios.post('/auth/signup', body);
        reset();
        getToastSuccess(`User ${name} added successfully.`);
        return data;
    }catch(error){
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

const sendEmailAgain = createAsyncThunk('user/sandEmailAgain', async ({email}, {rejectWithValue}) => {
    const body = {email}

    try{
        const data = await axios.post('/auth/send-again', body);
        getToastSuccess('Email sent successfully.' );
        return data;
    }catch(error){
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
})

const verifyEmailUser = createAsyncThunk('user/verifyEmail', async ({verification_token}, {rejectWithValue}) => {
    const body = {verification_token}

    try{
        const data = await axios.post('/auth/verify-email', body);
        getToastSuccess('Verification email successfully.')
        token.set(data.data.token);
        return data;
    }catch(error){
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
})

const login = createAsyncThunk('user/login', async ({email, password, reset}, {rejectWithValue}) => {
    const body = {
        email,
        password
    }
    try{
        const data = await axios.post('/auth/login', body);
        getToastSuccess(`Welcome ${data.data.data.nickName}`);
        reset();
        token.set(data.data.token);
        return data;
    }catch(error){
        getCheckoutError(error);
        return rejectWithValue(error.response.data.error);
    }
});

const logOutUser = createAsyncThunk('user/logOut', async (_, {getState, rejectWithValue}) => {
    try{
        const state = getState();

        const persistorToken = state.user.token;
        if (persistorToken !== null ) token.set(persistorToken);

        const data = await axios.get('/logout');
        getToastSuccess('Logout successfully.' )
        token.unset();
        return data;
    }catch(error){

        getCheckoutError(error);

        return rejectWithValue(error.response.data.errors);
    }
});

const getCurrentUser = createAsyncThunk('user/getCurrentUser', async (_, {getState, rejectWithValue}) => {
    try{
        const state = getState();
        const persistorToken = state.user.token;
        if (persistorToken !== null ) token.set(persistorToken);

        const data = await axios.get('/current-user');
        token.unset();

        return data;
    }catch(error){

        getCheckoutError(error);

        return rejectWithValue(error.response.data.errors);
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

const user  = {
    regUser,
    sendEmailAgain,
    verifyEmailUser,
    logOutUser,
    login,
    getCurrentUser
}

export default user;