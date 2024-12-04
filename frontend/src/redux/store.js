import {configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import userSlice from "./user/user-slice";
import taskList from "./task_list/task_list-slice";

const userPersistor = {
    key: "user",
    storage,
    whitelist: ["token", "email", "name", "nickName", "verify", "verificationToken", "isLoggedIn"],
};

const store = configureStore({
    reducer: {
        user: persistReducer(userPersistor, userSlice),
        task_list: taskList
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }).concat(logger),
    devTools: process.env.NODE_ENV === "development",
});

const persistor = persistStore(store);

const storeContacts = { store, persistor };

export default storeContacts;