import axios from 'axios';
import {config} from "../config";
import {userToken } from './auth';

const baseURL = config.BASE_API_URL;

let headers ={
    'Content-Type': 'application/json',
};
let multipartHeaders ={
    'Content-Type': 'multipart/form-data',
};
if(userToken){
    headers.Authorization = `Bearer ${userToken}`; 
    multipartHeaders.Authorization = `Bearer ${userToken}`; 
}

const axiosWithToken = axios.create({
    baseURL:baseURL,
    headers,
});
const axiosWithoutToken = axios.create({
    baseURL:baseURL,
});

const axiosWithTokenAndMultipartData = axios.create({
    baseURL:baseURL,
    headers:multipartHeaders,
});
export { axiosWithToken, axiosWithoutToken, axiosWithTokenAndMultipartData };
