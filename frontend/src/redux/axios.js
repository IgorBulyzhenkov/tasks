import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1';
axios.defaults.headers.common['Accept'] = 'application/json';

export const token = {
    set(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common['Authorization'] = "";
    }
};
