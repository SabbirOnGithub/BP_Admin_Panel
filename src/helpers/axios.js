import axios from 'axios';
import { config } from "../config";
import Cookie from 'js-cookie';

const baseURL = config.BASE_API_URL;

const headers = {
    'Content-Type': 'application/json',
};
const multipartHeaders = {
    'Content-Type': 'multipart/form-data',
};

// -----------------
// axios instances
// -----------------
const axiosWithToken = axios.create({
    baseURL: baseURL,
    headers,
});
const axiosWithoutToken = axios.create({
    baseURL: baseURL,
});

const axiosWithTokenAndMultipartData = axios.create({
    baseURL: baseURL,
    headers: multipartHeaders,
});

// --------------------------------------------------------------------------------
// request interceptors 
// --------------------------------------------------------------------------------

// Set the AUTH token for any request using axiosWithToken
axiosWithToken.interceptors.request.use(function (config) {
    const userToken = Cookie.get('userToken');
    config.headers.Authorization = userToken ? `Bearer ${userToken}` : '';
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Set the AUTH token for any request using axiosWithTokenAndMultipartData
axiosWithTokenAndMultipartData.interceptors.request.use(function (config) {
    const userToken = Cookie.get('userToken');
    config.headers.Authorization = userToken ? `Bearer ${userToken}` : '';
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// --------------------------------------------------------------------------------
// response interceptors 
// --------------------------------------------------------------------------------
axiosWithoutToken.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

axiosWithToken.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
axiosWithTokenAndMultipartData.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

// ------------------------------------------------------------------------------
// Now all requests using this instance will wait 2.5 seconds before timing out
// ------------------------------------------------------------------------------

// axiosWithoutToken.defaults.timeout = 2500;
// axiosWithToken.defaults.timeout = 2500;
// axiosWithTokenAndMultipartData.defaults.timeout = 2500;



export { axiosWithToken, axiosWithoutToken, axiosWithTokenAndMultipartData };


// global axios setup instruction github link  https://github.com/axios/axios#interceptors