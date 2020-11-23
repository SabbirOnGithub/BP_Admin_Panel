import axios from 'axios';
import {config} from "../config";
import {userToken } from './auth';

const baseURL = config.BASE_API_URL;

let headers ={
    'Content-Type': 'application/json',
};
// headers.Content-Type = 'application/json';

if(userToken){
    headers.Authorization = `Bearer ${userToken}`; 
}

const axiosWithToken = axios.create({
    baseURL:baseURL,
    headers,
});
const axiosWithoutToken = axios.create({
    baseURL:baseURL,
});
export { axiosWithToken, axiosWithoutToken };
