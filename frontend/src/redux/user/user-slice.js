import {createSlice} from "@reduxjs/toolkit";
import user from "./user-operation";

const {
    regUser,
    sendEmailAgain,
    verifyEmailUser,
    logOutUser,
    login
} = user;

const initialState = {
    name: null,
    nickName: null,
    email: null,
    verify: false,
    token: null,
    isLoggedIn: false,
    error: null,
    isRefreshing: false,
    verificationToken: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(regUser.fulfilled, (state, {payload}) => {
                state.name                  = payload.data.name;
                state.nickName              = payload.data.nickName;
                state.email                 = payload.data.email;
                state.token                 = null;
                state.isLoggedIn            = false;
                state.isRefreshing          = false;
                state.verificationToken     = payload.data.verificationToken;
            })
            .addCase(regUser.rejected, (state, {payload}) => {
                state.error                 = payload?.error || "An unknown error occurred";
                state.isRefreshing          = false;
            })
            .addCase(regUser.pending, (state) => {
                state.error                 = null;
                state.isRefreshing          = true;
            });

        builder
            .addCase(sendEmailAgain.fulfilled, (state, {payload}) => {
                state.verificationToken     = payload.data.verificationToken;
            })
            .addCase(sendEmailAgain.rejected, (state, {payload}) => {
                state.error                 = payload?.error || "An unknown error occurred";
                state.isRefreshing          = false;
            })
            .addCase(sendEmailAgain.pending, (state) => {
                state.error                 = null;
                state.isRefreshing          = true;
            })

        builder
            .addCase(verifyEmailUser.fulfilled, (state, {payload}) => {
                state.name                  = payload.data.data.name;
                state.nickName              = payload.data.data.nickName;
                state.email                 = payload.data.data.email;
                state.verificationToken     = null;
                state.isRefreshing          = false;
                state.token                 = payload.data.data.token;
                state.verify                = payload.data.data.verify;
                state.isLoggedIn            = true;
            })
            .addCase(verifyEmailUser.rejected, (state, {payload}) => {
                state.error                 = payload?.error || "An unknown error occurred";
                state.isRefreshing          = false;
            })
            .addCase(verifyEmailUser.pending, (state) => {
                state.error                 = null;
                state.isRefreshing          = true;
            })

        builder
            .addCase(logOutUser.fulfilled, (state) => {
                state.name                  = null;
                state.nickName              = null;
                state.email                 = null;
                state.verificationToken     = null;
                state.isRefreshing          = false;
                state.token                 = null;
                state.verify                = false;
                state.isLoggedIn            = false;
            })
            .addCase(logOutUser.rejected, (state, {payload}) => {
                state.error                 = payload?.error || "An unknown error occurred";
                state.isRefreshing          = false;
            })
            .addCase(logOutUser.pending, (state) => {
                state.error                 = null;
                state.isRefreshing          = true;
            });

        builder
            .addCase(login.fulfilled, (state, {payload})=> {
                state.name                  = payload.data.data.name;
                state.nickName              = payload.data.data.nickName;
                state.email                 = payload.data.data.email;
                state.isRefreshing          = false;
                state.token                 = payload.data.data.token;
                state.verify                = payload.data.data.verify;
                state.isLoggedIn            = true;
            })
            .addCase(login.rejected, (state, {payload})=> {
                state.error                 = payload?.error || "An unknown error occurred";
                state.isRefreshing          = false;
            })
            .addCase(login.pending, (state) => {
                state.error                 = null;
                state.isRefreshing          = true;
            });
    }
});

export default userSlice.reducer;