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
        toast.success(`User ${name} added successfully.`    , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        return data;

    }catch(error){
        toast.error(error.response.data.errors   , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        return rejectWithValue(error.response.data.errors);
    }
});

const sendEmailAgain = createAsyncThunk('user/sandEmailAgain', async ({email}, {rejectWithValue}) => {
    const body = {email}

    try{
        const data = await axios.post('/auth/send-again', body);

        toast.success('Email sent successfully.'    , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        return data;
    }catch(error){
        toast.error(error.response.data.errors   , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        return rejectWithValue(error.response.data.errors);
    }
})

const verifyEmailUser = createAsyncThunk('user/verifyEmail', async ({verification_token}, {rejectWithValue}) => {
    const body = {verification_token}

    try{
        const data = await axios.post('/auth/verify-email', body);

        toast.success('Verification email successfully.'    , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        return data;
    }catch(error){
        toast.error(error.response.data.errors   , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        return rejectWithValue(error.response.data.errors);
    }
})

const logOutUser = createAsyncThunk('user/logOut', async (_, {rejectWithValue}) => {
    try{
        const data = await axios.get('/logout');

        toast.success('Logout successfully.'    , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        return data;
    }catch(error){
        toast.error(error.response.data.errors   , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        return rejectWithValue(error.response.data.errors);
    }
});

const user  = {
    regUser,
    sendEmailAgain,
    verifyEmailUser,
    logOutUser
}

export default user;