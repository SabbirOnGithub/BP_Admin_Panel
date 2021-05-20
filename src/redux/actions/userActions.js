import { 
    USER_SIGNIN_REQUEST, 
    USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAIL, 
    USER_LOGOUT,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_SAVE_REQUEST, 
    USER_SAVE_SUCCESS, 
    USER_SAVE_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL 
} from "../constants/userConstants";
import {config} from "../../config";
import Cookie from 'js-cookie';
import { axiosWithoutToken, axiosWithToken, axiosWithTokenAndMultipartData } from "../../helpers/axios";

const BASE_API_URL = config.BASE_API_URL

const listUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        const { data } = await axiosWithoutToken.get(`${BASE_API_URL}/User/searchAll`);
        if (data.status === true) {
            dispatch({ type: USER_LIST_SUCCESS, payload: data?.data?.item1 ? data.data.item1?.reverse() : [] });
            // console.log(data)
        } else {
            dispatch({ type: USER_LIST_FAIL, payload: data.message });
        }
        console.log(data.data)
    }
    catch (error) {
        dispatch({ type: USER_LIST_FAIL, payload: error.message });
    }
};
const detailsUser = (id)=> async (dispatch) =>{
    try{
        dispatch({type:USER_DETAILS_REQUEST});
        const { data } = await axiosWithToken.get("/User/detail/" + id); 
        dispatch({type:USER_DETAILS_SUCCESS, payload: data.data });
        console.log(data.data)
    }
    catch(error){
        dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
    }
};

// register and update user
const saveUser = (item, id) => async (dispatch) => {
    // console.log(item)
    try {
        dispatch({ type: USER_SAVE_REQUEST, payload: item })
        if (!id) {
            console.log('create')
            //eslint-disable-next-line
            const formatData = delete item.id;
            const { data } = await axiosWithToken.post("/User/AddUser", item)
            // console.log(data)
            if (data.status === true) {
                dispatch({ type: USER_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: USER_SAVE_FAIL, payload: data.message });
            }
        } else {
            console.log('update')
            console.log(item)
            // Read key
            // Display the values
            for (var value of item.values()) {
                console.log(value);
            }
            const { data } = await axiosWithTokenAndMultipartData.put("/User/UpdateUser", item);
            if (data.status === true) {
                dispatch({ type: USER_SAVE_SUCCESS, payload: data });
            } else {
                dispatch({ type: USER_SAVE_FAIL, payload: data.message });
            }
        }

    } catch (error) {
        console.log(error)
        dispatch({ type: USER_SAVE_FAIL, payload: error.message });
    }
};
const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        const { data } = await axiosWithToken.delete("/User/" + id);
        if (data) {
            dispatch({ type: USER_DELETE_SUCCESS, payload: data, success: true });
        } else {
            dispatch({ type: USER_DELETE_FAIL, payload: data.message });
        }
    }
    catch (error) {
        dispatch({ type: USER_DELETE_FAIL, payload: error.message });
    }
};
// sign in method
const signin = (email,password) => async(dispatch) => {
    const username = email
    dispatch({type:USER_SIGNIN_REQUEST, payload:{ email, password }});
    try{
        const {data} = await axiosWithoutToken.post(`${BASE_API_URL}/Auth/Login`, { username, password });
        if(data && data.data !== null){
            dispatch({type:USER_SIGNIN_SUCCESS,payload:data.data});
            console.log(data.data);
            // console.log(data.data.token);
            Cookie.set('userInfo', JSON.stringify(data.data));
            Cookie.set('userToken', data.data.token);
        }else{
            dispatch({type:USER_SIGNIN_FAIL,payload:data.message})
        }
       
    }
    catch(error){
        dispatch({type:USER_SIGNIN_FAIL,payload:error.message})
    }
};

// sign-out in method
const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    Cookie.remove("userToken");
    dispatch({ type: USER_LOGOUT })
};
  



export { signin, logout, listUsers, saveUser, detailsUser, deleteUser } ;