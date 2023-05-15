import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    //baseURL: 'https://api.pasar-hemat.com',
});

export default instance;